import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ruTranslation from "./lang-ru.json";
import esTranslation from "./lang-es.json";
import enTranslation from './lang-en.json';
import { LANGUAGES } from "./langs";

// Инициализация:
i18n
    .use(initReactI18next)
    .init({
        resources: {
            ru: { translation: ruTranslation },
            es: { translation: esTranslation },
            en: { translation: enTranslation },
        },
        lng: LANGUAGES.ES, 
        fallbackLng: LANGUAGES.ES,
    });