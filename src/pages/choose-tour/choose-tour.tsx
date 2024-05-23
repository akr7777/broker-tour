// import { useState } from 'react'
import { Carousel } from '../../components/carusel/carusel'
import { WidgetWrapper } from '../../shared/widget-wrapper/widget-wrapper'
import './choose-tour-class.scss'
// import { feedbackData } from './feedback-data'


export const ChooseTourPage = () => {
    return (
        <WidgetWrapper>
            <div className='choose-tour-wrapper'>
                <h2>ВЫБЕРИ ПРОГРАММУ ДЛЯ СВОЕЙ ПОЕЗДКИ В КОСТА-РИКУ</h2>

                {/* <Carousel>
                    {feedbackData.map((f) => (
                        <Feedback key={f.id} setOpen={() => setFeedback(f)} {...f} />
                    ))}
                </Carousel> */}
                <Carousel />
            </div>
        </WidgetWrapper>
    )
}