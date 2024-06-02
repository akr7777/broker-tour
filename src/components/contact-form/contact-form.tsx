import { useTranslation } from 'react-i18next'
import { ArticleTitle } from '../../shared/title/title'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { setBookTourSendStatusAC, setIsBookTourShow } from '../../store/appSlice'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ButtonOne } from '../buttons/button1'
import { ANIMATION_TIME_SHORT, BookTourSendStatusType, CONTACTS, CONTACT_FORM_SEND_URL, LINE_DEVIDER, bookTourSendStatusEnum } from '../../store/consts'
import { useNavigate } from 'react-router-dom'
import waImage from '../../assets/icons/whatsapp.svg'
import crossImg from '../../assets/icons/cross.png'
import { PATHS } from '../../widgets/nav-menu/nav-paths'
import { 
    PhoneInput, 
    // defaultCountries,
    // parseCountry
} from 'react-international-phone';

import './contact-form.scss'
import 'react-international-phone/style.css';

type PropsType = { tourTitle: string }

export const ContactForm = (props: PropsType) => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [phone, setPhone] = useState<string>('')

    // const countries = defaultCountries.filter((country) => {
    //     const { iso2 } = parseCountry(country);
    //     return ['us', 'ua', 'gb'].includes(iso2);
    //   });
    const preferredCountries = ['ru', 'us', 'cr', 'ca']

    const sendStatus: BookTourSendStatusType = useAppSelector(state => state.app.bookTourSendStatus)

    // const additionalAnimation = {initial={{ opacity: 0 }}
    // animate={{ opacity: 1 }}
    // transition={{ duration: ANIMATION_TIME_SHORT }}}

    const waLink = 'https://api.whatsapp.com/send/?phone=' + CONTACTS.phoneOlga + '&text=' + t('contacts.contact-whatsapp-text', {tour: props.tourTitle})

    const onBtnClickHandler = () => {
        fetch(CONTACT_FORM_SEND_URL, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: props.tourTitle,
                phone: phone,
                content: "Хочу забронировать тур " + props.tourTitle
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 277) {
                    dispatch(setBookTourSendStatusAC(bookTourSendStatusEnum.delivered))
                } else {
                    dispatch(setBookTourSendStatusAC(bookTourSendStatusEnum.error))
                }
            })
            .catch(error => {
                console.error(error)
                dispatch(setBookTourSendStatusAC(bookTourSendStatusEnum.error))
            });
    }
    const closeClickHandler = () => dispatch(setIsBookTourShow(false))
    const onMainPageBtnClick = () => {
        navigate(PATHS.mainPage)
        closeClickHandler()
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth", // Optional if you want to skip the scrolling animation
          });
    }

    return (
        <div className='contact-form-outlet'>
            <div className='contact-form-wrapper'>

                <img alt='' src={crossImg} onClick={closeClickHandler} className='contact-form-cross-img'/>
                
                <ArticleTitle title={t('contact-form.title')}/>

                
                <div>
                    {t('contact-form.description1')}
                    <div className='contact-form-tour-title'>{props.tourTitle}</div>
                </div>



                <div>
                    {t('contact-form.description2')}
                    <a 
                            href={waLink} 
                            className='contact-form-wa-class'
                        >
                            <img alt='' src={waImage}/>
                            What's app ({CONTACTS.phoneOlga})
                        </a>
                </div>

                {sendStatus === bookTourSendStatusEnum.notSent && 
                    <>
                        <div>
                            <div>{t('contact-form.description3')}</div>
                            {/* <LineTextField text={phone} onTextChange={(val: string) => setPhone(val)} /> */}
                            <div className='contact-form-phone-div'>
                            {/* <PhoneInput
                                // country={'us'}
                                value={phone}
                                onChange={phone => setPhone(phone)}
                                inputClass='contact-form-phone-input'
                                containerClass='contact-form-phone-container'
                            /> */}
                            <PhoneInput
                                // country={'us'}
                                value={phone}
                                onChange={phone => setPhone(phone)}
                                className='contact-form-phone-input'
                                // containerClass='contact-form-phone-container'
                                preferredCountries={preferredCountries}
                                defaultCountry='cr'
                            />
                            </div>
                        </div>
                        <ButtonOne text={t('contact-form.send-btn-text')} onClick={onBtnClickHandler} />
                    </>}

                {sendStatus === bookTourSendStatusEnum.delivered && 
                    <>
                        <motion.div 
                            className='contact-form-network-delivered-text-class'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: ANIMATION_TIME_SHORT }}
                        >
                            <div>
                                {t('contact-form.contact-form-network-delivered-text')}
                            </div>
                            <ButtonOne text={t('contact-form.goto_main_page')} onClick={onMainPageBtnClick}/>
                        </motion.div>
                    </>
                }

                {sendStatus === bookTourSendStatusEnum.error &&
                    <>
                        <motion.div 
                            className='contact-form-network-error-text'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: ANIMATION_TIME_SHORT }}
                        >
                            {t('contact-form.network-error-text').split(LINE_DEVIDER)}
                        </motion.div>
                    </>
                }
                
            </div>
        </div>
    )
}