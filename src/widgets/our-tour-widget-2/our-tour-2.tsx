import { WidgetWrapper } from '../../shared/widget-wrapper/widget-wrapper'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import uuid from 'react-uuid'
import { toursContent } from '../../store/tour-info'
import { ArticleTitle } from '../../shared/title/title'
import { DIV_IDS } from '../../store/consts'
import { localizedPath, LanguagesType } from '../../i18/langs'

import titleIcon from '../../assets/icons/summer-vacation.svg'

import './our-tour-2-classes.scss'

export const OurTour2 = () => {
    const {t, i18n} = useTranslation()
    const language = i18n.language as LanguagesType

    return (
        <WidgetWrapper>

            <ArticleTitle title={t('tours.title')} image={titleIcon}/>

            <div className="our-tours-2-wrapper" id={DIV_IDS.toursCards}>

                {toursContent(i18n).map(tour => {
                    return (
                        <a
                            key={uuid()}
                            className='our-tours-2-card'
                            href={localizedPath(tour.urlPath, language)}
                            aria-label={tour.title}
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

                        </a>
                    )
                })}
            </div>
        </WidgetWrapper>
    )
}