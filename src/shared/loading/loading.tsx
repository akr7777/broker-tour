import { useTranslation } from 'react-i18next'

import loadingImg from '../../assets/logo/loading_logo.svg'

import './loading-classes.scss'
import { motion } from 'framer-motion'

export const Loading = () => {
    const {t} = useTranslation()
    
    return (
        <div className='loading-classes-outlet'>
            
        <div className='loading-classes-wrapper'>
            <motion.img 
                alt='' 
                src={loadingImg} 
                className='loading-classes-image'

                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            
            />

            <h2>
                {t('loading')}
            </h2>
        </div>

        </div>
    )
}