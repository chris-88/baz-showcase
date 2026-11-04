/**
 * Runs inside the Vite SSR loader started by run.mjs. Importing the POC's own content modules
 * executes every server call they make (through the tracing wrappers in ./trace), then this
 * file adds the tables the explainer renders from server constants.
 */
import { STAGES } from 'poc-real/domain/conversation/stages.ts'
import { APPLICATION_STATES, stateLabel } from 'poc-real/domain/state-machine.ts'
import { PROVENANCE } from 'poc-real/domain/reuse.ts'
import { CASE_STATUS_LABELS } from 'poc-real/domain/case.ts'
import { CONVERSATION } from 'poc-real/llm/conversation.ts'
import { TONE_BUCKETS, refusalFor, type RefusalReason } from 'poc-real/llm/refusals.ts'
import {
  PRESETS,
  PRESET_NAMES,
  SLIDER_NAMES,
  applySensitivity,
  composePersona,
  toneBucket,
} from 'poc-real/llm/persona.ts'
import { CONSENT_DAYS } from 'poc-real/domain/open-banking/synthesise.ts'
import { demoDomainConfig } from 'poc-real/tenants/demo/domain-config.ts'
import { trace as traceStore } from './trace/store.ts'
import 'poc-real/../src/content/how-it-works/story.ts'
import 'poc-real/../src/content/showcase/walkthrough.ts'

export function collect(): Record<string, unknown> {
  const trace = traceStore

  const refusals: Record<string, Record<string, string>> = {}
  for (const category of demoDomainConfig.categories) {
    refusals[category.id] = Object.fromEntries(
      TONE_BUCKETS.map((tone) => [tone, refusalFor(category.id as RefusalReason, tone)]),
    )
  }

  const results: Record<string, Record<string, unknown>> = {}
  for (const preset of PRESET_NAMES) {
    results[preset] = {}
    for (const sensitive of [false, true]) {
      const sliders = applySensitivity(PRESETS[preset], sensitive)
      results[preset]![String(sensitive)] = {
        sliders,
        bucket: toneBucket(sliders),
        composed: composePersona(sliders),
      }
    }
  }

  return {
    'state-labels': Object.fromEntries(APPLICATION_STATES.map((s) => [s, stateLabel(s)])),
    provenance: PROVENANCE,
    'fact-format': trace.formatFactValue,
    'data-notice': trace.dataNotice,
    'sign-in-prompt': trace.signIn,
    advisories: trace.advisories,
    'open-banking': {
      consentDays: CONSENT_DAYS,
      synth: trace.synth,
      summary: trace.summary,
      maskIban: trace.maskIban,
    },
    conversation: { stages: STAGES, guides: CONVERSATION },
    refusals: { toneBuckets: TONE_BUCKETS, byCategory: refusals },
    persona: { presets: PRESETS, presetNames: PRESET_NAMES, sliderNames: SLIDER_NAMES, results },
    'case-status-labels': CASE_STATUS_LABELS,
    'domain-config': demoDomainConfig,
  }
}
