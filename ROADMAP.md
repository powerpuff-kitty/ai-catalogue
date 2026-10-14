<!-- Generated from roadmap.json by catalogue-engine/planning/roadmaps.mjs. -->
# AI Catalogue roadmap

Snapshot: **2026-10-14**. Planning alignment: [catalogue-engine#12](https://github.com/powerpuff-kitty/catalogue-engine/issues/12). [Machine-readable plan](roadmap.json).

## Current baseline

The native catalogue and interfaces predate this split. Shared-preview PR #81 and curator-profile PR #83 are open; full-source/shared-interface parity and active rename surfaces remain incomplete. Older open issues below need evidence-based reconciliation, not blanket closure.

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

## Retained native backlog

**Exit gate:** Reconcile each existing open issue against code, reports and current tests; preserve or narrow outstanding scope before closure.

| Issue / deliverable | Priority | Snapshot status | Prerequisites | Implementation / scope |
|---|---|---|---|---|
| [ai-catalogue#1](https://github.com/powerpuff-kitty/ai-catalogue/issues/1) — Reproducible benchmark harness | P2 | needs-triage | No closure prerequisite | Existing open issue retained. Some implementation may already exist; verify residual scope before closing. Completeness is not model quality; unknowns remain unknown. |
| [ai-catalogue#2](https://github.com/powerpuff-kitty/ai-catalogue/issues/2) — RV1106 / SEEN-0 benchmark stack | P2 | needs-triage | No closure prerequisite | Existing open issue retained. Some implementation may already exist; verify residual scope before closing. Completeness is not model quality; unknowns remain unknown. |
| [ai-catalogue#3](https://github.com/powerpuff-kitty/ai-catalogue/issues/3) — Hardware compatibility matrix | P2 | needs-triage | No closure prerequisite | Existing open issue retained. Some implementation may already exist; verify residual scope before closing. Completeness is not model quality; unknowns remain unknown. |
| [ai-catalogue#4](https://github.com/powerpuff-kitty/ai-catalogue/issues/4) — Native searchable catalogue site | P2 | needs-triage | No closure prerequisite | Existing open issue retained. Some implementation may already exist; verify residual scope before closing. Completeness is not model quality; unknowns remain unknown. |
| [ai-catalogue#5](https://github.com/powerpuff-kitty/ai-catalogue/issues/5) — Versioned machine-readable JSON indexes | P2 | needs-triage | No closure prerequisite | Existing open issue retained. Some implementation may already exist; verify residual scope before closing. Completeness is not model quality; unknowns remain unknown. |
| [ai-catalogue#6](https://github.com/powerpuff-kitty/ai-catalogue/issues/6) — Benchmark evidence schema | P2 | needs-triage | No closure prerequisite | Existing open issue retained. Some implementation may already exist; verify residual scope before closing. Completeness is not model quality; unknowns remain unknown. |
| [ai-catalogue#7](https://github.com/powerpuff-kitty/ai-catalogue/issues/7) — Audio coverage | P2 | needs-triage | No closure prerequisite | Existing open issue retained. Some implementation may already exist; verify residual scope before closing. Completeness is not model quality; unknowns remain unknown. |
| [ai-catalogue#8](https://github.com/powerpuff-kitty/ai-catalogue/issues/8) — Vision coverage | P2 | needs-triage | No closure prerequisite | Existing open issue retained. Some implementation may already exist; verify residual scope before closing. Completeness is not model quality; unknowns remain unknown. |
| [ai-catalogue#9](https://github.com/powerpuff-kitty/ai-catalogue/issues/9) — Sensor and industrial coverage | P2 | needs-triage | No closure prerequisite | Existing open issue retained. Some implementation may already exist; verify residual scope before closing. Completeness is not model quality; unknowns remain unknown. |
| [ai-catalogue#10](https://github.com/powerpuff-kitty/ai-catalogue/issues/10) — Geospatial and scientific coverage | P2 | needs-triage | No closure prerequisite | Existing open issue retained. Some implementation may already exist; verify residual scope before closing. Completeness is not model quality; unknowns remain unknown. |
| [ai-catalogue#11](https://github.com/powerpuff-kitty/ai-catalogue/issues/11) — Evidence/completeness scoring | P2 | needs-triage | No closure prerequisite | Existing open issue retained. Some implementation may already exist; verify residual scope before closing. Completeness is not model quality; unknowns remain unknown. |
| [ai-catalogue#12](https://github.com/powerpuff-kitty/ai-catalogue/issues/12) — Link, manifest and generated-drift checks | P2 | needs-triage | No closure prerequisite | Existing open issue retained. Some implementation may already exist; verify residual scope before closing. Completeness is not model quality; unknowns remain unknown. |
| [ai-catalogue#13](https://github.com/powerpuff-kitty/ai-catalogue/issues/13) — Embodied AI and learned-control coverage | P2 | needs-triage | No closure prerequisite | Existing open issue retained. Some implementation may already exist; verify residual scope before closing. Completeness is not model quality; unknowns remain unknown. |
| [ai-catalogue#14](https://github.com/powerpuff-kitty/ai-catalogue/issues/14) — Bounded tiny-model training examples | P2 | needs-triage | No closure prerequisite | Existing open issue retained. Some implementation may already exist; verify residual scope before closing. Completeness is not model quality; unknowns remain unknown. |

## Maintaining the plan

Edit `roadmap.json` and regenerate this file with the optional engine planning tool: `node /path/to/catalogue-engine/planning/roadmaps.mjs render /path/to/this-repository`. Use `check` instead of `render` to detect drift; pass all seven repository paths with `check-family` to validate dependency and parent graphs. The tool runs locally and does not query GitHub or prove live issue status. Verify linked issue/PR status when updating the snapshot.

Existing README/implementation documents retain their technical contracts. This root roadmap is the consolidated post-split plan, superseding older planning summaries without rewriting historical evidence. Link new work to an existing workstream or explain why it is separate. Do not close native backlog items merely because a shared adapter exists.

Merging these planning files does not merge feature PRs, enable scheduled jobs, publish an article/site/package, move canonical records or change repository visibility. Public releases, credentials and paid resource activation remain separate reviewed actions.
