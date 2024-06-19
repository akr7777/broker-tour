import { useTranslation } from 'react-i18next'
import { ArticleTitle } from '../../shared/title/title'
import { WidgetWrapper } from '../../shared/widget-wrapper/widget-wrapper'
import { LINE_DEVIDER, faq_Data } from '../../store/consts'
import uuid from 'react-uuid'

import './separate-faq-page.scss'
import { PriceCalculation2 } from '../../widgets/price-calculation-2/price-calculation-2'

const SeparateFAQpage = () => {
    const {t} = useTranslation()

    return (
        <WidgetWrapper>
            <ArticleTitle title={t('faq.title')} />

            <PriceCalculation2 />

            {faq_Data().map(el => {
                return (
                    <div key={uuid()} className='separate_faq_page_qa'>
                        <div>
                            <h2>{el.question}</h2>
                            {el.answer.split(LINE_DEVIDER).map(p => <div key={uuid()}>{p}</div>)}
                            <div></div>
                        </div>
                    </div>
                )
            })}

            <PriceCalculation2 />

        </WidgetWrapper>
    )
}

export default SeparateFAQpage