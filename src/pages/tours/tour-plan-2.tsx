import uuid from 'react-uuid'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

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
    const {t} = useTranslation()
    // const [show, setShow] = useState<boolean>(false)
    
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

                        <div>
                            
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
                            
                        </div>

                        <div className='tour-page-plan2-image-pre-gallery'>
                            {elem.photos &&
                                <div className="tour-page-plan2-image-gallery">
                                    {elem.photos.map(photo => photo)}
                                </div>
                            }
                        </div>
                    </div>
                )
            })}
            </div>
    )
}