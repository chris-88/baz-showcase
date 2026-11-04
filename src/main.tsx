import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { LazyMotion, domAnimation } from 'motion/react'
import { router } from '@/app/router'
import '@/styles/fonts.css'
import '@/index.css'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element #root is missing from index.html')

createRoot(rootElement).render(
  <StrictMode>
    {/* The product's own setting: `m` components pick up features from here, the explainer uses
        the full `motion` import inside its lazy chunk, which is why this is not `strict`. */}
    <LazyMotion features={domAnimation}>
      <RouterProvider router={router} />
    </LazyMotion>
  </StrictMode>,
)
