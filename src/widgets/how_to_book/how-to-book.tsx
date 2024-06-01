import { useTranslation } from 'react-i18next'
import './how-to-book.scss'
import { WidgetWrapper } from '../../shared/widget-wrapper/widget-wrapper'
import { ArticleTitle } from '../../shared/title/title'

export const HowToBookWidget = () => {
    const {t} = useTranslation()

    return (
        <WidgetWrapper>
            <div className='how-to-book-widget-wrapper'>

                {/* <h2>{t('booking.how_to_book')}</h2> */}
                <ArticleTitle title={t('booking.how_to_book')} />

                <div>
                    {t('booking.how_to_book_description_1')}
                </div>

                <div>
                    {t('booking.how_to_book_description_2')}
                </div>

            </div>
        </WidgetWrapper>
    )
}