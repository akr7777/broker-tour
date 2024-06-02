import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { DaysPlanType } from './tour-plan-2'
import uuid from 'react-uuid'
import { useTranslation } from 'react-i18next'
import { TOUR_DAYS_PLAN_ANIMATION } from '../../store/consts'

import './tours-classes.scss'

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
            className='tour-page-plan2-day-desription-div'
        >
            
            <div className="tour-page-plan2-day-number-div">
                {t('stepper.day')} {elem.day}
            </div>

            {elem.description.map((d:string, index: number) => {
                return (
                    <div key={uuid()} className='big-photo-class'>
                        <div>{d}</div>
                        {elem.photos && index < elem.photos.length && elem.photos[index]}
                    </div>
                )
            })}
            
        </motion.div>
    )
}