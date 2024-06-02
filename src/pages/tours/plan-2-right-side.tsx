import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { DaysPlanType } from './tour-plan-2'
import { TOUR_DAYS_PLAN_ANIMATION } from '../../store/consts'

import './tours-classes.scss'

type PropsType = { elem: DaysPlanType }

export const TourDayPlanRightSide = ({elem}: PropsType) => {

    const refRight = useRef(null)
    const isInViewRight = useInView(refRight)
    const styleRight = {
        // transform: isInViewRight ? "none" : "translateX(200px)",
        transform: isInViewRight ? "none" : "opacity(1)",
        opacity: isInViewRight ? 1 : 0,
        // transition: "all " + TOUR_DAYS_PLAN_ANIMATION.time + "s cubic-bezier(0.17, 0.55, 0.55, 1) " + TOUR_DAYS_PLAN_ANIMATION.delay + "s"
        transition: "opacity " + TOUR_DAYS_PLAN_ANIMATION.time + "s linear " + TOUR_DAYS_PLAN_ANIMATION.delay + "s"
    }

    return (
        <motion.div 
            className='tour-page-plan2-image-pre-gallery'
            style={styleRight}
            ref={refRight}
        >
            {elem.photos &&
                <div className="tour-page-plan2-image-gallery">
                    {elem.photos.map(photo => photo)}
                </div>
            }
        </motion.div>
    )
}