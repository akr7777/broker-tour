import { useTranslation } from 'react-i18next'
import { WidgetWrapper } from '../../shared/widget-wrapper/widget-wrapper'
import { ArticleTitle } from '../../shared/title/title'
import { DIV_IDS } from '../../store/consts'

import './how-to-book.scss'

export const HowToBookWidget = () => {
    const {t} = useTranslation()

    const onLickClick = (divId: string) => {
        
        const elem = document.getElementById(divId)
        
        if (elem) {
            elem.scrollIntoView({ behavior: 'smooth'})
        }
    }

    return (
        <WidgetWrapper>
            <div className='how-to-book-widget-wrapper' id={DIV_IDS.howToBook}>

                {/* <h2>{t('booking.how_to_book')}</h2> */}
                <ArticleTitle title={t('booking.how_to_book')} />

                <div>
                    {t('booking.how_to_book_description_1')}
                    <label className='how-to-book-widget-link-class'
                        onClick={() => onLickClick(DIV_IDS.tourCalculation)}>
                        {t('booking.here')}
                    </label>
                </div>

                <div>
                    {t('booking.how_to_book_description_2')}

                    <label className='how-to-book-widget-link-class'
                        onClick={() => onLickClick(DIV_IDS.contacts)}>
                        {t('booking.here')}
                    </label>
                </div>

            </div>
        </WidgetWrapper>
    )
}