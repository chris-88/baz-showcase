import * as real from 'poc-real/llm/sign-in-prompt.ts'

export * from 'poc-real/llm/sign-in-prompt.ts'

import { trace } from './store.ts'

export function signInPromptCard(href: string): ReturnType<typeof real.signInPromptCard> {
  const out = real.signInPromptCard(href)
  trace.signIn[href] = out
  return out
}
