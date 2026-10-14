import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {projectAI} from './shared-catalogue-adapter.mjs';
const root=new URL('../',import.meta.url);
const full=JSON.parse(await readFile(new URL('generated/catalog.full.json',root),'utf8'));
const document=projectAI(full);
await mkdir(new URL('generated/',root),{recursive:true});
await writeFile(new URL('generated/catalogue.v1.json',root),JSON.stringify(document,null,2)+'\n');
console.log(`Exported ${document.entries.length} AI catalogue records. Existing exports were not modified.`);
