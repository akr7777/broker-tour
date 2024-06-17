import { useTranslation } from 'react-i18next'
import { WidgetWrapper } from '../../shared/widget-wrapper/widget-wrapper'
import uuid from 'react-uuid'
import { AccordeonDataType, MyAccordeon } from '../../components/my-accordeon/my-accordeon'
import { DIV_IDS, LINE_DEVIDER, faq_Data } from '../../store/consts'
import { ArticleTitle } from '../../shared/title/title'

export const FAQ = () => {
    const {t} = useTranslation()

    const accordeonData: Array<AccordeonDataType> = faq_Data().map(el => {
        const res: AccordeonDataType = {
            id: uuid(),
            title: el.question,
            context: el.answer.split(LINE_DEVIDER)
        }
        return res
    })

    return (
        <WidgetWrapper>

            <div id={DIV_IDS.faq} />

            {/* <h2>{t('faq.title')}</h2> */}
            <ArticleTitle title={t('faq.title')} />

            <MyAccordeon data={accordeonData} />
            
        </WidgetWrapper>
    )
}