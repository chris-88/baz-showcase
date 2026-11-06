import type { OpportunityScene, ShowcaseCue } from './types'

/**
 * The first sixty seconds: why.
 *
 * Times are where the narrator's words land in `opportunity.mp3` (the 2026-11-06 read, 49.3 s):
 * each cue starts on the first word of its sentence (word timestamps taken from the track, see
 * the README).
 */
export const OPPORTUNITY_CUES: readonly ShowcaseCue<OpportunityScene>[] = [
  {
    id: 'headline',
    chapter: 'opportunity',
    startMs: 0,
    endMs: 7_970,
    scene: 'headline',
    presenter: {
      eyebrow: 'The opportunity',
      title: 'People don’t experience life in banking products.',
    },
  },
  {
    id: 'fragments',
    chapter: 'opportunity',
    startMs: 7_970,
    endMs: 22_470,
    scene: 'fragments',
    presenter: {
      eyebrow: 'Today’s experience',
      title: 'Those moments become separate journeys.',
    },
  },
  {
    id: 'question',
    chapter: 'opportunity',
    startMs: 22_470,
    endMs: 26_640,
    scene: 'question',
    presenter: {
      eyebrow: 'A different starting point',
      title: 'What if instead, we started with a simple conversation?',
    },
  },
  {
    id: 'meet',
    chapter: 'opportunity',
    startMs: 26_640,
    endMs: 37_980,
    scene: 'meet',
    presenter: {
      eyebrow: 'Meet Saoirse',
      title: 'Discover, understand, connect.',
    },
  },
  {
    id: 'capability',
    chapter: 'opportunity',
    startMs: 37_980,
    endMs: 49_280,
    scene: 'capability',
    presenter: {
      eyebrow: 'Built on what exists',
      title: 'Capabilities the bank already owns.',
    },
  },
]
