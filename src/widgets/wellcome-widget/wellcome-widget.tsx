import { motion } from 'framer-motion'
import { Header } from '../../pages/header/header'
import { LowerInfoPanel } from './wellcome-lower-info'
import { useTranslation } from 'react-i18next'

import './wellcome-classes.scss'
import '../../pages/header/header-classes.scss'

export const WellcomeFrame = () => {
    const {t} = useTranslation()

   
    return (
        <>
        
        <div className='header-bg-wrapper'></div>
        
        <Header />
        
        
        <div className='wellcome-wrapper'>
            {/* <Header /> */}
            
            {/* Готовые туры по Коста-Рике! */}
            <motion.div 
                className='wellcome-info-div'
            ></motion.div>

            
            {/* Картинка солнце */}
            {/* <motion.img 
                src={sun} 
                alt=''
                className='wellcome-page-sun'
                animate={{ rotate: 360, }}
                transition={{ repeat: Infinity, duration: 10 }}
            /> */}


            <LowerInfoPanel firstPhrase={t('wellcome-widget.line1')} secondPhrase={t('wellcome-widget.contact-with-us')} />
        </div>
        
        
        </>

    )
}