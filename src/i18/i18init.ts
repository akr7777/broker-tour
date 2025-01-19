import i18n from "i18next";
// import LanguageDetector from 'i18next-browser-languagedetector';
import ruTranslation from "./lang-ru.json";
import esTranslation from "./lang-es.json";
import enTranslation from './lang-en.json';
import { LANGUAGES } from "./langs";
import { initReactI18next } from "react-i18next";

// Инициализация:
i18n
    // .use(LanguageDetector) // для детекции языка браузера
    .use(initReactI18next)
    .init({
        debug: true,
        supportedLngs: [LANGUAGES.ES, LANGUAGES.EN, LANGUAGES.RU],
        resources: {
            es: { translation: esTranslation },
            ru: { translation: ruTranslation },
            en: { translation: enTranslation },
        },
        lng: LANGUAGES.ES, 
        fallbackLng: LANGUAGES.ES,
    });