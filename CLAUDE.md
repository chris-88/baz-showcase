# CLAUDE.md

Guidance for the development agent working on this project. Read this fully before making changes, and treat the **Definition of Done** as the bar for every task.

## What this is

The Baz showcase: a narrated five-minute showcase (`/`), the how-it-works explainer (`/how-it-works/:section?`) and the article (`/article`), served as a static site at `https://showcase.chrisquinn.ie`. It was extracted from the Baz proof of concept (`chris-88/digital-hack`, branch `next`) and has no dependency on the product code or any backend. Baz is a conversational layer over simulated retail banking for a fictional Demo Bank; everything shown is synthetic.

**Stack:** Vite + React + TypeScript · Tailwind v4 · shadcn/ui components (copied from the POC) · React Router (HashRouter) · Zod (copied card contracts) · Vitest + Testing Library · Playwright smoke test · GitHub Pages via GitHub Actions, custom domain `showcase.chrisquinn.ie` (DNS-only CNAME to `chris-88.github.io`). No Supabase.

## Operating philosophy: lean surface, high floor

1. **Keep the surface lean.** No speculative features, abstractions, or dependencies. This site is a presentation of content, not a product.
2. **Keep the floor high.** Strict types, tests, linting, CI gates and accessibility apply from the first commit.

When these tension, craft wins.

## Definition of Done

- [ ] `npm run typecheck`, `npm run lint`, `npm run format:check`, and `npm run test` all pass.
- [ ] New/changed logic has tests (behavior, not implementation detail).
- [ ] UI is keyboard-navigable and accessible (labels, focus, roles).
- [ ] No secrets anywhere; there is no backend and no env.
- [ ] Commit follows Conventional Commits. The diff is focused.

If you can't satisfy an item, say so explicitly rather than quietly skipping it.

## Content and data

- Copy lives in `src/content/**`. Values that used to come from the product's server code are JSON in `src/content/data/`, read through `src/content/data/snapshot.ts`. They were produced once by `scripts/snapshot/` (see its README) and are edited by hand from now on; do not re-run it, the POC has moved on.
- `src/contracts/` holds copies of the card and admin zod schemas the components are typed against. Treat them as local types.
- `src/baz/`, `src/admin/` and `src/components/` are presentational copies of product components, rendered inert. Do not add network calls.
- Links into the product (Back to Baz, privacy, ask) are absolute (`productUrl` in `src/app/routes.ts`).
- Audio is in `src/assets/showcase/` and imported as modules (hashed, never in `public/`).

## TypeScript and quality

- `strict`, `noUncheckedIndexedAccess`, no `any`, no `@ts-ignore` without a `// reason:`.
- ESLint flat config, Prettier with `prettier-plugin-tailwindcss` (no semicolons, single quotes, width 100). `src/components/ui/**` is shadcn output and is not linted or formatted.
- Tests sit next to the code (`*.test.ts[x]`); `e2e/` has a Playwright smoke test against `vite preview` (routes render, key headings exist).

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) runs typecheck, lint, format:check, test and build on every push to `main`, then publishes `dist/` to Pages. `public/CNAME` is `showcase.chrisquinn.ie`. `base` is `/`. HashRouter is required: Pages cannot serve deep links. `main` is deployable; push to `main` deploys.

## Commands

```bash
npm run dev            # local dev server
npm run build          # type-check + production build
npm run preview        # serve the build (port 4173 for e2e)
npm run typecheck && npm run lint && npm run format:check && npm run test
npm run e2e            # Playwright smoke test (needs `npm run build` first)
```

## Do not

- Import or copy product server code (`@domain`, `@llm`, `@tenants`); add data to the snapshot JSON instead.
- Proxy the Pages DNS record in Cloudflare (breaks certificate issuance).
- Add a dependency speculatively, or swap a pre-decided tool, without raising it.
- Deploy a `BrowserRouter` to Pages.

## When unsure

Make small, reversible changes directly. Confirm first for new dependencies, a different host, or a routing change.
