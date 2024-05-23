import { useNavigate } from 'react-router-dom'
import { PATHS } from '../../widgets/nav-menu/nav-paths'
import { motion } from 'framer-motion'

import './logo-classes.scss'
import { ANIMATION_TIME } from '../../store/consts'

export const Logo = () => {
    const navigate = useNavigate()

    const onLogoClick = () => navigate(PATHS.mainPage)

    return (
        <motion.div 
            className='logo-class' 
            onClick={onLogoClick}
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0,  scale: 1 }}
            transition={{ duration: ANIMATION_TIME }}
            whileHover={{ scale: 1.08 }}
        >
            <h1>BrokerTour</h1>
        </motion.div>
    )
}