import { useTranslation } from 'react-i18next'

import './about-us-widget.scss'

export const AboutUsWidget = () => {
    const {t} = useTranslation()

    return (
        <div className='about-us-widget-wrapper'>

            <h2>{t('about_us.about_us')}</h2>

            <div>
                {t('about_us.about_us_1')}
            </div>

            <div>
                {t('about_us.about_us_2')}
            </div>

            <div>
                {t('about_us.about_us_3')}
            </div>

        </div>
    )
}