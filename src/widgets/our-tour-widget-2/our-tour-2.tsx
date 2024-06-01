import { WidgetWrapper } from '../../shared/widget-wrapper/widget-wrapper'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import uuid from 'react-uuid'
import { useNavigate } from 'react-router-dom'
import { toursContent } from '../../store/tour-info'

import './our-tour-2-classes.scss'
import { ArticleTitle } from '../../shared/title/title'

export const OurTour2 = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const onCardClickHandler = (link: string) => navigate(link)

    return (
        <WidgetWrapper>

            {/* <h2>{t('tours.title')}</h2> */}
            <ArticleTitle title={t('tours.title')} />

            <div className="our-tours-2-wrapper">

                {/* {ourTourData.map(item => { */}
                {toursContent().map(tour => {
                    return (
                        <div 
                            key={uuid()}
                            className='our-tours-2-card'
                            onClick={() => onCardClickHandler(tour.urlPath)}
                        >

                            <motion.div
                                whileHover={{ scale: 1.025 }}>
                                 {tour.tourImage}
                            </motion.div>
                            
                            <div className='our-tours-2-card-min-price'>
                                <h5>I18n!! От {tour.minPrice}$</h5>
                                <label>I18n!!за человека</label>
                            </div>

                            <div className='our-tours-2-card-day-blur-info'>
                                <h5>{t('tours.tour' + tour.id + '.days-nights-text-count')}</h5>
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