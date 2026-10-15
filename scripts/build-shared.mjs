/** Thin bootstrap only. The renderer/search implementation stays in catalogue-engine. */
import {readFile,realpath} from 'node:fs/promises';
import {resolve,relative} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
const root=fileURLToPath(new URL('../',import.meta.url));
const lock=JSON.parse(await readFile(resolve(root,'engine.lock.json'),'utf8'));
const expected=['packages/cli/index.mjs','packages/core/index.mjs','packages/search/index.mjs','packages/ui/app.mjs','packages/ui/render.mjs','packages/ui/state.mjs','packages/ui/style.css'];
if(lock.schemaVersion!==1||!/^[a-f0-9]{40}$/.test(lock.revision)||JSON.stringify(Object.keys(lock.files).sort())!==JSON.stringify(expected))throw new Error('Invalid engine lock');
const engine=await realpath(resolve(process.env.CATALOGUE_ENGINE_ROOT??resolve(root,'../catalogue-engine')));
for(const name of expected){
  const file=await realpath(resolve(engine,name));
  if(relative(engine,file).startsWith('..'))throw new Error('Engine path escapes checkout');
  const digest=createHash('sha256').update(await readFile(file)).digest('hex');
  if(digest!==lock.files[name])throw new Error(`Engine pin mismatch: ${name}. Checkout ${lock.revision}; do not silently update the lock.`);
}
const {readCatalogue,build}=await import(pathToFileURL(resolve(engine,'packages/cli/index.mjs')).href);
const document=await readCatalogue(resolve(root,'generated/catalogue.v1.json'));
console.log(JSON.stringify(await build(document,resolve(root,'dist-shared')),null,2));
