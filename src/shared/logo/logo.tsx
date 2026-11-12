import { useTranslation } from 'react-i18next'
import { localizedPath, LanguagesType } from '../../i18/langs'
import { PATHS } from '../../widgets/nav-menu/nav-paths'
import { motion } from 'framer-motion'
import { ANIMATION_TIME } from '../../store/consts'

// import logoImgWhite from '../../assets/logo/logo_white.svg'
// import logoImgBlack from '../../assets/logo/logo_black.svg'
import logoImgWhite from '../../assets/logo/logo_white.png'
import logoImgBlack from '../../assets/logo/logo_black.png'

import './logo-classes.scss'

type PropsType = { isDark?: boolean }

export const Logo = (props: PropsType) => {
    const { i18n } = useTranslation()
    const language = i18n.language as LanguagesType

    const logoImg = props.isDark ? logoImgBlack : logoImgWhite

    return (
        <div className='logo-wrapper'>
            <a href={localizedPath(PATHS.mainPage, language)} aria-label='Costa Rica Tures'>
                <motion.img
                    className='logo-img'
                    src={logoImg}
                    alt='Costa Rica Tures'
                    initial={{ opacity: 0, x: -200 }}
                    animate={{ opacity: 1, x: 0,  scale: 1 }}
                    transition={{ duration: ANIMATION_TIME }}
                    whileHover={{ scale: 1.08 }}
                />
            </a>
        </div>
    )
}