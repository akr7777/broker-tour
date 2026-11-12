import { createI18n } from '../i18/i18-config'
import { LANGUAGES, LanguagesType, localizedPath, stripLanguagePrefix } from '../i18/langs'
import { getStructuredData } from './schema'

export const SITE_URL = 'https://costaricatures.com'

const ensureTrailingSlash = (path: string) => {
  if (path === '/') return '/'
  return `${path.replace(/\/+$/, '')}/`
}

const getPageTitle = (pathname: string, t: (key: string) => string) => {
  if (pathname === '/') return t('main-page.h1')
  if (pathname === '/about/') return t('about_page.title')
  if (pathname === '/faq/') return t('faq.title')

  const tourMatch = pathname.match(/^\/tour-info\/(\d+)\/$/)
  if (tourMatch) {
    const tourTitle = t(`tours.tour${tourMatch[1]}.title`).replace(/\n/g, ' ')
    return `${tourTitle} — Costa Rica Tures`
  }

  return 'Costa Rica Tures'
}

export const getSeoHeadData = (language: LanguagesType, urlPathname: string) => {
  const t = createI18n(language).getFixedT(language)
  const basePath = ensureTrailingSlash(stripLanguagePrefix(urlPathname))
  const canonical = `${SITE_URL}${localizedPath(basePath, language)}`

  return {
    title: getPageTitle(basePath, t),
    description: t('site_description'),
    canonical,
    alternates: {
      ru: `${SITE_URL}${localizedPath(basePath, LANGUAGES.RU)}`,
      es: `${SITE_URL}${localizedPath(basePath, LANGUAGES.ES)}`,
      en: `${SITE_URL}${localizedPath(basePath, LANGUAGES.EN)}`,
      'x-default': `${SITE_URL}${localizedPath(basePath, LANGUAGES.RU)}`,
    },
    structuredData: getStructuredData(language, basePath, t),
  }
}
