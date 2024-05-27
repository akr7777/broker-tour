import uuid from 'react-uuid'
import './tours-classes.scss'
import { VerticalStepperType } from '../../components/vertical-stepper/vertical-stepper'

import testImg from '../../assets/images/main_photo_0.jpeg'
import { useState } from 'react'

type PropsType = {
    tourTwoStepsAuto: Array<VerticalStepperType>
}
export const DaysPlan2 = ({tourTwoStepsAuto}: PropsType) => {
    const [show, setShow] = useState<boolean>(false)

    return (
        <div className="tour-page-plan2">
            {tourTwoStepsAuto.map(elem => {
                return (
                    <div key={uuid()} className='tour-page-plan2-one-day-div'>

                        {
                            show && 
                                <div className='tour-page-plan2-big-gallery-outlet-div'>
                                    <img alt='' src={testImg} onClick={() => setShow(false)}/>
                                </div>
                        }

                        <div className="tour-page-plan2-day-number-div">I18n!!! День {elem.day}</div>

                        <div className="tour-page-plan2-image-gallery">
                            <img alt='' src={testImg} onClick={() => setShow(true)}/>
                            <img alt='' src={testImg} />
                            <img alt='' src={testImg} />
                            <img alt='' src={testImg} />
                        </div>

                        <div>{elem.description.map(d => {
                            return (
                                <div key={uuid()}>
                                    {d}
                                </div>
                            )
                        })}</div>
                    </div>
                )
            })}
            </div>
    )
}