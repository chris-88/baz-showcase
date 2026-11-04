/**
 * Typed access to the JSON written once by `scripts/snapshot/run.mjs` against the Baz POC.
 *
 * The content modules used to call the product's server code (`@domain`, `@llm`, `@tenants`)
 * and print the result. They now read what those calls returned. Anything here that takes an
 * argument is a lookup of a call the POC actually made; asking for one it did not make throws,
 * so a content edit that needs a new value fails loudly instead of rendering a blank.
 */
import { productUrl } from '@/app/routes'
import type { Card } from '@/contracts/cards'
import type { APPLICATION_STATES, PRODUCTS, PRESET_NAMES, SLIDER_NAMES } from '@/contracts/consts'
import stateLabels from './state-labels.json'
import provenance from './provenance.json'
import factFormat from './fact-format.json'
import dataNotice from './data-notice.json'
import signInPrompt from './sign-in-prompt.json'
import advisories from './advisories.json'
import openBanking from './open-banking.json'
import conversation from './conversation.json'
import refusals from './refusals.json'
import persona from './persona.json'
import caseStatusLabels from './case-status-labels.json'
import domainConfig from './domain-config.json'

export type ApplicationState = (typeof APPLICATION_STATES)[number]
export type Product = (typeof PRODUCTS)[number]
export type PresetName = (typeof PRESET_NAMES)[number]
export type SliderName = (typeof SLIDER_NAMES)[number]
export type CaseStatus = keyof typeof caseStatusLabels
export type ToneBucket = 'formal' | 'neutral' | 'playful'
export type Stage =
  'opening' | 'direction' | 'discovering' | 'planning' | 'arranging' | 'choosing' | 'applying'
export type DomainCategoryId = keyof typeof refusals.byCategory
export type FactKey = string
export type FactSource = keyof typeof provenance

function lookup<T>(table: Readonly<Record<string, T>>, key: string, what: string): T {
  const value = table[key]
  if (value === undefined) throw new Error(`No snapshot for ${what} ${key}`)
  return value
}

export const stateLabel = (state: ApplicationState): string =>
  lookup(stateLabels, state, 'state label')

export const PROVENANCE: Readonly<Record<string, string>> = provenance

export const formatFactValue = (key: FactKey, value: unknown): string =>
  lookup(factFormat, JSON.stringify([key, value]), 'formatted fact')

/** The privacy notice is a page of the product, so its hash link becomes an absolute one. */
const toProduct = (card: unknown): Card =>
  JSON.parse(
    JSON.stringify(card).replaceAll('"#/privacy"', JSON.stringify(productUrl.privacy)),
  ) as Card

export const dataNoticeCard = (href: string): Card =>
  toProduct(lookup(dataNotice, href, 'data notice'))
export const signInPromptCard = (href: string): Card =>
  toProduct(lookup(signInPrompt, href, 'sign-in prompt'))

/** The one advisory the story case raises (a personal loan open beside a mortgage). */
export type Advisory = {
  readonly id: string
  readonly title: string
  readonly explanation: string
  readonly actions: readonly string[]
  readonly appliesTo: string
}
export const evaluateAdvisories = (): readonly Advisory[] => advisories[0]?.output ?? []

export const CONSENT_DAYS: number = openBanking.consentDays
export const maskIban = (iban: string): string => lookup(openBanking.maskIban, iban, 'masked IBAN')

export type SnapshotAccount = {
  readonly ref: 'current' | 'savings'
  readonly displayName: string
  readonly accountType: 'current' | 'savings'
  readonly iban: string
  readonly balance: number
}
export type AccountsSummary = {
  readonly month: { readonly moneyIn: number; readonly moneyOut: number }
  readonly salary: {
    readonly amount: number
    readonly employer: string
    readonly lastOn: string
  } | null
  readonly regular: readonly {
    readonly label: string
    readonly amount: number
    readonly cadence: string
  }[]
  readonly savingsHeld: number
}
export const SHOWCASE_ACCOUNTS = (openBanking.synth[0]?.accounts ??
  []) as readonly SnapshotAccount[]
export const SHOWCASE_SUMMARY = openBanking.summary[0] as AccountsSummary

export type StageGuide = {
  readonly name: string
  readonly purpose: string
  readonly length: string
  readonly todo: readonly string[]
  readonly notYet: readonly string[]
  readonly tools: readonly string[]
}
export const STAGES = conversation.stages as readonly Stage[]
export const CONVERSATION = conversation.guides as Readonly<Record<Stage, StageGuide>>

export const TONE_BUCKETS: readonly ToneBucket[] = refusals.toneBuckets as ToneBucket[]
export const refusalFor = (category: string, tone: ToneBucket = 'neutral'): string =>
  lookup(
    lookup(refusals.byCategory as Record<string, Record<string, string>>, category, 'refusal'),
    tone,
    'tone',
  )

export type PersonaSliders = Readonly<Record<SliderName, number>>
export const PRESETS = persona.presets as Readonly<Record<PresetName, PersonaSliders>>
type PersonaResult = { sliders: PersonaSliders; bucket: ToneBucket; composed: string }
export const personaPreset = (preset: PresetName, sensitive: boolean): PersonaResult =>
  lookup(
    lookup(persona.results as Record<string, Record<string, PersonaResult>>, preset, 'preset'),
    String(sensitive),
    'sensitivity',
  )

export const CASE_STATUS_LABELS = caseStatusLabels as Readonly<Record<CaseStatus, string>>

export type DomainCategory = {
  readonly id: DomainCategoryId
  readonly label: string
  readonly reachesModel: boolean
  readonly description: string
  readonly examples: readonly string[]
}
export const demoDomainConfig = domainConfig as {
  readonly tenant: string
  readonly assistantName: string
  readonly inScope: readonly string[]
  readonly outOfScope: readonly string[]
  readonly categories: readonly DomainCategory[]
}
