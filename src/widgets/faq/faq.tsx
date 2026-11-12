import { useTranslation } from 'react-i18next'
import { WidgetWrapper } from '../../shared/widget-wrapper/widget-wrapper'
import { DIV_IDS, LINE_DEVIDER, faq_Data } from '../../store/consts'
import { ArticleTitle } from '../../shared/title/title'

import './faq.scss'

export const FAQ = () => {
    const { t, i18n } = useTranslation()
    const faqItems = faq_Data(i18n)

    return (
        <WidgetWrapper>
            <article id={DIV_IDS.faq}>
                <ArticleTitle title={t('faq.title')} />

                <div className="faq-native-list">
                    {faqItems.map((item, index) => (
                        <details className="faq-native-item" key={index}>
                            <summary className="faq-native-question">
                                <span className="faq-native-circle" />
                                <h4>{item.question}</h4>
                            </summary>
                            <div className="faq-native-answer">
                                {item.answer.split(LINE_DEVIDER).map((line, lineIndex) => (
                                    <p key={lineIndex}>{line}</p>
                                ))}
                            </div>
                        </details>
                    ))}
                </div>
            </article>
        </WidgetWrapper>
    )
}
