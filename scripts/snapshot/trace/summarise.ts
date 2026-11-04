import * as real from 'poc-real/domain/open-banking/summarise.ts'

export * from 'poc-real/domain/open-banking/summarise.ts'

import { trace } from './store.ts'

export function summariseAccounts(
  ...args: Parameters<typeof real.summariseAccounts>
): ReturnType<typeof real.summariseAccounts> {
  const out = real.summariseAccounts(...args)
  trace.summary.push(out)
  return out
}
