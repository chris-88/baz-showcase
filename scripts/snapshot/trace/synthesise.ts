import * as real from 'poc-real/domain/open-banking/synthesise.ts'

export * from 'poc-real/domain/open-banking/synthesise.ts'

import { trace } from './store.ts'

export function synthesiseAccounts(
  ...args: Parameters<typeof real.synthesiseAccounts>
): ReturnType<typeof real.synthesiseAccounts> {
  const out = real.synthesiseAccounts(...args)
  trace.synth.push({ accounts: out.accounts })
  return out
}

export function maskIban(iban: string): string {
  const out = real.maskIban(iban)
  trace.maskIban[iban] = out
  return out
}
