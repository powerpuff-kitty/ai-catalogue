/** Parallel projection. Canonical AI data and established ranking are untouched. */
export const SOURCE_REVISION = '3f102760baa0cee533342fd9d1e8facdafe9534c';
const strings = value => Array.isArray(value) ? [...new Set(value.filter(x=>typeof x==='string'&&x.trim()))] : [];
function https(value) {try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password;}catch{return false;}}
function reviewedDate(value) {return typeof value==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(value)&&Number.isFinite(Date.parse(value))&&new Date(value).toISOString().slice(0,10)===value?value:null;}
export function projectAI(full) {
  if (!full || !Array.isArray(full.entries)) throw new Error('Expected generated/catalog.full.json with entries');
  const ids=new Set();
  const entries=full.entries.map(e=>{
    if(typeof e.id!=='string'||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(e.id)||ids.has(e.id))throw new Error('Invalid/duplicate canonical AI ID');ids.add(e.id);
    if(typeof e.name!=='string'||!e.name.trim())throw new Error(`Missing name for ${e.id}`);
    const links=Object.entries(e.links??{}).filter(([,url])=>typeof url==='string'&&https(url)).map(([label,url])=>({label,url}));
    if(!links.length)links.push({label:'Canonical repository (source link requires review)',url:`https://github.com/powerpuff-kitty/ai-catalogue/tree/${SOURCE_REVISION}`});
    const date=reviewedDate(e.reviewed);
    return {id:`ai:${e.id}`,title:e.name,summary:e.description||'No description recorded in source metadata.',kind:e.kind??'unclassified',tags:strings([...(e.tags??[]),...(e.tasks??[])]),
      facets:{domain:[e.domain??'unknown'],kind:[e.kind??'unclassified'],runtime:strings(e.runtimes),usage:[e.usage?.mode??e.usage_mode??'unknown'],license:[e.license?.code??'unknown']},links,
      evidence:{status:date?'source-reviewed':'unreviewed',reviewedAt:date,note:'Projection of canonical AI metadata, not a new review or benchmark. Per-target compatibility and evidence remain in the original record under extensions.ai.'},
      details:{'Legacy ID':e.id,'Weights licence':e.license?.weights??'unknown',Limitations:strings(e.limitations).join(' ')||'No additional limitations recorded; this does not imply compatibility.'},extensions:{ai:e}};
  });
  return {schemaVersion:1,profile:{id:'ai',title:'AI Catalogue',description:'Models, toolkits and companion components. This shared-engine preview does not replace the established AI-specific explorer, compatibility filters or need matcher.',facets:[{id:'domain',label:'Domain'},{id:'kind',label:'Kind'},{id:'runtime',label:'Reported runtime'},{id:'usage',label:'Usage'},{id:'license',label:'Code licence'}],synonyms:{speech:['audio','voice'],transcribe:['transcription','asr'],images:['image','vision'],models:['model']}},entries};
}
