import { useTranslation } from 'react-i18next'
import { CONTACTS } from '../../store/consts'
import './button-classes.scss'
// import { useNavigate } from 'react-router-dom'

type PropsType = {
    tour: string
}
export const ButtonContact = (props: PropsType) => {
    const { t } = useTranslation()
    // const navigate = useNavigate()
    const msgText: string = t('contacts.contact-whatsapp-text', {tour: props.tour})

    const linkHref: string = 'whatsapp://send?phone=' + CONTACTS.phoneOlga + '&text=' + msgText

    return (
        <a href={linkHref}>
            <button
                className='button-one-class'
                // onClick={() => navigate('https://www.ya.ru')}
            >
                {t('contacts.contact-button-text')}
            </button>
        </a>
    )
}