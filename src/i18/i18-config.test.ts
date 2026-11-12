import { describe, expect, it } from 'vitest'
import { createI18n } from './i18-config'

describe('createI18n', () => {
  it('creates an instance for the requested language', () => {
    expect(createI18n('en').language).toBe('en')
    expect(createI18n('es').language).toBe('es')
  })

  it('contains the about page keys in every language', () => {
    for (const language of ['ru', 'es', 'en'] as const) {
      const i18n = createI18n(language)
      expect(i18n.t('about_page.title')).not.toBe('about_page.title')
      expect(i18n.t('about_page.services_title')).not.toBe('about_page.services_title')
    }
  })
})
