// One-off: regenerate src/assets/qr/read-article.svg. Run: npm i --no-save qrcode && node scripts/qr.mjs
import { createRequire } from 'node:module'
import { writeFileSync } from 'node:fs'
const QR = createRequire(import.meta.url)('qrcode')
const url = process.argv[2] ?? 'https://showcase.saoi.ie/#/article'
const out = process.argv[3] ?? 'src/assets/qr/read-article.svg'
let svg = await QR.toString(url, { type: 'svg', margin: 4, errorCorrectionLevel: 'M' })
svg = svg.replace(/^<svg xmlns="([^"]+)"/, '<svg xmlns="$1" width="1024" height="1024"')
writeFileSync(out, svg)
