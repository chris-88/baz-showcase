/** The result of asking for notifications. The showcase never subscribes; the type is the card's. */
export type SubscribeResult =
  | { readonly state: 'subscribed' }
  | { readonly state: 'denied' }
  | { readonly state: 'unsupported'; readonly reason: string }
  | { readonly state: 'failed'; readonly reason: string }

/** Already allowed, already refused, or never asked. Lets the UI avoid asking twice. */
export function pushPermission(): NotificationPermission | 'unsupported' {
  if (!('Notification' in window) || !('serviceWorker' in navigator)) return 'unsupported'
  return Notification.permission
}
