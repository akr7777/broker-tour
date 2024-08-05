import { useTranslation } from 'react-i18next'
import { ContactForm } from '../contact-form/contact-form'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { setIsBookTourShow } from '../../store/appSlice'
import clsx from 'clsx'

import './button-classes.scss'

type PropsType = {
    tour: string
}
export const ButtonContact = (props: PropsType) => {
    const { t } = useTranslation()

    const dispatch = useAppDispatch()
    const isBookFormShow: boolean = useAppSelector(state => state.app.isBookTourShow)
    const showBookTour = () => dispatch(setIsBookTourShow(true))
    
    return (
        <div className='center-button-div'>
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