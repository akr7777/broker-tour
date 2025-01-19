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
                
                {/* Готовые туры по Коста-Рике! */}
                <motion.div 
                    className='wellcome-info-div'
                ></motion.div>

                <LowerInfoPanel />
        </div>
        
        
        </>

    )
}