import { ReactNode } from 'react'
import { WhatsappContactElement } from '../../components/whatsapp-contact/whatsapp-contact-element'
import { CONTACTS, DIV_IDS, LINE_DEVIDER } from '../../store/consts'
import { useResize } from '../../hooks/use-resize/useResize'
import uuid from 'react-uuid'

import './wellcome-classes.scss'
import { useTranslation } from 'react-i18next'

export const LowerInfoPanel = () => {
    const {t} = useTranslation()
    const windowSize = useResize()

    const firstPhrase: string = t('wellcome-widget.line1')
    const secondPhrase: string = t('wellcome-widget.contact-with-us')

    // const lowerDivFirstTextRaw: string = i18next.t('wellcome-widget.line1')
    const lowerDivFirstText: ReactNode = windowSize.width >= 690
        ? <h4>{firstPhrase}</h4>
        : <>{firstPhrase.split(LINE_DEVIDER).map(line => <h4 key={uuid()}>{line}</h4>)}</>

    // const lowerDivSecondTextRaw: string = i18next.t('wellcome-widget.contact-with-us')
    const lowerDivSecondText: ReactNode = windowSize.width >= 690
        ? <h4>{secondPhrase}</h4>
        : <>{secondPhrase.split(LINE_DEVIDER).map(line => <h4 key={uuid()}>{line}</h4>)}</>

    const onReadeMadeToursClick = () => {
            const elem = document.getElementById(DIV_IDS.toursCards)
            
            if (elem) {
                elem.scrollIntoView({ behavior: 'smooth'})
            }
    }

    return (
        <>
            <div className='wellcome-page-lower-div'>
                <div 
                    className='wellcome-page-lower-div-first'
                    onClick={onReadeMadeToursClick}
                    id={DIV_IDS.wellcomePageLowerText}
                >
                    {lowerDivFirstText}
                </div>
                <div className='wellcome-page-lower-div-second'>
                    <a href={'https://wa.me/' + CONTACTS.phoneOlga}>
                        {lowerDivSecondText}
                    </a>
                    <WhatsappContactElement />
                </div>
            </div>

            <div className='wellcome-page-lower-div-bg-color' />
        </>
    )
}