import { useTranslation } from 'react-i18next'
import { useLocation } from '../../vike/router'
import { LANGUAGES, LanguageLC, LanguagesType, localizedPath } from '../../i18/langs'
import { motion } from 'framer-motion'
import { useState } from 'react'

import flagEs from '../../assets/icons/langs/flag-es.png'
import flagRu from '../../assets/icons/langs/flag-ru.png'
import flagUs from '../../assets/icons/langs/flag-us.png'

import './lang-changer-classes.scss'
import { ANIMATION_TIME, HOVER_VALUE } from '../../store/consts'

const languages = [
    { code: LANGUAGES.RU, label: 'Русский', flag: flagRu },
    { code: LANGUAGES.ES, label: 'Español', flag: flagEs },
    { code: LANGUAGES.EN, label: 'English', flag: flagUs },
]

export const LanguageChanger = () => {
    const { i18n } = useTranslation()
    const location = useLocation()
    const [isShow, setIsShow] = useState<boolean>(false)

    const currentLanguage = (i18n.language as LanguagesType) || LANGUAGES.RU
    const current = languages.find((language) => language.code === currentLanguage) ?? languages[0]
    const hash = typeof window === 'undefined' ? '' : window.location.hash

    const onChangeLanguageClick = (language: LanguagesType) => {
        try {
            localStorage.setItem(LanguageLC, language)
        } catch {
            // localStorage may be unavailable in private mode
        }
        setIsShow(false)
    }

    return (
        <motion.div
            className="lang-icon-class-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: ANIMATION_TIME }}
        >
            <button
                type="button"
                className="lang-current"
                onClick={() => setIsShow((value) => !value)}
                aria-label={current.label}
            >
                <motion.img
                    alt={current.label}
                    src={current.flag}
                    whileHover={{ scale: HOVER_VALUE, rotate: 360 }}
                />
            </button>

            <div className={isShow ? 'lang-panel-div lang-panel-div-show' : 'lang-panel-div'}>
                {languages.map((language) => (
                    <a
                        key={language.code}
                        href={localizedPath(location.pathname, language.code) + hash}
                        onClick={() => onChangeLanguageClick(language.code)}
                        aria-label={language.label}
                    >
                        <motion.img
                            alt={language.label}
                            src={language.flag}
                            whileHover={{ scale: HOVER_VALUE }}
                        />
                    </a>
                ))}
            </div>
        </motion.div>
    )
}
