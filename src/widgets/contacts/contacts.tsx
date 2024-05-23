import './constact-classes.scss'
import authorPhoto from '../../assets/images/contact-photo.jpeg'
import facebookImg from '../../assets/icons/facebook.svg'
import instagramImg from '../../assets/icons/instagram.svg'
// import { WidgetWrapper } from '../../shared/widget-wrapper/widget-wrapper'
import { DIV_ID_CONTACTS } from '../../store/consts'
import { useTranslation } from "react-i18next";

export const ContactsWidget = () => {
    const { t } = useTranslation();
    
    return (
        // <WidgetWrapper>
        <div className='contacts-page-wrapper' id={DIV_ID_CONTACTS}>
            <h2>{ t('contact_us') }</h2>
            <div>
                <img 
                    alt={'Фото контакта'}
                    src={authorPhoto} 
                    className={'contacts-author-photo-class'}
                />
                <h4>Ольга</h4>
                <h5>Руководитель проекта</h5>
            </div>
            <div>
                <div>
                    {/* <strong> */}
                        Мы всегда на связи ответим по What's app или Telegram:
                    {/* </strong> */}
                </div>
                <div>
                    <a href='https://wa.me/+79191079851'>
                        +79191079851 Ольга
                    </a>
                </div>
                <div>
                    <a href='https://wa.me/+79167882882'>
                        +79167882882 Арина
                    </a>
                </div>
                <div>
                    <a href='https://wa.me/+50689122090'>
                        +50689122090 Давид
                    </a>
                </div>
                <div>
                    <a href='mailto:info@brokertour.ru'>
                        Email: info@brokertour.ru
                    </a>
                </div>
                <div>
                    {/* <strong> */}
                        Говорим по-русски, по-английски и по-испански
                    {/* </strong> */}
                </div>
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
        // </WidgetWrapper>
    )
}
