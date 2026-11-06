# Snapshot script

Run once against the Saoi POC at commit `094e559908734dfc897d276901b0302460bba382` (`origin/next` of `digital-hack`); it is not wired into the build and the POC is not a dependency.

```bash
git -C <digital-hack> archive origin/next | tar -x -C /tmp/poc
ln -s $PWD/node_modules /tmp/poc/node_modules
node scripts/snapshot/run.mjs /tmp/poc
```

`run.mjs` loads the POC's own content modules (`story.ts`, `walkthrough.ts`) through Vite SSR, with tracing wrappers (`trace/`) around the server functions they call, and writes `src/content/data/*.json`. `entry.ts` adds the tables the explainer renders from server constants. `src/content/data/snapshot.ts` is the typed reader.

Snapshotted: application state labels, fact provenance, every `formatFactValue` result the story uses, the data-notice and sign-in cards, the loan-versus-mortgage advisory, the synthesised AIB accounts and their summary, the conversation stage guides and stage list, refusal text per category and tone, persona presets with composed prompts for every preset and sensitivity, case status labels, and the demo domain config.

Replaced by static values (runtime input, nothing to snapshot): the sign-in form is a disabled picture of its first step (the product sends a code through its auth backend); the "Want to work on this?" form on how-it-works is a card linking to the product's ask page; the console cutaway's API client (`src/admin/adminClient.ts`) refuses all calls. Contracts (`src/contracts/`) are copies of the POC's card and admin zod schemas with their constant lists inlined in `consts.ts`.

The POC's drift tests (content against the server) were not carried over; the snapshot is the record.
