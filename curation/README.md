# ai-catalogue: curator profile

This directory configures the shared curator in `powerpuff-kitty/catalogue-engine`; it does not copy the engine or add a second scheduler. The implementation is optional and review-only. Prerequisite: this repository's shared-catalogue work in #81, plus the engine curator PR. No running service is enabled by these files.

`profile.json` owns scope, taxonomy, field selectors and limits. `profile.policy` is the trusted model policy. `sources.json` owns bounded GitHub discovery queries and an optional watchlist. `reviews.json` records explicit human decisions. `registry.example.json` is a disabled operations-registry entry, not a deployment instruction.

## Canonical boundary

The inventory source is `generated/catalog.full.json`. The curator only projects IDs, titles and GitHub repository links from it at an immutable revision. It does not replace its schema or validator. Non-GitHub records are counted and excluded by the first connector, not removed from the catalogue.

Proposals go to `curation/proposals/<run-id>.json`, not the canonical records. They contain generic suggested fields, exact supporting quotes, source URLs, limitations and an explicit publisher-claimed evidence level. A human must inspect those claims and translate approved changes into this catalogue's canonical schema using the existing validation workflow. Merging a dossier alone does not add or update a catalogue record. Product/candidate/reference and tested/unverified distinctions must survive any promotion.

The static explorer, generated exports, dependency lock and existing search remain unchanged. Dossiers are not consumed by their build. Draft is not private: a draft pull request is visible to anyone who can read the repository.

## Local validation and inventory

With `ENGINE_ROOT` pointing to the reviewed engine checkout:

```sh
node "$ENGINE_ROOT/packages/curator/cli.mjs" validate \
  --profile curation/profile.json --sources curation/sources.json
node "$ENGINE_ROOT/packages/curator/cli.mjs" inventory \
  --profile curation/profile.json --input generated/catalog.full.json \
  --revision "$(git rev-parse HEAD)" --output /tmp/ai-catalogue-inventory.json
```

Use only a clean committed source corresponding to the supplied revision. The hosted loader fetches all input files at the same revision automatically. The engine's `docs/CURATOR.md` documents live CLI commands, SQLite state, model/provider configuration, App credentials, Cloudflare deployment and recovery. Never commit tokens, private keys, raw operational reports or SQLite databases here.

## Human review decisions

`reviews.json` is initially empty. A decision has `identity` (stable `github:<numeric-id>` from a proposal), `decision` (`accepted`, `rejected`, or `deferred`), `reason`, `reviewer`, `reviewedAt`, and `reviewAfter` (UTC dates). Commit reviewed decisions through a normal human-reviewed PR. No bot automatically interprets a merged/closed PR as permission to publish or as proof of technical correctness.

Daily runs maintain a rotating batch and investigate a small discovery shortlist. Weekly runs may reuse prior assessments of existing catalogue records to draft selections; new, unapproved candidates cannot be featured as canonical entries. Every edition remains a draft. The engine has no automatic public feed publication in this milestone.

## Activation

Keep this registry entry disabled until the prerequisites are merged and the canonical source is available on `main`. Add its reviewed contents to the shared Worker's operator registry. Execution requires both `CURATOR_ENABLED=true` and this target's `enabled=true`. Draft-PR creation additionally requires `CURATOR_PUBLISH=true` and target `publish=true`, plus a scoped GitHub App. There are no scheduled Actions in this repository: one shared Worker owns the 04:17 UTC daily and 05:43 UTC Monday schedules.

Initial limits are safety ceilings, not promised throughput or an inclusive dollar budget. Inspect token reservations, source rate-limit failures and backlog before increasing them. Missing-run alerting, retention and live-provider quality evaluation are deployment gates documented in the engine runbook.
