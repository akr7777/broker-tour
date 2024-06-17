
import { motion } from 'framer-motion'
import animatedImage from '../../assets/animation/borboletas-butterfly.gif'
import { useResize } from '../../hooks/use-resize/useResize'
import uuid from 'react-uuid'

import './butterfly-animations.scss'

type ButterflyAnimationType = {
    id: number,
    initialX: number,
    initialY: number,
    exitX: number,
    exitY: number,
    duration: number,
    delay: number

}
export const ButterflyAnimation = () => {
    const windowSize = useResize()

    const animation: Array<ButterflyAnimationType> = [
        {
            id: 1,
            initialX: Math.round(0.1 * windowSize.width) - 40,
            exitX: windowSize.width,
            initialY: windowSize.height,
            exitY: 200,
            duration: 12,
            delay: 1,
        },
        {
            id: 2,
            initialX: -40,
            exitX: windowSize.width,
            initialY: Math.round(0.5 * windowSize.height),
            exitY: Math.round(0.7 * windowSize.height),
            duration: 10,
            delay: 2,
        },
        {
            // initialX: Math.round(windowSize.width / 2),
            id: 3,
            initialX: -40,
            exitX: windowSize.width,
            initialY: Math.round(windowSize.height / 3),
            exitY: Math.round(windowSize.height),
            duration: 15,
            delay: 3,
        },
        {
            id: 4,
            initialX: 0,
            exitX: Math.round(0.8 * windowSize.width),
            initialY: Math.round(windowSize.height),
            exitY: -40,
            duration: 18,
            delay: 0,
        },
        {
            id: 5,
            initialX: -40,
            exitX: Math.round(0.4 * windowSize.width),
            initialY: Math.round(0.3 * windowSize.height),
            exitY: -40,
            duration: 7,
            delay: 2,
        },
    ]
    
    return (
        <div className='butterfly-animation-wrapper'>

            {animation.map(item => {
                
                return (
                    <motion.img
                        key={uuid()}
                        alt=""
                        src={animatedImage}
                        initial={{ x: item.initialX, y: item.initialY }}
                        animate={{ x: item.exitX, y: item.exitY, rotate: 360 }}
                        transition={{ duration: item.duration, repeat: Infinity, delay: item.delay }}
                        exit={{ x: 0 }}
                    /> 
                )

            })}

        </div>
    )
}