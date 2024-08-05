import { WidgetWrapper } from '../../shared/widget-wrapper/widget-wrapper'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import uuid from 'react-uuid'
import { useNavigate } from 'react-router-dom'
import { toursContent } from '../../store/tour-info'
import { ArticleTitle } from '../../shared/title/title'

import titleIcon from '../../assets/icons/summer-vacation.svg'

import './our-tour-2-classes.scss'
import { DIV_IDS } from '../../store/consts'

export const OurTour2 = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const onCardClickHandler = (link: string) => navigate(link)

    return (
        <WidgetWrapper>

            <ArticleTitle title={t('tours.title')} image={titleIcon}/>

            <div className="our-tours-2-wrapper" id={DIV_IDS.toursCards}>

                {toursContent().map(tour => {
                    return (
                        <div 
                            key={uuid()}
                            className='our-tours-2-card'
                            onClick={() => onCardClickHandler(tour.urlPath)}
                        >

                            <motion.div
                                whileHover={{ scale: 1.025 }}
                                className='our-tours-2-card-covered-image'
                                style={{ 
                                    backgroundImage: 'url("' + tour.tourImage.url + '")',
                                }}
                            >
                            </motion.div>
                            
                            <div className='our-tours-2-card-min-price'>
                                <h5>{t('tours.from')} {tour.minPrice}$</h5>
                                <label>{t('tours.per-person')}</label>
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