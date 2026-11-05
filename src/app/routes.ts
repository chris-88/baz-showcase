/**
 * Every address in one place. Hash routing: GitHub Pages has no rewrites.
 *
 * The showcase is this site's home page. Baz itself, its landing page, its privacy notice and
 * the questions form live in the product at `product`, so links to them are plain absolute
 * links rather than routes of this app.
 */
const product = 'https://app.saoi.ie/#'

export const routes = {
  /** The narrated showcase: five minutes for a room, started by one click and nothing else. */
  showcase: '/',

  /** The explainer, for somebody evaluating the work. Optionally `/how-it-works/<section>`. */
  howItWorks: '/how-it-works',

  /** The executive article the showcase ends on. */
  article: '/article',
} as const

/** Pages that belong to the product, not to this site. */
export const productUrl = {
  landing: `${product}/`,
  baz: `${product}/baz`,
  privacy: `${product}/privacy`,
  ask: `${product}/ask`,
} as const
