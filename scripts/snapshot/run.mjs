// One-off: node scripts/snapshot/run.mjs <path to extracted POC checkout> [outDir]
// Loads the POC's server modules through Vite SSR and writes src/content/data/*.json.
import { createServer } from 'vite'
import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const poc = path.resolve(process.argv[2] ?? '')
const out = path.resolve(process.argv[3] ?? path.join(here, '../../src/content/data'))
const shared = path.join(poc, 'supabase/functions/_shared')
const trace = (f) => path.join(here, 'trace', f)

const server = await createServer({
  root: here,
  configFile: false,
  logLevel: 'error',
  appType: 'custom',
  server: { middlewareMode: true, fs: { strict: false } },
  resolve: {
    alias: [
      { find: /^@domain\/reuse\.ts$/, replacement: trace('reuse.ts') },
      { find: /^@llm\/data-notice\.ts$/, replacement: trace('data-notice.ts') },
      { find: /^@llm\/sign-in-prompt\.ts$/, replacement: trace('sign-in-prompt.ts') },
      { find: /^@domain\/advisories\.ts$/, replacement: trace('advisories.ts') },
      { find: /^@domain\/open-banking\/synthesise\.ts$/, replacement: trace('synthesise.ts') },
      { find: /^@domain\/open-banking\/summarise\.ts$/, replacement: trace('summarise.ts') },
      { find: /^poc-real\/\.\.\//, replacement: poc + '/' },
      { find: /^poc-real\//, replacement: shared + '/' },
      { find: /^@domain\//, replacement: shared + '/domain/' },
      { find: /^@llm\//, replacement: shared + '/llm/' },
      { find: /^@tenants\//, replacement: shared + '/tenants/' },
      { find: /^@contracts\//, replacement: shared + '/contracts/' },
      { find: /^@db\//, replacement: shared + '/db/' },
      { find: /^@\//, replacement: poc + '/src/' },
    ],
  },
  ssr: { noExternal: true },
})

try {
  const mod = await server.ssrLoadModule(path.join(here, 'entry.ts'))
  const data = mod.collect()
  mkdirSync(out, { recursive: true })
  for (const [name, value] of Object.entries(data)) {
    writeFileSync(path.join(out, `${name}.json`), JSON.stringify(value, null, 2) + '\n')
    console.log('wrote', name)
  }
} finally {
  await server.close()
}
