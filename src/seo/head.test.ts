import { describe, expect, it } from 'vitest'
import { getSeoHeadData } from './head'

describe('SEO head data', () => {
  it('builds the Russian root metadata', () => {
    const data = getSeoHeadData('ru', '/')

    expect(data.title).toBe('Русскоговорящий гид в Коста-Рике — Ольга Наймушина')
    expect(data.canonical).toBe('https://costaricatures.com/')
    expect(data.alternates.es).toBe('https://costaricatures.com/es/')
    expect(data.alternates.en).toBe('https://costaricatures.com/en/')
  })

  it('builds localized About metadata', () => {
    const data = getSeoHeadData('es', '/es/about/')

    expect(data.canonical).toBe('https://costaricatures.com/es/about/')
    expect(data.alternates.ru).toBe('https://costaricatures.com/about/')
    expect(data.structuredData['@graph']).toEqual(
      expect.arrayContaining([expect.objectContaining({ '@type': 'AboutPage' })]),
    )
  })

  it('builds a tour title without a language prefix in the canonical', () => {
    const data = getSeoHeadData('en', '/en/tour-info/1/')

    expect(data.title).toContain('Costa Rica')
    expect(data.canonical).toBe('https://costaricatures.com/en/tour-info/1/')
  })

  it('adds FAQPage on the FAQ page', () => {
    const data = getSeoHeadData('ru', '/faq/')

    expect(data.structuredData['@graph']).toEqual(
      expect.arrayContaining([expect.objectContaining({ '@type': 'FAQPage' })]),
    )
  })
})
