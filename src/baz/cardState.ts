import type { Card } from '@/contracts/cards'

/**
 * The two pieces of the product's card-settling logic the cards render: what a card says once
 * it has been acted on, and what a transfer settles to. Copied from the POC; the rest of that
 * module reads the database and has no place in a static site.
 */
export type Settled = {
  /** What happened, in the customer's terms. It replaces the card rather than captioning it. */
  readonly label: string
  /** One line of detail or reassurance, where there is something worth adding. */
  readonly note?: string
}

const euro = (amount: number): string => `€${Math.round(amount).toLocaleString('en-IE')}`

export function settledTransfer(transfer: {
  readonly amount: number
  readonly cadence: 'once' | 'monthly'
  readonly toLabel: string
}): Settled {
  return transfer.cadence === 'monthly'
    ? {
        label: `${euro(transfer.amount)} a month to ${transfer.toLabel}`,
        note: 'Set up through Nexus under PSD2. The first one is on its way; Baz will say when it lands.',
      }
    : {
        label: `${euro(transfer.amount)} on its way to ${transfer.toLabel}`,
        note: 'Instructed through Nexus under PSD2. Baz will say when it lands.',
      }
}

/** A conversation entry as the transcript renders it. */
export type TurnEntry =
  | {
      readonly kind: 'message'
      readonly id: string
      readonly author: 'baz' | 'customer'
      readonly text: string
      readonly messageId?: string
    }
  | {
      readonly kind: 'card'
      readonly id: string
      readonly card: Card
      readonly settled?: { readonly label: string }
    }
