import { WidgetWrapper } from '../../shared/widget-wrapper/widget-wrapper'

import tourImg1 from '../../assets/images/main_photo_0.jpeg'

import './our-tour-2-classes.scss'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import uuid from 'react-uuid'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '../nav-menu/nav-paths'

export const OurTour2 = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()

    const ourTourData = [
        {
            title: t('tours.tour1.title'), 
            description: t('tours.tour1.description'),
            minPrice: t('tours.tour1.min-price'),
            link: PATHS.tour1,
        },
        {
            title: t('tours.tour2.title'), 
            description: t('tours.tour2.description'),
            minPrice: t('tours.tour2.min-price'),
            link: PATHS.tour2,
        },
        {
            title: t('tours.tour3.title'), 
            description: t('tours.tour3.description'),
            minPrice: t('tours.tour3.min-price'),
            link: '#',
        }
    ]

    const onCardClickHandler = (link: string) => navigate(link)

    return (
        <WidgetWrapper>

            <h2>{t('tours.title')}</h2>

            <div className="our-tours-2-wrapper">

                {ourTourData.map(item => {
                    return (
                        <div 
                            key={uuid()}
                            className='our-tours-2-card'
                            onClick={() => onCardClickHandler(item.link)}
                        >

                            <motion.img 
                                alt="" 
                                src={tourImg1}
                                whileHover={{ scale: 1.025 }} 
                            />
                            
                            <div className='our-tours-2-card-min-price'>
                                <h5>От {item.minPrice}</h5>
                                <label>за человека</label>
                            </div>

                            <div className='our-tours-2-card-title'>
                                <h4>{item.title}</h4>
                            </div>

                            <div className='our-tours-2-card-description'>
                                {item.description}
                            </div>

                        </div>
                    )
                })}
            </div>
        </WidgetWrapper>
    )
}