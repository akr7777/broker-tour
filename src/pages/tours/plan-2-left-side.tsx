import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { DaysPlanType } from './tour-plan-2'
import uuid from 'react-uuid'
import { useTranslation } from 'react-i18next'

import './tours-classes.scss'
import { TOUR_DAYS_PLAN_ANIMATION } from '../../store/consts'

type PropsType = { elem: DaysPlanType }

export const TourDayPlanLeftSide = ({elem}: PropsType) => {
    const {t} = useTranslation()

    const refLeft = useRef(null)
    const isInViewLeft = useInView(refLeft)
    const styleLeft = {
        transform: isInViewLeft ? "none" : "translateX(-200px)",
        opacity: isInViewLeft ? 1 : 0,
        transition: "all " + TOUR_DAYS_PLAN_ANIMATION.time + "s cubic-bezier(0.17, 0.55, 0.55, 1) " + TOUR_DAYS_PLAN_ANIMATION.delay + "s"
    }

    return (
        <motion.div
            ref={refLeft}
            style={styleLeft}
        >
            
            <div className="tour-page-plan2-day-number-div">
                {t('stepper.day')} {elem.day}
            </div>

            {elem.description.map(d => {
                return (
                    <div key={uuid()}>
                        {d}
                    </div>
                )
            })}
            
        </motion.div>
    )
}