import { createHashRouter, Navigate } from 'react-router-dom'
import { Article } from '@/surfaces/Article'
import { LazyHowItWorks } from '@/app/lazyHowItWorks'
import { LazyShowcase } from '@/app/lazyShowcase'

export const router = createHashRouter([
  { path: '/', element: <LazyShowcase /> },
  { path: '/how-it-works/:section?', element: <LazyHowItWorks /> },
  { path: '/article', element: <Article /> },
  // The product's old address for the showcase.
  { path: '/showcase', element: <Navigate to="/" replace /> },
  { path: '*', element: <Navigate to="/" replace /> },
])
