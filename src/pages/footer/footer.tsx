// import { WidgetWrapper } from '../../shared/widget-wrapper/widget-wrapper'
import { useTranslation } from 'react-i18next'
import { PATHS } from '../../widgets/nav-menu/nav-paths'
import { localizedPath, LanguagesType } from '../../i18/langs'
import './footer-styles.scss'

export const Footer = () => {
    const { t, i18n } = useTranslation()
    const language = i18n.language as LanguagesType
    const today:Date = new Date()
    const currentYear: number = today.getFullYear()

    return (
        // <WidgetWrapper>
        <footer className='footer-wrapper'>
            <div>
                @All right reserved, SRL Oldaga Group, {currentYear}
            </div>
            <div>
                <a href={localizedPath(PATHS.aboutPage, language)}>{t('nav.about_us')}</a>
            </div>
        </footer>
        // </WidgetWrapper>
    )
}