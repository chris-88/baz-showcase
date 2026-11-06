import type { ShowcaseCue, WalkthroughScene } from './types'

/**
 * The middle of the showcase: what.
 *
 * Eight windows for the savings story. Times are provisional until the narration is
 * mastered, then they are where the narrator's words land. Each cue carries only what this
 * chapter draws: the step's name on the rail and one line beneath it. What each step claims,
 * and the evidence, is in the feature document, not on the screen. The transcript the phone
 * replays is in `walkthrough.ts`.
 */
export const WALKTHROUGH_CUES: readonly ShowcaseCue<WalkthroughScene>[] = [
  {
    id: 'arrive',
    chapter: 'walkthrough',
    startMs: 0,
    endMs: 19_200,
    scene: 'arrive',
    presenter: { eyebrow: 'Life context', title: 'Start with the person, not a product.' },
  },
  {
    id: 'understand',
    chapter: 'walkthrough',
    startMs: 19_200,
    endMs: 39_400,
    scene: 'understand',
    presenter: { eyebrow: 'Discovery', title: 'One conversation builds understanding.' },
  },
  {
    id: 'link',
    chapter: 'walkthrough',
    startMs: 39_400,
    endMs: 62_000,
    scene: 'link',
    presenter: { eyebrow: 'Open banking', title: 'See the money where it is, through PSD2.' },
  },
  {
    id: 'arrange',
    chapter: 'walkthrough',
    startMs: 62_000,
    endMs: 86_500,
    scene: 'arrange',
    presenter: { eyebrow: 'Money working', title: 'Arithmetic on published rates, not opinion.' },
  },
  {
    id: 'authenticate',
    chapter: 'walkthrough',
    startMs: 86_500,
    endMs: 111_500,
    scene: 'authenticate',
    presenter: { eyebrow: 'Sign in and the form', title: 'What the bank holds does the typing.' },
  },
  {
    id: 'move',
    chapter: 'walkthrough',
    startMs: 111_500,
    endMs: 135_600,
    scene: 'move',
    presenter: {
      eyebrow: 'PSD2 payment',
      title: 'Her tap is a PSD2 payment instruction. The deposit comes here.',
    },
  },
  {
    id: 'later',
    chapter: 'walkthrough',
    startMs: 135_600,
    endMs: 161_800,
    scene: 'later',
    presenter: { eyebrow: 'Months later', title: 'The bank comes back when the deposit is there.' },
  },
  {
    id: 'govern',
    chapter: 'walkthrough',
    startMs: 161_800,
    endMs: 184_000,
    scene: 'govern',
    presenter: { eyebrow: 'Governance', title: 'Governance is part of the design.' },
  },
]
