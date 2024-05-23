// import bgImage from '../../assets/images/main_photo_0.jpeg'
import { motion } from 'framer-motion'

import './wellcome-classes.scss'
import { ANIMATION_TIME } from '../../store/consts'
// import { ResizeType, useResize } from '../../hooks/use-resize/useResize'

import sun from '../../assets/images/sun.png'
import clsx from 'clsx'

export const WellcomeFrame = () => {
    // const size: ResizeType = useResize()
    // const xMaxSize = size.width
    // console.log('ySize=', ySize);
    
    return (
        <div className='wellcome-wrapper'>
            {/* <img src={bgImage} alt="Коста-Рика" /> */}
            <motion.div 
                className='wellcome-info-div'
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: ANIMATION_TIME }}
            >
                <div className='wellcome-info-div-text'>
                    <h3>ПОЗВОЛЬ СЕБЕ КОСТА-РИКУ</h3>
                    <hr/>
                    <strong>
                        Отдых в Коста-Рике - это тренд последних лет. Здесь можно отдохнуть от цивилизации, поразить свое воображение, увидеть невероятные краски природы, погрузиться в местную культуру
                    </strong>
                </div>
                
            </motion.div>

            {/* <motion.div
                className='test-div'
                initial={{ opacity: 1, x: 0, y: 0 }}
                animate={{ opacity: 1, x: xMaxSize, y: -100 }}
                transition={{ duration: 10 }}

            >

            </motion.div> */}

            <motion.img 
                src={sun} 
                alt=''
                className='wellcome-page-sun'
                animate={{ rotate: 360, }}
                transition={{ repeat: Infinity, duration: 10 }}
            />

            <div className={clsx(
                'widget-wrapper-lower-div', 
                'wellcome-page-lower-div-position'
            )} />
        </div>
    )
}