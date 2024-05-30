
import { useEffect, useState } from 'react'
import { PersonsCountChooser } from '../../components/persons-count-chooser/persons-count-chooser'
import { TourType, toursContent } from '../../store/tour-info'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PriceResults } from './price-result'
import clsx from 'clsx'
import { PriceCalc2TourChooser } from './tour-chooser/tour-chooser'
import { ButtonContact } from '../../components/buttons/buttonContact'
import { toast } from 'react-toastify'
import { ANIMATION_TIME, CONTACTS } from '../../store/consts'
import { WidgetWrapper } from '../../shared/widget-wrapper/widget-wrapper'
import { AnimatePresence, motion } from 'framer-motion'
import { HotelRecomendations } from '../hotels-recomendations/hotel-recomendations'

import './price-calc.scss'

const maxAdultCount = 8
const minAdultCount = 1
const maxChildrenCount = 7
const minChildrenCount = 0
const totalMaxPersons = 8

export const PriceCalculation2 = () => {

    const {tourId} = useParams()
    const { t } = useTranslation()

    const [currentTour, setCurrentTour] = useState<TourType | null>(null)

    useEffect(() => {
        const isPathFound: boolean = toursContent().some(tour => tour.id === Number(tourId))
        if (isPathFound) {
            const currentTour: TourType | undefined = toursContent().find(tour => tour.id === Number(tourId))
            if (currentTour) {
                setCurrentTour(currentTour)
            }
        }
    }, [tourId])

    const [adultCount, setAdultCount] = useState<number>(minAdultCount)
    const [childrenCount, setChildrenCount] = useState<number>(minChildrenCount)
    const [isShowTourChooser, setIsShowTourChooser] = useState<boolean>(false)
    const [showPriceResult, setShowPriceResult] = useState<boolean>(false)
    const [noTourErr, setNoTourErr] = useState<boolean>(false)

    const setPersonsCount = (count: number, isAdult: boolean) => {
        setShowPriceResult(false)
        if (isAdult) {
            setAdultCount(count)
        } else {
            setChildrenCount(count)
        }
    }

    const onChooseTourClickHandler = () => {
        if (!tourId) {
            setNoTourErr(false)
            setIsShowTourChooser(!isShowTourChooser)
        }
    }

    const onCalcTourClickHandler = () => {
        if (currentTour) {
            setShowPriceResult(true)
        } else {
            toast.error(t('tours.needs_to_choose_a_tour'))
            setNoTourErr(true)
        }
    }

    return (
        <WidgetWrapper>
            <div className='price-calc-2-wrapper'>
                
                <h2>{t('tours.tour_price_calculation')}</h2>

                <div className='price-calc-2-data-wrapper'>
                        {/* <AnimatePresence mode="wait" initial={false}>
                            {isShowTourChooser && 
                                <PriceCalc2TourChooser 
                                    currentTour={currentTour} 
                                    setCurrentTour={setCurrentTour} 
                                    closeFunction={setIsShowTourChooser}
                            />}
                        </AnimatePresence> */}

                    <div 
                        className={clsx(
                            'price-calc-2-data-area', 
                            'price-calc-2-data-cursor', 
                            'price-calc-2-data-area-first',
                            noTourErr && 'price-calc-2-data-cursor-error'
                        )}
                        onClick={onChooseTourClickHandler}
                    >
                        <h4>{currentTour ? currentTour.title : t('tours.choose_tour')}</h4>
                        <AnimatePresence mode="wait" initial={false}>
                            {isShowTourChooser && 
                                <PriceCalc2TourChooser 
                                    currentTour={currentTour} 
                                    setCurrentTour={setCurrentTour} 
                                    closeFunction={setIsShowTourChooser}
                            />}
                        </AnimatePresence>
                    </div>

                    <div className='price-calc-2-data-area'>
                        <h4>{ t('tours.adult_count_chooser') }</h4>
                        <PersonsCountChooser 
                            count={adultCount}
                            setCount={(val: number) => setPersonsCount(val, true)}
                            maxCount={maxAdultCount}
                            minCount={minAdultCount}
                            isMaxPersons={adultCount + childrenCount >= totalMaxPersons}
                        />
                    </div>

                    <div className='price-calc-2-data-area'>
                        <h4>{ t('tours.child_count_chooser') }</h4>
                        <PersonsCountChooser 
                            count={childrenCount}
                            setCount={(val: number) => setPersonsCount(val, false)}
                            maxCount={maxChildrenCount}
                            minCount={minChildrenCount}
                            isMaxPersons={adultCount + childrenCount >= totalMaxPersons}
                        />
                    </div>

                    {/* Кнопка для запуска расчета стоимости тура */}
                    <div 
                        className={clsx(
                            'price-calc-2-data-area', 
                            'price-calc-2-data-cursor',
                            'price-calc-2-data-area-last'
                        )}
                        onClick={onCalcTourClickHandler}
                    >
                        <h4>{t('tours.tour_price_calc_button_text')}</h4>
                    </div>
                </div>

                <div>
                    {t('tours.add-price-info.price_for_0_3_years_old')}
                </div>

                {adultCount + childrenCount >= totalMaxPersons && 
                    <div>
                        {t('tours.tour_max_persons_count')}
                        <a href={'whatsapp://send?phone=' + CONTACTS.phoneOlga}>{CONTACTS.phoneOlga}</a>
                    </div>}

                {/* Рассчет стоиомсти */}
                <AnimatePresence mode="wait" initial={true}>
                    {showPriceResult && 
                    <motion.div
                        // initial={{ opacity: 0, y: -100 }}
                        // animate={{ opacity: 1, y: 0 }}
                        // transition={{ duration: ANIMATION_TIME }}
                        // exit={{ opacity: 0, y: -100 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: ANIMATION_TIME }}
                        exit={{ opacity: 0 }}

                        className='price-calc-2-results-common'
                    >

                        <PriceResults 
                            adultCount={adultCount}
                            childrenCount={childrenCount}

                            adultPrice={currentTour?.adultPrice}
                            childAbsDiscount={currentTour?.childAbsDiscount} 
                        />
                        
                        {/* Забронировать тур! */}
                        <ButtonContact tour={currentTour?.title || ""}/>

                        {/* Рекомендации по выбору отеля */}
                        <HotelRecomendations hotelRecomendations={currentTour?.hotelRecomendations} />

                    </motion.div>}
                </AnimatePresence>
            </div>
        </WidgetWrapper>
    )
}
