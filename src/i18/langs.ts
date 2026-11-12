export const LANGUAGES = {
    RU: 'ru',
    ES: 'es',
    EN: 'en',
}

export type LanguagesType = typeof LANGUAGES.EN | typeof LANGUAGES.ES | typeof LANGUAGES.RU

export const LanguageLC = 'language'
const languagePrefix = /^\/(es|en)(?=\/|$)/

export const stripLanguagePrefix = (path: string): string => {
    const withoutPrefix = path.replace(languagePrefix, '')
    return withoutPrefix === '' ? '/' : withoutPrefix
}

export const localizedPath = (path: string, language: LanguagesType): string => {
    const basePath = stripLanguagePrefix(path.startsWith('/') ? path : `/${path}`)

    if (language === LANGUAGES.RU) return basePath
    if (basePath === '/') return `/${language}/`

    return `/${language}${basePath}`
}

export const getRootRedirectLanguage = (storedLanguage: string | null): LanguagesType | null => {
    if (storedLanguage === LANGUAGES.ES || storedLanguage === LANGUAGES.EN) {
        return storedLanguage
    }
    return null
}
