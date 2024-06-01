import { CONTACTS, DIV_IDS } from '../../store/consts'
import { useTranslation } from 'react-i18next'
import { WidgetWrapper } from '../../shared/widget-wrapper/widget-wrapper'
import { ArticleTitle } from '../../shared/title/title'

import facebookImg from '../../assets/icons/facebook.svg'
import instagramImg from '../../assets/icons/instagram.svg'

import './constact-classes.scss'

export const ContactWidget2 = () => {
    const {t} = useTranslation()

    return (
        <WidgetWrapper>
            <div className='contacts-page-wrapper-2' id={DIV_IDS.contacts}>
               
                <ArticleTitle title={t('contacts.contacts')} />

                <div className='contacts-page-wrapper-2-paragraph'>
                    {t('contacts.questions_and_booking')}
                    <a 
                        href={'https://wa.me/' + CONTACTS.phoneOlga} 
                        className='contacts-page-wrapper-2-whatsapp'
                    >
                        What's app ({CONTACTS.phoneOlga})
                    </a>
                    {t('contacts.or')} 
                    <a
                        href={''}
                        className='contacts-page-wrapper-2-telegram'
                    >
                        TELEGRAM (ссылка на username)
                    </a>

                </div>   

                <div className='contacts-page-wrapper-2-paragraph'>
                    {t('contacts.or_use_phone')}
                    <a href={'tel:' + CONTACTS.phoneOlga} className='contacts-page-wrapper-2-phone'>{CONTACTS.phoneOlga}</a>
                    Olga, 
                    <a href={'tel:' + CONTACTS.phoneDavid} className='contacts-page-wrapper-2-phone'>{CONTACTS.phoneDavid}</a>
                    David
                </div>

                <div className='contacts-page-wrapper-2-paragraph'>
                    {t('contacts.our_address')} 20304 Costa Rica, Alajuela, Grecia, 125 metros al este de la escuela Simon Bolivar 
                </div>
                <div className='contacts-page-wrapper-2-paragraph'>
                    {t('contacts.company_name')} SRL Oldaga Group
                </div>

                <div className='constact-social-networks-div'>
                    <a href={'https://www.facebook.com/Brokertour.ru'}>
                        <img alt='Наш Facebook' src={facebookImg} />
                    </a>
                    <a href={'https://www.instagram.com/costarica_travelideas/'}>
                        <img alt='Наш Instagram' src={instagramImg} />
                    </a>
                </div>
            </div>
        </WidgetWrapper>
    )
}