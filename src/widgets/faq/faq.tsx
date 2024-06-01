import { useTranslation } from 'react-i18next'
import { WidgetWrapper } from '../../shared/widget-wrapper/widget-wrapper'
import uuid from 'react-uuid'
import { AccordeonDataType, MyAccordeon } from '../../components/my-accordeon/my-accordeon'
import { LINE_DEVIDER } from '../../store/consts'
import { ArticleTitle } from '../../shared/title/title'

export type FAQ_Type = {
    question: string, answer: string
}

const questionsCount = 12

export const FAQ = () => {
    const {t} = useTranslation()
    const faqData: Array<FAQ_Type> = []

    for (let i=1; i<=questionsCount; i++) {
        faqData.push({
            question: t('faq.' + i + '.question'),
            answer: t('faq.' + i + '.answer')
        })
    }

    const accordeonData: Array<AccordeonDataType> = faqData.map(el => {
        const res: AccordeonDataType = {
            id: uuid(),
            title: el.question,
            context: el.answer.split(LINE_DEVIDER)
        }
        return res
    })

    return (
        <WidgetWrapper>

            {/* <h2>{t('faq.title')}</h2> */}
            <ArticleTitle title={t('faq.title')} />

            <MyAccordeon data={accordeonData} />
            
        </WidgetWrapper>
    )
}