import { beforeAll, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Article } from '@/surfaces/Article'
import { HowItWorks } from '@/surfaces/HowItWorks'
import { Showcase } from '@/surfaces/Showcase'

beforeAll(() => {
  window.matchMedia = (query: string): MediaQueryList =>
    ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
    }) as MediaQueryList
})

function renderAt(element: React.ReactNode): void {
  render(<MemoryRouter>{element}</MemoryRouter>)
}

describe('surfaces', () => {
  it('the showcase opens on its title', () => {
    renderAt(<Showcase />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })

  it('the explainer renders its chapters', () => {
    renderAt(<HowItWorks />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })

  it('the article renders', () => {
    renderAt(<Article />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })
})
