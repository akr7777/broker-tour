import { useTranslation } from 'react-i18next'

import './about-us-widget.scss'
import { WidgetWrapper } from '../../shared/widget-wrapper/widget-wrapper'
import { ArticleTitle } from '../../shared/title/title'

export const AboutUsWidget = () => {
    const {t} = useTranslation()

    return (
        <WidgetWrapper>
            <div className='about-us-widget-wrapper'>

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

            </div>
        </WidgetWrapper>
    )
}