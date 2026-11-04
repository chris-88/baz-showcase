import * as real from 'poc-real/domain/reuse.ts'

export * from 'poc-real/domain/reuse.ts'

import { trace } from './store.ts'

export function formatFactValue(...args: Parameters<typeof real.formatFactValue>): string {
  const out = real.formatFactValue(...args)
  trace.formatFactValue[JSON.stringify([args[0], args[1]])] = out
  return out
}
