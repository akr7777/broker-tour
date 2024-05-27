import uuid from 'react-uuid'
import { TourType, toursContent } from '../../../store/tour-info'

import crossIcon from '../../../assets/icons/cross.png'

import './tour-chooser-classes.scss'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'


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

    // console.log('toursContent=',toursContent);
    
    return (
        <div className='price-calc-2-tour-chooser-wrapper'>

            <img alt="" src={crossIcon} onClick={() => props.closeFunction(false)}/>

            <div>{t('tours.choose_tour')}</div>

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
                        {t.title}
                    </div>
                )
            })
            }
        </div>
    )
}