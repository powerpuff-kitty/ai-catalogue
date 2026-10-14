<!-- Generated from roadmap.json by catalogue-engine/planning/roadmaps.mjs. -->
# AI Catalogue roadmap

Snapshot: **2026-10-14**. Planning alignment: [catalogue-engine#12](https://github.com/powerpuff-kitty/catalogue-engine/issues/12). [Machine-readable plan](roadmap.json).

## Current baseline

The native catalogue and interfaces predate this split. Shared-preview PR #81 and curator-profile PR #83 remain open. Legacy issues #1-#14 have been reconciled to pinned source evidence and explicit remaining acceptance work below; none is closed by source inspection or this planning merge.

[Audited main revision](https://github.com/powerpuff-kitty/ai-catalogue/tree/3f102760baa0cee533342fd9d1e8facdafe9534c). This is a dated planning snapshot, not a live issue dashboard.

## Ownership

**This repository owns:** Canonical AI manifests, taxonomy, runtime/hardware policy, evidence and code/weights licensing. AI-specific discovery, curator policy, promotion adapter and editorial content.

**Kept outside this repository or this planning change:** Duplicated engine UI, generic scheduling/MCP/publishing infrastructure. Breaking stable package/CLI/MCP identities or treating generic search as hardware proof.

## Status and completion rules

`planned` means not delivered; `in-progress` means active work; `in-review` means an open implementation PR, not merged; `partial` means only part of the milestone has implementation; `needs-triage` preserves an older open issue whose residual scope needs verification. `accepted` requires linked merge and validation evidence. No item is promoted because a demo renders, a fixture passes, or an issue exists.

P0 is blocking foundation/verification work, P1 is core capability, and P2 is retained follow-up/triage priority. These priorities are planning assignments, not newly applied GitHub labels. Phases are exit gates, not calendar promises or GitHub milestones. A parent groups work; it is not a dependency that children must wait to close. Acceptance criteria live in the linked tickets.

## Non-breaking adoption and naming

**Exit gate:** #79 and child #84 preserve stable IDs/interfaces and correct active naming; retain the primary explorer until parity is verified.

| Issue / deliverable | Priority | Snapshot status | Prerequisites | Implementation / scope |
|---|---|---|---|---|
| [ai-catalogue#79](https://github.com/powerpuff-kitty/ai-catalogue/issues/79) — Non-breaking shared-engine adoption | P0 | in-review | [catalogue-engine#1](https://github.com/powerpuff-kitty/catalogue-engine/issues/1) | [PR #81](https://github.com/powerpuff-kitty/ai-catalogue/pull/81) |
| [ai-catalogue#84](https://github.com/powerpuff-kitty/ai-catalogue/issues/84) — Branding, repository/Pages URLs and compatibility aliases | P0 | planned | No closure prerequisite | Child of [ai-catalogue#79](https://github.com/powerpuff-kitty/ai-catalogue/issues/79). |

## Complete dataset and interface parity

**Exit gate:** #85 runs the native and shared test matrix on the complete dataset; #80 closes only after distribution and rollback are verified.

| Issue / deliverable | Priority | Snapshot status | Prerequisites | Implementation / scope |
|---|---|---|---|---|
| [ai-catalogue#80](https://github.com/powerpuff-kitty/ai-catalogue/issues/80) — Legacy interface retirement gate | P1 | planned | [ai-catalogue#79](https://github.com/powerpuff-kitty/ai-catalogue/issues/79), [catalogue-engine#2](https://github.com/powerpuff-kitty/catalogue-engine/issues/2) | Parent of #85; preserve translations, ranking, package and MCP contracts until acceptance. |
| [ai-catalogue#85](https://github.com/powerpuff-kitty/ai-catalogue/issues/85) — Full-source search, export and served-interface parity | P0 | planned | [ai-catalogue#79](https://github.com/powerpuff-kitty/ai-catalogue/issues/79), [catalogue-engine#2](https://github.com/powerpuff-kitty/catalogue-engine/issues/2), [catalogue-engine#13](https://github.com/powerpuff-kitty/catalogue-engine/issues/13) | Child of [ai-catalogue#80](https://github.com/powerpuff-kitty/ai-catalogue/issues/80). |

## Review-only curation and approved promotion

**Exit gate:** #82 configuration is integrated; #86 validates approved native patches through the shared contract; live activation separately satisfies engine #7.

| Issue / deliverable | Priority | Snapshot status | Prerequisites | Implementation / scope |
|---|---|---|---|---|
| [ai-catalogue#82](https://github.com/powerpuff-kitty/ai-catalogue/issues/82) — AI curator configuration | P0 | in-review | [ai-catalogue#79](https://github.com/powerpuff-kitty/ai-catalogue/issues/79), [catalogue-engine#6](https://github.com/powerpuff-kitty/catalogue-engine/issues/6) | [PR #83](https://github.com/powerpuff-kitty/ai-catalogue/pull/83) |
| [ai-catalogue#86](https://github.com/powerpuff-kitty/ai-catalogue/issues/86) — Approved AI proposals to canonical YAML | P1 | planned | [ai-catalogue#82](https://github.com/powerpuff-kitty/ai-catalogue/issues/82), [catalogue-engine#16](https://github.com/powerpuff-kitty/catalogue-engine/issues/16) | Shared coordination: engine #8. Never synthesize benchmark evidence or weights rights. |

## AI journal and release prerequisites

**Exit gate:** #87 proves draft exclusion and page/feed correspondence; approved content, URLs and rights are checked before any edition.

| Issue / deliverable | Priority | Snapshot status | Prerequisites | Implementation / scope |
|---|---|---|---|---|
| [ai-catalogue#87](https://github.com/powerpuff-kitty/ai-catalogue/issues/87) — Revision-linked AI comparisons and shared journal | P1 | planned | [ai-catalogue#79](https://github.com/powerpuff-kitty/ai-catalogue/issues/79), [catalogue-engine#4](https://github.com/powerpuff-kitty/catalogue-engine/issues/4) | See linked acceptance criteria. |

## Audited native implementation and remaining work

**Exit gate:** Source-inspected residual scope is recorded for #1-#14. Close each implementation ticket only after its remaining checks or measured reports are attached; this planning pass does not execute models or certify devices.

| Issue / deliverable | Priority | Snapshot status | Prerequisites | Implementation / scope |
|---|---|---|---|---|
| [ai-catalogue#1](https://github.com/powerpuff-kitty/ai-catalogue/issues/1) — Reproducible benchmark harness | P1 | partial | No closure prerequisite | [Source 1](https://github.com/powerpuff-kitty/ai-catalogue/blob/3f102760baa0cee533342fd9d1e8facdafe9534c/benchmarks/README.md), [Source 2](https://github.com/powerpuff-kitty/ai-catalogue/blob/3f102760baa0cee533342fd9d1e8facdafe9534c/schema/benchmark.schema.json) Reuse the isolated runner and three adapters. Remaining: verify every requested metric and null/unsupported state, attach real Apple Silicon/Raspberry Pi acceptance reports, and complete sustained RV1106 work in #2. Tooling and Linux smoke observations are not device acceptance. |
| [ai-catalogue#2](https://github.com/powerpuff-kitty/ai-catalogue/issues/2) — RV1106 / SEEN-0 benchmark stack | P1 | planned | No closure prerequisite | [Source 1](https://github.com/powerpuff-kitty/ai-catalogue/blob/3f102760baa0cee533342fd9d1e8facdafe9534c/docs/RUNNABLE-V02.md), [Source 2](https://github.com/powerpuff-kitty/ai-catalogue/blob/3f102760baa0cee533342fd9d1e8facdafe9534c/benchmarks/README.md) The coexistence monitor is not an RV1106 benchmark. Remaining: capture/encode, API, display and one supported RKNN detector on the actual 256 MB board; record drops, queue age, thermals and memory. Whistle/Needle stay unverified until demonstrated. |
| [ai-catalogue#3](https://github.com/powerpuff-kitty/ai-catalogue/issues/3) — Hardware compatibility matrix | P1 | partial | No closure prerequisite | [Source 1](https://github.com/powerpuff-kitty/ai-catalogue/blob/3f102760baa0cee533342fd9d1e8facdafe9534c/docs/RUNNABLE-V02.md), [Source 2](https://github.com/powerpuff-kitty/ai-catalogue/blob/3f102760baa0cee533342fd9d1e8facdafe9534c/benchmarks/README.md) Exact-environment RAM filtering exists. Remaining: generate and test per-hardware runtime/format/accelerator indexes with explicit reported/reproduced/unknown states and negative-fit cases; do not infer hardware compatibility from a generic shared preview. |
| [ai-catalogue#4](https://github.com/powerpuff-kitty/ai-catalogue/issues/4) — Native searchable catalogue site | P1 | partial | No closure prerequisite | [Source 1](https://github.com/powerpuff-kitty/ai-catalogue/blob/3f102760baa0cee533342fd9d1e8facdafe9534c/docs/RUNNABLE-V02.md) The native static explorer, comparison and entry pages exist; do not rebuild them. Remaining: audit the original requested filter matrix and benchmark history against complete data, attach served-browser/accessibility evidence, and coordinate shared-interface cutover with #85. |
| [ai-catalogue#5](https://github.com/powerpuff-kitty/ai-catalogue/issues/5) — Versioned machine-readable JSON indexes | P1 | partial | No closure prerequisite | [Source 1](https://github.com/powerpuff-kitty/ai-catalogue/blob/3f102760baa0cee533342fd9d1e8facdafe9534c/README.md) Canonical YAML already generates JSON exports and package/CLI/MCP surfaces. Remaining: document and test schema-version compatibility, all requested task/domain/hardware/runtime/compatibility indexes, stable IDs and actual static-host consumption. Shared export parity belongs to #85. |
| [ai-catalogue#6](https://github.com/powerpuff-kitty/ai-catalogue/issues/6) — Benchmark evidence schema | P1 | partial | No closure prerequisite | [Source 1](https://github.com/powerpuff-kitty/ai-catalogue/blob/3f102760baa0cee533342fd9d1e8facdafe9534c/schema/benchmark.schema.json), [Source 2](https://github.com/powerpuff-kitty/ai-catalogue/blob/3f102760baa0cee533342fd9d1e8facdafe9534c/benchmarks/README.md) Benchmark schema v1 exists. Remaining: tighten nested validation and document firmware, conversion, throughput, utilization, power method and thermal fields with null/unsupported semantics, valid/invalid fixtures and backwards-compatible migration. Do not invent missing measurements. |
| [ai-catalogue#7](https://github.com/powerpuff-kitty/ai-catalogue/issues/7) — Audio coverage | P1 | partial | No closure prerequisite | [Source 1](https://github.com/powerpuff-kitty/ai-catalogue/blob/3f102760baa0cee533342fd9d1e8facdafe9534c/generated/coverage.json) Snapshot has 53 audio records, not 53 edge-tested models. Remaining: map the eight requested audio task families to model-level entries, audit primary sources/code and weights rights, identify gaps and process a bounded reviewed batch with unknown runtime/RAM fields preserved. |
| [ai-catalogue#8](https://github.com/powerpuff-kitty/ai-catalogue/issues/8) — Vision coverage | P1 | partial | No closure prerequisite | [Source 1](https://github.com/powerpuff-kitty/ai-catalogue/blob/3f102760baa0cee533342fd9d1e8facdafe9534c/generated/coverage.json) Snapshot has 115 vision records, not verified coverage of every requested task. Remaining: map detection through low-light enhancement, audit model versus toolkit roles, retain conversion/NPU evidence separately and review a bounded gap-filling batch. |
| [ai-catalogue#9](https://github.com/powerpuff-kitty/ai-catalogue/issues/9) — Sensor and industrial coverage | P1 | partial | No closure prerequisite | [Source 1](https://github.com/powerpuff-kitty/ai-catalogue/blob/3f102760baa0cee533342fd9d1e8facdafe9534c/generated/coverage.json) Snapshot has seven sensor and three manufacturing records. Remaining: audit vibration, IMU, radar, fall detection, maintenance, anomaly, environment and fusion coverage; distinguish vendor collections from individual usable models and retain explicit deployment unknowns. |
| [ai-catalogue#10](https://github.com/powerpuff-kitty/ai-catalogue/issues/10) — Geospatial and scientific coverage | P1 | partial | No closure prerequisite | [Source 1](https://github.com/powerpuff-kitty/ai-catalogue/blob/3f102760baa0cee533342fd9d1e8facdafe9534c/generated/coverage.json) Snapshot has geospatial, science, time-series and weather entries. Remaining: build the requested task/source coverage matrix, record input-data/downstream-head requirements and audit local-inference evidence; metadata counts alone do not close this research workstream. |
| [ai-catalogue#11](https://github.com/powerpuff-kitty/ai-catalogue/issues/11) — Evidence/completeness scoring | P2 | planned | No closure prerequisite | [Source 1](https://github.com/powerpuff-kitty/ai-catalogue/blob/3f102760baa0cee533342fd9d1e8facdafe9534c/generated/coverage.json) Coverage/unknown counters exist; they are not acceptance of the requested per-entry score. Remaining: define a transparent completeness rubric, expose missing fields and test edge cases across model/toolkit/primitive roles. Completeness must never be presented as model quality or measured performance. |
| [ai-catalogue#12](https://github.com/powerpuff-kitty/ai-catalogue/issues/12) — Link, manifest and generated-drift checks | P1 | partial | No closure prerequisite | [Source 1](https://github.com/powerpuff-kitty/ai-catalogue/blob/3f102760baa0cee533342fd9d1e8facdafe9534c/.github/workflows/catalog.yml), [Source 2](https://github.com/powerpuff-kitty/ai-catalogue/blob/3f102760baa0cee533342fd9d1e8facdafe9534c/docs/RUNNABLE-V02.md) Schema/test/drift/audit workflows and a non-blocking weekly link audit exist. Remaining: verify each original vocabulary/duplicate/evidence requirement against full data, capture successful CI/link reports after runner recovery and coordinate rename/parity with #84/#85. Workflow presence is not a passing execution. |
| [ai-catalogue#13](https://github.com/powerpuff-kitty/ai-catalogue/issues/13) — Embodied AI and learned-control coverage | P1 | partial | No closure prerequisite | [Source 1](https://github.com/powerpuff-kitty/ai-catalogue/blob/3f102760baa0cee533342fd9d1e8facdafe9534c/generated/coverage.json) Snapshot has 11 control and 14 robotics records. Remaining: map all requested embodied-control families and audit control rate, observations/actions, actuators, safety envelope and exact hardware evidence; retain absent values as unknown. Counts do not imply safe executable controllers. |
| [ai-catalogue#14](https://github.com/powerpuff-kitty/ai-catalogue/issues/14) — Bounded tiny-model training examples | P2 | planned | No closure prerequisite | [Source 1](https://github.com/powerpuff-kitty/ai-catalogue/blob/3f102760baa0cee533342fd9d1e8facdafe9534c/docs/RUNNABLE-V02.md) Training guidance and inference recipes do not establish the four requested end-to-end training pipelines. Remaining: bounded IMU, vibration, image and simulated-servo examples with declared budgets, non-ML baselines, dataset provenance, train/export steps and actual device or simulator reports. |

## Maintaining the plan

Edit `roadmap.json` and regenerate this file with the optional engine planning tool: `node /path/to/catalogue-engine/planning/roadmaps.mjs render /path/to/this-repository`. Use `check` instead of `render` to detect drift; pass all seven repository paths with `check-family` to validate dependency and parent graphs. The tool runs locally and does not query GitHub or prove live issue status. Verify linked issue/PR status when updating the snapshot.

Existing README/implementation documents retain their technical contracts. This root roadmap is the consolidated post-split plan, superseding older planning summaries without rewriting historical evidence. Link new work to an existing workstream or explain why it is separate. Do not close native backlog items merely because a shared adapter exists.

Merging these planning files does not merge feature PRs, enable scheduled jobs, publish an article/site/package, move canonical records or change repository visibility. Public releases, credentials and paid resource activation remain separate reviewed actions.
