import * as real from 'poc-real/domain/advisories.ts'

export * from 'poc-real/domain/advisories.ts'

import { trace } from './store.ts'

export function evaluateAdvisories(
  ...args: Parameters<typeof real.evaluateAdvisories>
): ReturnType<typeof real.evaluateAdvisories> {
  const out = real.evaluateAdvisories(...args)
  trace.advisories.push({ input: args[0], output: out })
  return out
}
