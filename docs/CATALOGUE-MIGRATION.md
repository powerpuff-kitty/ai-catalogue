# AI Catalogue — shared-engine migration

The repository is now `powerpuff-kitty/ai-catalogue`. This first increment adds a parallel common-format projection and shared explorer; it does not retire the established AI explorer, change its ranking, or rename legacy npm packages/MCP resources.

## Run from a full checkout

With Node 22 and the engine repository alongside this repository:

```sh
node --test tests_shared/*.test.mjs
node scripts/export-shared-catalogue.mjs
git -C ../catalogue-engine checkout c5ac8f3355589681f4bd0ebefafffb6cbaab772d
node scripts/build-shared.mjs
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist-shared
```

Set CATALOGUE_ENGINE_ROOT for a different engine location. The bootstrap verifies SHA-256 pins in engine.lock.json before importing the engine. It never downloads an engine or executes catalogue projects. The engine is private and unpublished; do not add an unconditional inaccessible dependency to the public package or ordinary build.

The adapter reads generated/catalog.full.json and emits generated/catalogue.v1.json. `ai:<id>` is the shared identity, while the original ID and full record remain in details/extensions. Missing reviews remain unreviewed; per-target benchmark/compatibility evidence is not flattened into a global tested badge. Unsupported clickable URL forms are not rendered as links, but the raw source metadata remains in extensions.

## Compatibility boundaries

The existing package name `embedded-ai-catalog`, MCP identifiers, YAML entry IDs, need matcher, hardware constraints, translations and production explorer remain unchanged. Generic runtime/code-licence facets are not substitutes for AI-specific compatibility or weights policy. Principal and remaining legacy branding/Pages URL cleanup is still part of #79/#80; this adapter alone does not complete the rename across generated assets.

The dedicated CI job tests the adapter and exports the actual full source catalogue. It does not claim private-engine integration. Local verification used seven fixture tests; the complete generated AI data and the full repository suite were unavailable in the local execution environment. Check CI before merging.

## Linked work

- #79: non-breaking migration and naming cleanup.
- #80: full query/UI/package/MCP parity and release gating before cutover.
- procedural-catalogue#1: independent discovery collection replacing the direction of PR #78.
- catalogue-engine#2: publication/private consumer CI.

No public deployment, visibility change, package publication or canonical procedural record deletion is part of this increment.
