import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { validate, stats, markdown, html, escapeHTML } from './catalogue.mjs';
const data = JSON.parse(await readFile(new URL('./catalogue.json', import.meta.url), 'utf8'));
const copy = () => structuredClone(data);
const rejects = mutate => { const d = copy(); mutate(d); assert.throws(() => validate(d)); };
test('initial collection has 30 unique sourced records and independent roles', () => {
  assert.equal(validate(data), data);
  assert.deepEqual(stats(data), { total: 30, 'product-reference': 7, 'component-reference': 10, candidate: 13 });
});
test('duplicate IDs fail', () => rejects(d => d.projects.push(d.projects[0])));
test('unknown groups and roles fail', () => {
  rejects(d => d.projects[0].group = 'made-up');
  rejects(d => d.projects[0].role = 'benchmark');
});
test('source evidence is required', () => rejects(d => delete d.projects[0].links.source));
test('active, insecure and credentialed URLs fail', () => {
  for (const url of ['javascript:alert(1)', 'http://example.com', 'https://user:pass@example.com', 'not-a-url']) rejects(d => d.projects[0].links.source = url);
});
test('evidence cannot be silently promoted', () => {
  rejects(d => d.evidence = 'reproduced'); rejects(d => d.benchmark_status = 'measured');
});
test('canonical metadata is referenced, not copied', () => {
  rejects(d => d.projects.find(p => p.canonical).license = { code: 'MIT' });
  rejects(d => d.projects.find(p => p.canonical).canonical.path = '../../secrets');
  rejects(d => d.projects.find(p => p.canonical).canonical.id = 'other');
});
test('candidates require explicit source and asset licence review', () => {
  rejects(d => delete d.projects.find(p => p.role === 'candidate').license.assets);
  rejects(d => delete d.projects.find(p => p.role === 'candidate').license);
});
test('product inspiration cannot masquerade as reusable metadata', () => rejects(d => d.projects[0].license = { code: 'MIT' }));
test('dates and unknown fields are rejected', () => {
  rejects(d => d.reviewed_at = '2026-02-30');
  rejects(d => d.reviewed_at = 'yesterday');
  rejects(d => d.projects[0].measured_ram_mb = 0);
});
test('HTML output escapes hostile text and leaves all records available without JavaScript', () => {
  const d = copy(); d.projects[0].name = '<img src=x onerror=alert(1)>';
  const result = html(d);
  assert.ok(result.includes('&lt;img src=x onerror=alert(1)&gt;'));
  assert.ok(!result.includes('<img src=x'));
  assert.equal((result.match(/<article /g) || []).length, 30);
  assert.equal((result.match(/<script>/g) || []).length, 1);
  assert.ok(result.includes('role="status"'));
  assert.ok(!result.includes('<script src='));
  assert.equal(escapeHTML('"<&'), '&quot;&lt;&amp;');
});
test('outputs are deterministic, list each record and preserve caveats', () => {
  assert.equal(markdown(data), markdown(data)); assert.equal(html(data), html(data));
  const result = markdown(data);
  assert.equal((result.match(/^### /gm) || []).length, 30);
  assert.ok(result.includes('CC-BY-NC-SA-4.0'));
  assert.ok(result.includes('NOT established'));
  assert.ok(result.includes('no upstream programs run'));
});
