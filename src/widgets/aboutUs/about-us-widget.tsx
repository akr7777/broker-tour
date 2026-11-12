import { useTranslation } from 'react-i18next'
import { WidgetWrapper } from '../../shared/widget-wrapper/widget-wrapper'
import { ArticleTitle } from '../../shared/title/title'
import { DIV_IDS } from '../../store/consts'
import { PATHS } from '../nav-menu/nav-paths'
import { localizedPath, LanguagesType } from '../../i18/langs'

import './about-us-widget.scss'

export const AboutUsWidget = () => {
    const {t, i18n} = useTranslation()
    const language = i18n.language as LanguagesType

    return (
        <WidgetWrapper>
            <section className='about-us-widget-wrapper' id={DIV_IDS.aboutUs}>

                {/* <h2>{t('about_us.about_us')}</h2> */}
                <ArticleTitle title={t('about_us.about_us')} />

                <div>
                    {t('about_us.about_us_1')}
                </div>

                <div>
                    {t('about_us.about_us_2')}
                </div>

                <div>
                    {t('about_us.about_us_3')}
                </div>

                <a href={localizedPath(PATHS.aboutPage, language)}>{t('about_us.more')}</a>

            </section>
        </WidgetWrapper>
    )
}