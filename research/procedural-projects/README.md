# Procedural projects

A sourced discovery catalogue of Townscaper-like building toys, grid experiments, constraint solvers, world generators, vegetation, procedural art and artificial life.

**30 records reviewed on 2026-10-14:** 7 product references, 13 source-project candidates and 10 references to existing canonical components. No upstream programs were run and no generation benchmarks were measured.

This is a research collection inside **embedded-AI**, not a second canonical component database. Existing component records remain authoritative for their licences, runtime support and evidence. Commercial products are inspiration, not libraries. Candidates have not yet been promoted to the main explorer, package or MCP.

[Existing procedural view](https://powerpuff-kitty.github.io/embedded-AI/?view=procedural) · [Canonical integration contract](../../docs/PROCEDURAL-GUIDE.md) · [Discovery data](catalogue.json)

## Open the searchable catalogue

From the repository root, with Node 22:

```sh
node --test research/procedural-projects/catalogue.test.mjs
node research/procedural-projects/catalogue.mjs --verify-canonical
node research/procedural-projects/catalogue.mjs --check
```

Open `research/procedural-projects/dist/index.html` in a browser, or read `dist/CATALOGUE.md`. Generated files are local build output, not deployed pages. The HTML works without a server, external dependencies, tracking or background network requests; following a source link naturally opens the upstream website. Search, category and record-type filters run locally. All records remain readable with JavaScript disabled.

`--verify-canonical` checks that the ten referenced manifest paths exist in a full checkout. `--check` compares generated outputs byte-for-byte; run the generator first in a clean checkout. The dedicated CI workflow runs these commands without installing dependencies or executing upstream projects. It does not replace the main catalogue's validation and audit workflow.

## Initial index

| Category | Projects |
|---|---|
| City builders and creative toys | Townscaper; Tiny Glade; Dystopika; Bulwark: Falconeer Chronicles; Cloud Gardens; SUMMERHOUSE; Bad North |
| Townscaper-style grids | Irregular Grid; HexagridRelaxing; TownBuilder; Organic Grid Townscaper |
| Constraints and pattern systems | WaveFunctionCollapse; WaveFunctionCollapse JavaScript; MarkovJunior; DeBroglie; ghx_proc_gen |
| Maps and environments | Watabou Medieval Fantasy City Generator; Azgaar Fantasy Map Generator; Red Blob Games Mapgen4; Infinigen; THREE.Terrain |
| Trees and branching | EZ-Tree; proctree.js; 2D Space Colonization Experiments |
| Art and materials | Material Maker; Shan, Shui; fishdraw |
| Artificial life | Lenia; ALIEN; biosim4 |

Follow each record's `links.source` for primary evidence. The generated views provide direct source, demo, documentation and licence links where reviewed.

## How records work

Every record has a stable ID, category, role, factual summary, proposed learning value, explicit limitations and primary source links. The collection's review date and evidence ceiling apply to every record. `study` is an editorial recommendation, not an upstream guarantee.

`component-reference` records contain a canonical ID/path pair and do not repeat runtime or licence fields. `candidate` records contain a reported stack and a separate code/asset licence review. An empty stack means this review did not establish one. `product-reference` records deliberately do not assert reusable source or an API. SUMMERHOUSE is explicitly marked as adjacent creative-editor inspiration rather than a proven procedural implementation.

The dependency-free validator rejects duplicate IDs, unknown fields, invalid groups/roles, missing evidence links, unsafe URLs, incomplete licence reviews, canonical path traversal, copied canonical licence/runtime metadata and unsupported benchmark claims. It does not independently prove upstream descriptions, licences or link availability.

## Recommended evaluation order

Start with **Irregular Grid** for topology; **WaveFunctionCollapse JavaScript** for a small browser constraint experiment; **ghx_proc_gen** for a Rust candidate; **Mapgen4** for user-guided terrain; and **EZ-Tree** for visible vegetation variation. DeBroglie is a separate candidate when stronger global constraints are important and a C# integration is acceptable. These are proposed experiments, not benchmark-based winners.

For a Townscaper-like implementation, keep these responsibilities separate:

```text
seed + user edit + rules/asset versions
  -> topology and semantic state
  -> local rules / constrained tile selection
  -> mesh and detail generation
  -> renderer
```

A solver does not automatically supply art direction, good interaction, scene persistence, navigation or simulation. Preserve logical state and edit history rather than just the final mesh. Test deterministic replay under pinned conditions; a seed alone is not a cross-version guarantee.

## Admission roadmap

**1. Review candidates.** Resolve unknown source licences, inspect dependencies and asset terms, identify actual importable APIs, pin upstream revisions, and map each project to the existing component schema. A public source repository is not necessarily open source. Non-commercial references remain useful for study but must not be presented as permissive commercial dependencies.

**2. Promote without duplication.** Add only suitable components as canonical YAML under the existing taxonomy. Replace their discovery metadata with canonical references. Keep closed products and educational-only resources in the discovery collection rather than forcing them into a model/toolkit classification.

**3. Reproduce small adapters.** Run opt-in, isolated tests for a grid, a constrained tile layout, a terrain patch and a tree. Record environment, pinned versions, input size, seed/RNG, outputs, latency, memory and replay results. Promote only the tested adapter/environment to reproduced evidence. Main explorer, need matcher and MCP integration for the discovery layer is a separate step, not delivered by this seed collection.

## Files and licensing

`catalogue.json` is the single source for this discovery collection. `catalogue.mjs` validates it and generates Markdown/HTML. `catalogue.test.mjs` tests the contract and safe rendering. `dist/` is generated and ignored.

Tooling follows the repository's [MIT code licence](../../LICENSE); catalogue descriptions and manifests follow its [CC BY 4.0 data licence](../../LICENSE-DATA). Upstream software, assets and generated-output terms remain independent. No upstream code, images, models or textures are bundled here.
