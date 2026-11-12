import { describe, expect, it } from 'vitest'
import { LANGUAGES, getRootRedirectLanguage, localizedPath, stripLanguagePrefix } from './langs'

describe('language paths', () => {
  it('keeps Russian paths unprefixed', () => {
    expect(localizedPath('/', LANGUAGES.RU)).toBe('/')
    expect(localizedPath('/about/', LANGUAGES.RU)).toBe('/about/')
  })

  it('builds Spanish and English paths', () => {
    expect(localizedPath('/', LANGUAGES.ES)).toBe('/es/')
    expect(localizedPath('/about/', LANGUAGES.EN)).toBe('/en/about/')
    expect(localizedPath('/tour-info/1/', LANGUAGES.ES)).toBe('/es/tour-info/1/')
  })

  it('strips an existing language prefix', () => {
    expect(stripLanguagePrefix('/es/')).toBe('/')
    expect(stripLanguagePrefix('/en/about/')).toBe('/about/')
    expect(stripLanguagePrefix('/es/tour-info/1/')).toBe('/tour-info/1/')
    expect(stripLanguagePrefix('/')).toBe('/')
  })

  it('redirects only for explicitly stored Spanish or English', () => {
    expect(getRootRedirectLanguage('es')).toBe('es')
    expect(getRootRedirectLanguage('en')).toBe('en')
    expect(getRootRedirectLanguage('ru')).toBeNull()
    expect(getRootRedirectLanguage(null)).toBeNull()
  })

  it('switches language without duplicating the prefix', () => {
    expect(localizedPath('/es/about/', LANGUAGES.EN)).toBe('/en/about/')
    expect(localizedPath('/en/tour-info/1/', LANGUAGES.RU)).toBe('/tour-info/1/')
  })
})
