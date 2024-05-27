import { useTranslation } from 'react-i18next'
import './how-to-book.scss'

export const HowToBookWidget = () => {
    const {t} = useTranslation()

    return (
        <div className='how-to-book-widget-wrapper'>

            <h2>{t('booking.how_to_book')}</h2>

            <div>
                {t('booking.how_to_book_description_1')}
            </div>

            <div>
                {t('booking.how_to_book_description_2')}
            </div>

        </div>
    )
}