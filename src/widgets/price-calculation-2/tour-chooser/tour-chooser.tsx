import uuid from 'react-uuid'
import { TourType, toursContent } from '../../../store/tour-info'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ANIMATION_TIME_SUPER_SHORT, LINE_DEVIDER } from '../../../store/consts'

// import crossIcon from '../../../assets/icons/cross.png'
import crossIcon from '../../../assets/icons/cross_2.svg'

import './tour-chooser-classes.scss'

export type PriceCalc2TourChooserPropsType = {
    currentTour: TourType | null,
    setCurrentTour: (newTour: TourType) => void
    closeFunction: (closeValue: boolean) => void
}

export const PriceCalc2TourChooser = (props: PriceCalc2TourChooserPropsType) => {
    const {t} = useTranslation()
    const onTourChooseClickHandler = (newTour: TourType) => {
        props.setCurrentTour(newTour)
        props.closeFunction(false)
    }
    
    return (
        <motion.div 
            className='price-calc-2-tour-chooser-wrapper'
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION_TIME_SUPER_SHORT }}
            exit={{ opacity: 0, y: -100}}
        >

            <div className='price-calc-2-tour-chooser-title-div'>
                <strong>{t('tours.choose_tour')}</strong>
                <motion.img 
                    alt="" 
                    src={crossIcon} 
                    onClick={() => props.closeFunction(false)}
                    whileHover={{ rotate: 90, scale: 1.1 }}
                />
            </div>


            {toursContent().map(t => {
                return (
                    <div
                        key={uuid()}
                        onClick={() => onTourChooseClickHandler(t)}
                        className={clsx(
                            'price-calc-2-tour-chooser-field',
                            props.currentTour?.id === t.id && 'price-calc-2-tour-chooser-field-selected'
                        )}
                    >
                        {
                            t.title.includes(LINE_DEVIDER)
                                ? <>{t.title.split(LINE_DEVIDER).map(l => <div key={uuid()}>{l}</div>)}</>
                                : <>{t.title}</>
                            // t.title
                        }
                    </div>
                )
            })
            }
        </motion.div>
    )
}