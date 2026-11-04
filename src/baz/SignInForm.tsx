import { type ReactNode } from 'react'
import { MailIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { m } from 'motion/react'
import { fade, useStill } from '@/lib/motion'

/**
 * The first step of the product's sign-in form: an address and a button.
 *
 * The product sends a code through its auth backend. This site has none, so the form is the
 * picture of it and sending is a no-op; the cards that show it are inert in the walkthrough.
 */
export function SignInForm({ disabled }: { disabled?: boolean }): ReactNode {
  const still = useStill()
  return (
    <div className="space-y-2">
      <m.div {...(still ? {} : fade)}>
        <Input
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-label="Your email address"
          disabled={disabled ?? false}
          readOnly
        />
        <Button className="w-full" disabled>
          <MailIcon className="size-4" />
          Send me a code
        </Button>
      </m.div>
    </div>
  )
}
