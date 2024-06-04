import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Header } from '../../pages/header/header'
import { CONTACTS, HOVER_VALUE } from '../../store/consts'

import whatsappImg from '../../assets/icons/whatsapp.svg'

import './wellcome-classes.scss'

export const WellcomeFrame = () => {
    const {t} = useTranslation()
   
    return (
        <div className='wellcome-wrapper'>
            {/* <img src={bgImage} alt="Коста-Рика" /> */}
            <Header />
            
            {/* Готовые туры по Коста-Рике! */}
            <motion.div 
                className='wellcome-info-div'
                // initial={{ opacity: 0, x: -100 }}
                // animate={{ opacity: 1, x: 0 }}
                // transition={{ duration: ANIMATION_TIME }}
            >
                {/* <div className='wellcome-info-div-text'>
                    <h3>
                        {t('wellcome-widget.line1')}
                    </h3> 
                    <h3>
                        {t('wellcome-widget.line2')}
                    </h3>
                </div> */}
                
            </motion.div>

            
            {/* Картинка солнце */}
            {/* <motion.img 
                src={sun} 
                alt=''
                className='wellcome-page-sun'
                animate={{ rotate: 360, }}
                transition={{ repeat: Infinity, duration: 10 }}
            /> */}

            <div className='wellcome-page-lower-div'>
                <div className='wellcome-page-lower-div-first'>
                    <h4>
                        {/* {t('wellcome-widget.tours-to-costa-rica')} */}
                        {t('wellcome-widget.line1')}
                    </h4>
                </div>
                <div className='wellcome-page-lower-div-second'>
                    <a href={'https://wa.me/' + CONTACTS.phoneOlga}>
                        <motion.h4 
                            whileHover={{ scale: 1.075 }}
                        >
                                {t('wellcome-widget.contact-with-us')}
                        </motion.h4>
                    </a>
                    <a href={'https://wa.me/' + CONTACTS.phoneOlga}>
                        <motion.img 
                            // onClick={onWhatsAppClickHandler}
                            whileHover={{ scale: HOVER_VALUE, rotate: 360 }}
                            src={whatsappImg}
                            alt=""
                        />
                    </a>
                </div>
            </div>
        </div>
    )
}