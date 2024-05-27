import { WidgetWrapper } from '../../shared/widget-wrapper/widget-wrapper'

import tourImg1 from '../../assets/images/main_photo_0.jpeg'

import './our-tour-2-classes.scss'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import uuid from 'react-uuid'
import { useNavigate } from 'react-router-dom'
import { toursContent } from '../../store/tour-info'


export const OurTour2 = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()

    // const ourTourData = [
    //     {
    //         title: t('tours.tour1.title'), 
    //         description: t('tours.tour1.description'),
    //         minPrice: t('tours.tour1.min-price'),
    //         link: PATHS.tour1,
    //     },
    //     {
    //         title: t('tours.tour2.title'), 
    //         description: t('tours.tour2.description'),
    //         minPrice: t('tours.tour2.min-price'),
    //         link: PATHS.tour2,
    //     },
    //     {
    //         title: t('tours.tour3.title'), 
    //         description: t('tours.tour3.description'),
    //         minPrice: t('tours.tour3.min-price'),
    //         link: '#',
    //     }
    // ]

    // const ourTourData = toursContent().map(t => {

    // })

    const onCardClickHandler = (link: string) => navigate(link)

    return (
        <WidgetWrapper>

            <h2>{t('tours.title')}</h2>

            <div className="our-tours-2-wrapper">

                {/* {ourTourData.map(item => { */}
                {toursContent().map(tour => {
                    return (
                        <div 
                            key={uuid()}
                            className='our-tours-2-card'
                            onClick={() => onCardClickHandler(tour.urlPath)}
                        >

                            <motion.img 
                                alt="" 
                                src={tourImg1}
                                whileHover={{ scale: 1.025 }} 
                            />
                            
                            <div className='our-tours-2-card-min-price'>
                                <h5>От {tour.minPrice}$</h5>
                                <label>за человека</label>
                            </div>

                            <div className='our-tours-2-card-day-blur-info'>
                                <h5>5/4 noches</h5>
                            </div>

                            <div className='our-tours-2-card-title'>
                                <h4>{tour.title}</h4>
                            </div>

                            <div className='our-tours-2-card-description'>
                                {tour.description}
                            </div>

                        </div>
                    )
                })}
            </div>
        </WidgetWrapper>
    )
}