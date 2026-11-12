import { createInstance, type i18n as I18n } from 'i18next'
import { initReactI18next } from 'react-i18next'
import ruTranslation from './lang-ru.json'
import esTranslation from './lang-es.json'
import enTranslation from './lang-en.json'
import { LANGUAGES, LanguagesType } from './langs'

export const i18nResources = {
  ru: { translation: ruTranslation },
  es: { translation: esTranslation },
  en: { translation: enTranslation },
}

export const createI18n = (language: LanguagesType): I18n => {
  const instance = createInstance()

  instance.use(initReactI18next).init({
    debug: false,
    lng: language,
    fallbackLng: LANGUAGES.RU,
    supportedLngs: [LANGUAGES.RU, LANGUAGES.ES, LANGUAGES.EN],
    resources: i18nResources,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  })

  return instance
}
