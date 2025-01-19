import { useTranslation } from "react-i18next";
import { LANGUAGES, LanguageLC, LanguagesType } from "../../i18/langs";
import { AnimatePresence, motion } from "framer-motion"

import flagEs from '../../assets/icons/langs/flag-es.png'
import flagRu from '../../assets/icons/langs/flag-ru.png'
import flagUs from '../../assets/icons/langs/flag-us.png'

import { 
    // useEffect, 
    useState 
} from "react";

import './lang-changer-classes.scss'
import { ANIMATION_TIME, ANIMATION_TIME_SHORT, HOVER_VALUE } from "../../store/consts";

// type LangArrType = {
//     lang: LanguagesType,
//     image: string,
// }

export const LanguageChanger = () => {
    const { i18n } = useTranslation();
    const [isShow, setIsShow] = useState<boolean>(false)
    const currentLanguageLC: LanguagesType | null = localStorage.getItem(LanguageLC)

    if (currentLanguageLC && i18n.language !== currentLanguageLC) {
        i18n.changeLanguage(currentLanguageLC)
    }

    // const flags: Array<string> = []
    // const [langs, setLangs] = useState<LangArrType[]>([
    //     {lang: LANGUAGES.RU, image: flagRu},
    //     {lang: LANGUAGES.ES, image: flagEs},
    //     {lang: LANGUAGES.EN, image: flagUs},
    // ])

    const onOpenClickHandler = () => setIsShow(true)

    const changeLanguageTo = (newLang: LanguagesType) => {
        localStorage.setItem(LanguageLC, newLang)
        i18n.changeLanguage(newLang)
        setIsShow(false)
    }

    // useEffect(() => {
    //     while (langs[0].lang !== i18n.language) {
    //         const arr: Array<LangArrType> = [...langs]
    //         const first: LangArrType = arr.shift() || {lang: LANGUAGES.RU, image: flagRu}
    //         const newArr = [...arr, first]
    //         setLangs(newArr)
    //     }
    // }, [i18n.language])

    return (
        <motion.div className="lang-icon-class-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: ANIMATION_TIME }}
        >

            {/* <img alt="" src={flagRu} onClick={onOpenClickHandler} /> */}

            {i18n.language === LANGUAGES.ES && !isShow &&
                <motion.img 
                    alt="" src={flagEs} onClick={onOpenClickHandler} 
                    whileHover={{ scale: HOVER_VALUE, rotate: 360 }}
                />}
            
            {i18n.language === LANGUAGES.EN && !isShow &&
                <motion.img 
                    alt="" src={flagUs} onClick={onOpenClickHandler} 
                    whileHover={{ scale: HOVER_VALUE, rotate: 360 }}
                />}
            
            {i18n.language === LANGUAGES.RU && !isShow &&
                <motion.img 
                    alt="" src={flagRu} onClick={onOpenClickHandler} 
                    whileHover={{ scale: HOVER_VALUE, rotate: 360 }}
                />}

            <AnimatePresence mode="wait" initial={false}>
                {isShow && (
                    <motion.div 
                        className="lang-panel-div"
                        initial={{ opacity: 0, y: -150}}
                        animate={{ opacity: 1, y: 0}}
                        transition={{ duration: ANIMATION_TIME_SHORT }}
                        exit={{opacity: 0}}
                    >
                        <motion.img 
                            alt="" 
                            src={flagEs} 
                            onClick={() => changeLanguageTo(LANGUAGES.ES)} 
                            whileHover={{ scale: HOVER_VALUE }}
                        />
                        <motion.img 
                            alt="" src={flagRu} onClick={() => changeLanguageTo(LANGUAGES.RU)} 
                            whileHover={{ scale: HOVER_VALUE }}
                        />
                        <motion.img 
                            alt="" src={flagUs} onClick={() => changeLanguageTo(LANGUAGES.EN)} 
                            whileHover={{ scale: HOVER_VALUE }}
                        />
                    </motion.div>
                    // <div className="lang-panel-div">
                    //     <img alt="" src={flagEs} onClick={() => changeLanguageTo(LANGUAGES.ES)} />
                    //     <img alt="" src={flagRu} onClick={() => changeLanguageTo(LANGUAGES.RU)} />
                    //     <img alt="" src={flagUs} onClick={() => changeLanguageTo(LANGUAGES.EN)} />

                    //     {/* {langs.map(l => {
                    //         return <img alt="" src={l.image} onClick={() => changeLanguageTo(l.lang)} />
                    //     })} */}
                    // </div>
                
                )}
            </AnimatePresence>

        </motion.div>
    )
}