import articleSvg from '@/assets/qr/read-article.svg?raw'
import bazSvg from '@/assets/qr/open-baz.svg?raw'
import { describe, expect, it } from 'vitest'
import { showcaseConfig } from './config'

describe('QR codes and showcase links', () => {
  it('encodes the showcase site for the article', () => {
    expect(showcaseConfig.articleUrl).toBe('https://showcase.saoi.ie/#/article')
    expect(showcaseConfig.articleShort).toBe('showcase.saoi.ie/#/article')
  })

  it('keeps product links on the product', () => {
    expect(showcaseConfig.liveDemoUrl).toBe('https://app.saoi.ie/#/baz')
    expect(showcaseConfig.askUrl).toBe('https://app.saoi.ie/#/ask')
  })

  it('has regenerated the article QR image (script prints the URL it encodes)', () => {
    expect(articleSvg).toContain('width="1024" height="1024"')
    expect(articleSvg).not.toBe(bazSvg)
  })
})
