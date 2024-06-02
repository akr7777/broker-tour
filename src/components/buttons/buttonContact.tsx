import { useTranslation } from 'react-i18next'
// import { CONTACTS } from '../../store/consts'
import './button-classes.scss'
// import { useState } from 'react'
import { ContactForm } from '../contact-form/contact-form'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { setIsBookTourShow } from '../../store/appSlice'
import clsx from 'clsx'
// import { useNavigate } from 'react-router-dom'

type PropsType = {
    tour: string
}
export const ButtonContact = (props: PropsType) => {
    const { t } = useTranslation()

    // const navigate = useNavigate()
    // const msgText: string = t('contacts.contact-whatsapp-text', {tour: props.tour})
    // const linkHref: string = 'whatsapp://send?phone=' + CONTACTS.phoneOlga + '&text=' + msgText

    // const onBtnClickHandler = () => {}
    // const [show, setShow] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const isBookFormShow: boolean = useAppSelector(state => state.app.isBookTourShow)
    const showBookTour = () => dispatch(setIsBookTourShow(true))
    
    return (
        <div>
            {/* <a href={linkHref}>
                <button
                    className='button-one-class'
                    // onClick={() => navigate('https://www.ya.ru')}
                >
                    {t('contacts.contact-button-text')}
                </button>
            </a> */}

            <button
                className={clsx('button-one-class', 'contact-btn-additional-class')}
                onClick={showBookTour}
            >
                {t('contacts.contact-button-text')}
            </button>

            {isBookFormShow && <ContactForm tourTitle={props.tour}/>}
        </div>
    )
}