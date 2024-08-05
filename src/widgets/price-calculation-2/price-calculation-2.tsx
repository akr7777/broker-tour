
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
import { ANIMATION_TIME, CONTACTS, LINE_DEVIDER } from '../../store/consts'
import { WidgetWrapper } from '../../shared/widget-wrapper/widget-wrapper'
import { AnimatePresence, motion } from 'framer-motion'
import { HotelRecomendations } from '../hotels-recomendations/hotel-recomendations'
import { ArticleTitle } from '../../shared/title/title'
import i18next from 'i18next'
import uuid from 'react-uuid'

import vacationImage from '../../assets/icons/summer-vacation.svg'

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

    const divIdPriceCalcResult = uuid()

    //Переменные currentLang и tourTitle нужны, чтобы корректно отобразить название тура в первом поле (ячейке)
    //при смене языка во время выбора тура
    const currentLang = i18next.language
    const [tourTitle, setTourTitle] = useState<string>(
        currentTour?.title || ""
    )

    useEffect(() => {
        // Обновление информации при смене route тура
        const isPathFound: boolean = toursContent().some(tour => tour.id === Number(tourId))
        if (isPathFound) {
            const newCurrentTour: TourType | undefined = toursContent().find(tour => tour.id === Number(tourId))
            if (newCurrentTour) {
                setCurrentTour(newCurrentTour)
                setTourTitle(newCurrentTour.title)
            }
        }
        // Обновление информации при смене языка
        if (currentTour?.id) {
            const currentTourNewLang: TourType | undefined = toursContent().find(tour => tour.id === currentTour.id)
            if (currentTourNewLang) {
                setCurrentTour(currentTourNewLang)
                setTourTitle(currentTourNewLang.title)
            }
        }
    }, [tourId, currentLang, currentTour?.id])

    // Информация о выборе детей-взрослых и вспомогательные переменные
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
            // const elem = document.getElementById(DIV_IDS.priceCalculationResult)
            const elem = document.getElementById(divIdPriceCalcResult)
            if (elem) {
                elem.scrollIntoView({ behavior: 'smooth'})
            }
        } else {
            toast.error(t('tours.needs_to_choose_a_tour'))
            setNoTourErr(true)
        }
    }

    const onNewTourChoice = (newTour: TourType) => {
        setCurrentTour(newTour)
        setTourTitle(newTour.title)
    }

    return (
        <WidgetWrapper>
            <ArticleTitle title={t('tours.tour_price_calculation')} image={vacationImage}/>

            {/* <div className='price-calc-2-wrapper' id={DIV_IDS.tourCalculation}> */}
            <div className='price-calc-2-wrapper' id={divIdPriceCalcResult}>
                
                {/* <ArticleTitle title={t('tours.tour_price_calculation')} image={vacationImage}/> */}

                <div className='price-calc-2-data-wrapper'>
                       
                    {/* Выбор тура */}
                    <div 
                        className={clsx(
                            'price-calc-2-data-area', 
                            'price-calc-2-data-cursor', 
                            'price-calc-2-data-area-first',
                            noTourErr && 'price-calc-2-data-cursor-error'
                        )}
                        onClick={onChooseTourClickHandler}
                    >
                        {/* Надпись текущего тура в поле выбранного тура (или "Выберите тур") */}
                        {currentTour 
                            ? tourTitle.includes(LINE_DEVIDER)
                                ? <>{tourTitle.split(LINE_DEVIDER)
                                        .map(l => <h4 key={uuid()}>{l}</h4>)
                                }</>
                                : <h4>{tourTitle}</h4>
                            : <h4>{t('tours.choose_tour')}</h4>
                        }

                        {/* Выпадающее меню с выбором туров */}
                        <AnimatePresence mode="wait" initial={false}>
                            {isShowTourChooser &&
                                <PriceCalc2TourChooser 
                                    currentTour={currentTour} 
                                    setCurrentTour={onNewTourChoice} 
                                    closeFunction={setIsShowTourChooser}
                                />
                            }
                        </AnimatePresence>
                    </div>

                    {/* Выбор кол-ва взрослых */}
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

                    {/* Выбор кол-ва детей */}
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
                        id={divIdPriceCalcResult}
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

                <div className='price-calc-2-results-common'>
                    {t('tours.add-price-info.price_for_0_3_years_old')}
                </div>

                {adultCount + childrenCount >= totalMaxPersons && 
                    <div className='price-calc-2-results-common'>
                        {t('tours.tour_max_persons_count')}
                        <a href={'whatsapp://send?phone=' + CONTACTS.phoneOlga}>{CONTACTS.phoneOlga}</a>
                    </div>}

                {/* Рассчет стоиомсти */}
                <AnimatePresence mode="wait" initial={true}>
                    {showPriceResult && 
                    <motion.div
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
                        
                        {/* Кнопка "Забронировать тур!"" */}
                        <ButtonContact tour={currentTour?.title || ""}/>

                        {/* Рекомендации по выбору отеля */}
                        <HotelRecomendations hotelRecomendations={currentTour?.hotelRecomendations} />

                    </motion.div>}
                </AnimatePresence>
            </div>
        </WidgetWrapper>
    )
}
