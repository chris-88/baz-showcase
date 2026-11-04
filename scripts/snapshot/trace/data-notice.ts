import * as real from 'poc-real/llm/data-notice.ts'

export * from 'poc-real/llm/data-notice.ts'

import { trace } from './store.ts'

export function dataNoticeCard(href: string): ReturnType<typeof real.dataNoticeCard> {
  const out = real.dataNoticeCard(href)
  trace.dataNotice[href] = out
  return out
}
