/** Discovery catalogue tooling. No upstream code is downloaded or executed. */
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const ROLES = ['product-reference', 'component-reference', 'candidate'];
const BASE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(BASE, '../..');
const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const fail = message => { throw new Error(message); };
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const text = value => typeof value === 'string' && value.trim().length > 0;
const exact = (obj, fields, label) => {
  if (!object(obj)) fail(`${label}: expected an object`);
  for (const key of Object.keys(obj)) if (!fields.includes(key)) fail(`${label}: unknown field ${key}`);
};
const keys = (obj, fields, label) => {
  for (const key of fields) if (!Object.hasOwn(obj, key)) fail(`${label}: missing ${key}`);
};
export function validate(data) {
  const top = ['version', 'title', 'reviewed_at', 'evidence', 'benchmark_status', 'scope', 'groups', 'projects'];
  exact(data, top, 'catalogue'); keys(data, top, 'catalogue');
  if (data.version !== 1 || !text(data.title) || !text(data.scope)) fail('Invalid catalogue header');
  const date = data.reviewed_at;
  if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date) fail('Invalid review date');
  if (data.evidence !== 'documentation-reviewed' || data.benchmark_status !== 'not-run') fail('Discovery records cannot claim benchmark evidence');
  if (!object(data.groups) || !Object.keys(data.groups).length) fail('Missing groups');
  for (const [id, label] of Object.entries(data.groups)) if (!ID.test(id) || !text(label)) fail('Invalid group');
  if (!Array.isArray(data.projects) || !data.projects.length) fail('Missing projects');
  const seen = new Set();
  for (const p of data.projects) {
    exact(p, ['id', 'name', 'group', 'role', 'summary', 'study', 'boundary', 'links', 'canonical', 'license', 'stack'], 'project');
    keys(p, ['id', 'name', 'group', 'role', 'summary', 'study', 'boundary', 'links'], 'project');
    if (!text(p.id) || !ID.test(p.id) || seen.has(p.id)) fail(`Invalid or duplicate ID: ${p.id}`);
    seen.add(p.id);
    for (const f of ['name', 'summary', 'study', 'boundary']) if (!text(p[f])) fail(`${p.id}: missing ${f}`);
    if (!Object.hasOwn(data.groups, p.group) || !ROLES.includes(p.role)) fail(`${p.id}: invalid classification`);
    exact(p.links, ['source', 'demo', 'documentation', 'license'], `${p.id} links`);
    if (!p.links.source) fail(`${p.id}: source required`);
    for (const value of Object.values(p.links)) {
      if (!text(value)) fail(`${p.id}: invalid URL`);
      const u = new URL(value);
      if (u.protocol !== 'https:' || u.username || u.password) fail(`${p.id}: HTTPS links without credentials required`);
    }
    if (p.role === 'component-reference') {
      exact(p.canonical, ['id', 'path'], `${p.id} canonical`);
      if (p.canonical.id !== p.id || !new RegExp(`^primitives/(procedural|artificial-life)/${p.id}\\.yaml$`).test(p.canonical.path)) fail(`${p.id}: invalid canonical reference`);
      if (p.license || p.stack) fail(`${p.id}: do not duplicate canonical licence or runtime metadata`);
    } else if (p.canonical) fail(`${p.id}: only component references can declare canonical metadata`);
    if (p.role === 'candidate') {
      exact(p.license, ['code', 'assets', 'note'], `${p.id} licence`);
      for (const f of ['code', 'assets', 'note']) if (!text(p.license[f])) fail(`${p.id}: incomplete licence review`);
      if (!Array.isArray(p.stack) || p.stack.some(v => !text(v)) || new Set(p.stack).size !== p.stack.length) fail(`${p.id}: invalid stack`);
    } else if (p.license || p.stack) fail(`${p.id}: technical metadata belongs in a canonical component or candidate`);
  }
  return data;
}
export function stats(data) {
  return { total: data.projects.length, ...Object.fromEntries(ROLES.map(role => [role, data.projects.filter(p => p.role === role).length])) };
}
export const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const md = value => String(value).replace(/\\/g, '\\\\').replace(/[|\[\]*_`<>]/g, c => `\\${c}`).replace(/\r?\n/g, ' ');
const mdURL = value => value.replace(/\)/g, '%29').replace(/\(/g, '%28').replace(/>/g, '%3E').replace(/</g, '%3C');
export const canonicalURL = p => `https://github.com/powerpuff-kitty/embedded-AI/blob/main/${p.canonical.path}`;
export const licenceLabel = p => p.role === 'product-reference' ? 'Product reference; no reuse grant established' : p.role === 'component-reference' ? 'See canonical manifest' : p.license.code;
export function markdown(data) {
  validate(data);
  const s = stats(data);
  let out = `# ${data.title}\n\n> Generated from research/procedural-projects/catalogue.json. Do not edit by hand.\n\n`;
  out += `Reviewed: **${data.reviewed_at}**. **${s.total} projects**: ${s['product-reference']} product references, ${s.candidate} source-project candidates, ${s['component-reference']} existing canonical component references.\n\n`;
  out += `${data.scope}\n\nEvidence: documentation reviewed; **no upstream programs run and no performance measurements**. Demo links were discovered from primary sources; they are not compatibility tests. Unknown licensing is not permission. Code, assets, dependencies and generated outputs may have different terms.\n\n`;
  out += `[Collection guide](../README.md) · [Canonical procedural table](https://github.com/powerpuff-kitty/embedded-AI/blob/main/docs/PROCEDURAL.md)\n\n`;
  for (const [group, label] of Object.entries(data.groups)) {
    out += `## ${label}\n\n| Project | Record type | Reuse boundary |\n|---|---|---|\n`;
    for (const p of data.projects.filter(x => x.group === group)) out += `| [${md(p.name)}](${mdURL(p.links.source)}) | ${p.role} | ${md(licenceLabel(p))} |\n`;
    out += '\n';
    for (const p of data.projects.filter(x => x.group === group)) {
      out += `### ${md(p.name)}\n\n${md(p.summary)}\n\n**Why study it:** ${md(p.study)}\n\n**Boundary:** ${md(p.boundary)}\n\n`;
      if (p.license) out += `**Source licence:** ${md(p.license.code)}. **Asset licence:** ${md(p.license.assets)}. ${md(p.license.note)}\n\n**Reported stack:** ${p.stack.length ? p.stack.map(md).join(', ') : 'Not established in this review'}. No device-fit claim.\n\n`;
      if (p.canonical) out += `**Canonical component:** [${md(p.canonical.id)}](${canonicalURL(p)}). Read runtime, licensing and evidence there; they are not redefined by this collection.\n\n`;
      out += Object.entries(p.links).map(([label, url]) => `[${label}](${mdURL(url)})`).join(' · ') + '\n\n';
    }
  }
  return out;
}
export function html(data) {
  validate(data);
  const e = escapeHTML, s = stats(data);
  const cards = data.projects.map(p => `<article data-group="${e(p.group)}" data-role="${e(p.role)}" data-search="${e(JSON.stringify(p).toLowerCase())}"><div class="eyebrow">${e(data.groups[p.group])} / ${e(p.role)}</div><h2>${e(p.name)}</h2><p>${e(p.summary)}</p><p><strong>Study</strong> ${e(p.study)}</p><p class="boundary"><strong>Boundary</strong> ${e(p.boundary)}</p><p class="licence">${e(licenceLabel(p))}${p.license ? ` · Assets: ${e(p.license.assets)}<br>${e(p.license.note)}` : ''}</p><nav aria-label="${e(p.name)} sources">${Object.entries(p.links).map(([k, v]) => `<a href="${e(v)}" target="_blank" rel="noopener noreferrer">${e(k)}</a>`).join(' ')}${p.canonical ? ` <a href="${e(canonicalURL(p))}" target="_blank" rel="noopener noreferrer">canonical manifest</a>` : ''}</nav></article>`).join('\n');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><title>Procedural project atlas</title><style>
:root{font-family:ui-sans-serif,system-ui,-apple-system,sans-serif;color:#1c2425;background:#f3f3ef;font-size:16px;line-height:1.55}*{box-sizing:border-box}body{margin:0}main{max-width:1260px;margin:auto;padding:44px 28px}header{border-top:4px solid currentColor;padding-top:20px;margin-bottom:32px}.eyebrow,label,.licence,nav,.meta{font-family:ui-monospace,SFMono-Regular,monospace;font-size:12px}header .eyebrow{letter-spacing:.12em;text-transform:uppercase}h1{font-size:clamp(34px,6vw,70px);font-weight:600;letter-spacing:-.055em;line-height:1.02;max-width:920px;margin:22px 0}header p{max-width:880px}.metrics{display:flex;gap:34px;flex-wrap:wrap;margin:28px 0}.metrics b{font-size:30px;display:block;font-weight:500}.metrics span{font-size:13px}.filters{display:grid;grid-template-columns:2fr 1fr 1fr;gap:14px;border-top:1px solid;padding-top:20px}label{display:flex;flex-direction:column;gap:6px}input,select{font:inherit;font-size:15px;border:1px solid #949b99;border-radius:0;background:transparent;color:inherit;padding:11px;width:100%;min-width:0}input:focus-visible,select:focus-visible,a:focus-visible{outline:3px solid currentColor;outline-offset:3px}.meta{margin:18px 0}#cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));border-top:1px solid #a2aaa5;border-left:1px solid #a2aaa5}article{padding:26px;border-right:1px solid #a2aaa5;border-bottom:1px solid #a2aaa5}article[hidden]{display:none}h2{font-size:25px;font-weight:550;line-height:1.15;letter-spacing:-.035em;margin:12px 0 18px}p{margin:12px 0}.boundary{border-left:2px solid;padding-left:13px}.licence{margin-top:22px}nav{display:flex;gap:14px;flex-wrap:wrap;margin-top:20px}a{color:inherit;text-underline-offset:4px}footer{border-top:1px solid;margin-top:32px;padding-top:16px;font-size:13px}#empty{padding:28px;border:1px solid}@media(max-width:680px){main{padding:24px 18px}.filters,#cards{grid-template-columns:1fr}article{padding:22px}.metrics{gap:20px}}@media(prefers-color-scheme:dark){:root{color:#e9e9e2;background:#141a1b}#cards,article{border-color:#58615e}input,select{border-color:#82928b}option{background:#141a1b}}@media print{.filters{display:none}#cards{display:block}article{break-inside:avoid}}
</style></head><body><main><header><div class="eyebrow">embedded-AI / Research collection / 01</div><h1>Procedural worlds.<br>Useful starting points.</h1><p>From Townscaper-like building toys to reusable constraints, terrain, trees and artificial life. Product inspiration is kept separate from code that can be evaluated for integration.</p><div class="metrics"><span><b>${s.total}</b>projects</span><span><b>${s['product-reference']}</b>product references</span><span><b>${s.candidate}</b>source candidates</span><span><b>${s['component-reference']}</b>canonical references</span></div><p class="meta">Reviewed ${e(data.reviewed_at)} · Documentation reviewed, not benchmarked. This standalone view is not the main catalogue explorer. All search runs locally; no tracking, network requests or external scripts.</p></header><section class="filters" aria-label="Catalogue filters"><label>Search<input id="search" type="search" placeholder="Town, Rust, tree, licence, behaviour…" autocomplete="off"></label><label>Category<select id="group"><option value="">All categories</option>${Object.entries(data.groups).map(([k,v])=>`<option value="${e(k)}">${e(v)}</option>`).join('')}</select></label><label>Record type<select id="role"><option value="">All record types</option>${ROLES.map(r=>`<option value="${r}">${r}</option>`).join('')}</select></label></section><p id="count" class="meta" role="status" aria-live="polite">${s.total} projects</p><div id="cards">${cards}</div><p id="empty" hidden>No matching projects. Try a broader search or clear the filters.</p><noscript><p>JavaScript is disabled: the complete catalogue remains visible, but filters are unavailable.</p></noscript><footer>Existing component metadata remains canonical in embedded-AI. Candidates have not been promoted to component manifests. Upstream code, assets, dependencies and outputs retain their own licences. An unknown licence is not permission. No generation performance or device compatibility was measured.</footer></main><script>
const search=document.querySelector('#search'),group=document.querySelector('#group'),role=document.querySelector('#role'),cards=[...document.querySelectorAll('article')];
function filter(){const terms=search.value.toLowerCase().trim().split(/\\s+/).filter(Boolean);let count=0;for(const card of cards){const show=(!group.value||card.dataset.group===group.value)&&(!role.value||card.dataset.role===role.value)&&terms.every(t=>card.dataset.search.includes(t));card.hidden=!show;if(show)count++;}document.querySelector('#count').textContent=count+' of '+cards.length+' projects';document.querySelector('#empty').hidden=count>0;}
search.addEventListener('input',filter);group.addEventListener('change',filter);role.addEventListener('change',filter);
</script></body></html>\n`;
}
export async function run(args = process.argv.slice(2)) {
  if (args.some(a => !['--check', '--verify-canonical'].includes(a))) fail('Usage: node research/procedural-projects/catalogue.mjs [--check] [--verify-canonical]');
  const data = validate(JSON.parse(await readFile(resolve(BASE, 'catalogue.json'), 'utf8')));
  if (args.includes('--verify-canonical')) {
    for (const p of data.projects.filter(p => p.canonical)) await access(resolve(ROOT, p.canonical.path));
  }
  const outputs = [['research/procedural-projects/dist/CATALOGUE.md', markdown(data)], ['research/procedural-projects/dist/index.html', html(data)]];
  for (const [relative, content] of outputs) {
    const path = resolve(ROOT, relative);
    if (args.includes('--check')) {
      if (await readFile(path, 'utf8') !== content) fail(`Stale generated output: ${relative}`);
    } else { await mkdir(dirname(path), { recursive: true }); await writeFile(path, content); }
  }
  console.log(JSON.stringify(stats(data)));
}
if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  run().catch(error => { console.error(error.message); process.exitCode = 1; });
}
