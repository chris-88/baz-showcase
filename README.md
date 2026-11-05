# baz-showcase

The Baz showcase, the how-it-works explainer and the article, as a standalone static site. Extracted from the Baz proof of concept (`chris-88/digital-hack`, branch `next`); it has no dependency on the product code.

Live: https://showcase.saoi.ie

```bash
npm install && npm run dev
```

Routes (hash routing): `/#/` showcase, `/#/how-it-works/:section?`, `/#/article`.

The content modules used to call the product's server code. They now read JSON snapshots in `src/content/data/`, produced once by `scripts/snapshot/` (see its README). Links into the product (Back to Baz, privacy, ask) go to `https://app.saoi.ie`.

Licence: AGPL-3.0-only.
