import type { ReactNode } from 'react'
import { ArrowRightIcon, HandshakeIcon } from 'lucide-react'
import { productUrl } from '@/app/routes'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

/**
 * "Want to work on this?"
 *
 * In the product this is a form that writes to its backend. This site has no backend, so the
 * same card hands over to the product's own page, where the form lives.
 */
export function Collaborate({ className }: { readonly className?: string }): ReactNode {
  return (
    <section className={cn('scroll-mt-20', className)} id="collaborate">
      <Card className="max-w-2xl">
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
              <HandshakeIcon className="text-primary size-5" aria-hidden />
              Want to work on this?
            </h2>
            <p className="text-muted-foreground text-sm text-pretty">
              Baz is a proof of concept. If you’d like to take it further, in a bank or alongside
              one, leave your details.
            </p>
          </div>
          <Button asChild>
            <a href={productUrl.ask}>
              Ask or join in
              <ArrowRightIcon className="size-4" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </section>
  )
}
