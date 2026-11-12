import { motion } from 'framer-motion'
import { Header } from '../../pages/header/header'
import { LowerInfoPanel } from './wellcome-lower-info'

import './wellcome-classes.scss'
import '../../pages/header/header-classes.scss'

export const WellcomeFrame = () => {
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