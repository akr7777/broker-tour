// import bgImage from '../../assets/images/main_photo_0.jpeg'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ANIMATION_TIME } from '../../store/consts'
// import { ResizeType, useResize } from '../../hooks/use-resize/useResize'
// import sun from '../../assets/images/sun.png'
import { Header } from '../../pages/header/header'

import whatsappImg from '../../assets/icons/whatsapp.svg'

import './wellcome-classes.scss'

export const WellcomeFrame = () => {
    const {t} = useTranslation()
    // const size: ResizeType = useResize()
    // const xMaxSize = size.width
    // console.log('ySize=', ySize);
    
    return (
        <div className='wellcome-wrapper'>
            {/* <img src={bgImage} alt="Коста-Рика" /> */}
            <Header />
            
            <motion.div 
                className='wellcome-info-div'
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: ANIMATION_TIME }}
            >
                <div className='wellcome-info-div-text'>
                    <h3>
                        {/* Готовые туры по Коста-Рике! */}
                        {t('wellcome-widget.line1')}
                    </h3> 
                    <h3>
                        {/* Выбери свой тур. */}
                        {t('wellcome-widget.line2')}
                    </h3>
                </div>
                
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
                        {t('wellcome-widget.tours-to-costa-rica')}
                    </h4>
                </div>
                <div className='wellcome-page-lower-div-second'>
                    <h4>
                        {t('wellcome-widget.contact-with-us')}
                    </h4>
                    <img 
                        src={whatsappImg}
                        alt=""
                    />
                </div>
            </div>
        </div>
    )
}