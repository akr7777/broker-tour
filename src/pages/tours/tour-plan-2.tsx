import uuid from 'react-uuid'
import { ReactNode } from 'react'
import { TourDayPlanLeftSide } from './plan-2-left-side'
// import { TourDayPlanRightSide } from './plan-2-right-side'

import './tours-classes.scss'

export type DaysPlanType = {
    day: number,
    description: Array<string>,
    photos: Array<ReactNode> | undefined
}
type PropsType = {
    data: Array<DaysPlanType>
}
export const DaysPlan2 = (props: PropsType) => {
    return (
        <div className="tour-page-plan2">
            {props.data.map(elem => {
                return (
                    <div key={uuid()} className='tour-page-plan2-one-day-div'>

                        {/* {
                            show && 
                                <div className='tour-page-plan2-big-gallery-outlet-div'>
                                    <img alt='' src={''} onClick={() => setShow(false)}/>
                                </div>
                        } */}

                        <TourDayPlanLeftSide elem={elem}/>

                        {/* <TourDayPlanRightSide elem={elem}/> */}
                    </div>
                )
            })}
            </div>
    )
}