
import { useEffect, useState } from 'react'
import { PersonsCountChooser } from '../../components/persons-count-chooser/persons-count-chooser'

import './price-calc.scss'
import { TourType, toursContent } from '../../store/tour-info'
import { 
    // useLocation, 
    useParams 
} from 'react-router-dom'
// import { PATHS } from '../nav-menu/nav-paths'
import { useTranslation } from 'react-i18next'
import { PriceResults } from './price-result'
import clsx from 'clsx'
import { PriceCalc2TourChooser } from './tour-chooser/tour-chooser'
import { ButtonContact } from '../../components/buttons/buttonContact'
import { toast } from 'react-toastify'


const maxAdultCount = 8
const minAdultCount = 1
const maxChildrenCount = 7
const minChildrenCount = 0
const totalMaxPersons = 8

export const PriceCalculation2 = () => {

    // const pathname = useLocation().pathname
    const {tourId} = useParams()
    const { t } = useTranslation()

    const [currentTour, setCurrentTour] = useState<TourType | null>(null)

    useEffect(() => {
        // console.log('tourId-=', tourId, 'pathname=', pathname);
        
        const isPathFound: boolean = toursContent().some(tour => tour.id === Number(tourId))
        if (isPathFound) {
            const currentTour: TourType | undefined = toursContent().find(tour => tour.id === Number(tourId))
            if (currentTour) {
                setCurrentTour(currentTour)
            }
        }
    }, [tourId])

    // const chooseTourClass: string = clsx('price-calc-2-data-cursor')
    
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
            setIsShowTourChooser(true)
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
        <div className='price-calc-2-wrapper'>

            {isShowTourChooser && 
                <PriceCalc2TourChooser 
                    currentTour={currentTour} 
                    setCurrentTour={setCurrentTour} 
                    closeFunction={setIsShowTourChooser}
            />}

            <h2>{t('tours.tour_price_calculation')}</h2>

            <div className='price-calc-2-data-wrapper'>

                <div 
                    className={clsx('price-calc-2-data-area', 'price-calc-2-data-cursor', noTourErr && 'price-calc-2-data-cursor-error')}
                    onClick={onChooseTourClickHandler}
                >
                    <h4>{currentTour ? currentTour.title : t('tours.choose_tour')}</h4>
                </div>

                <div className='price-calc-2-data-area'>
                    <h4>{ t('tours.adult_count_chooser') }</h4>
                    <PersonsCountChooser 
                        count={adultCount}
                        // setCount={setAdultCount}
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
                        // setCount={setChildrenCount}
                        setCount={(val: number) => setPersonsCount(val, false)}
                        maxCount={maxChildrenCount}
                        minCount={minChildrenCount}
                        isMaxPersons={adultCount + childrenCount >= totalMaxPersons}
                    />
                </div>

                <div 
                    className={clsx('price-calc-2-data-area', 'price-calc-2-data-cursor')}
                    // onClick={() => setShowPriceResult(true)}
                    onClick={onCalcTourClickHandler}
                >
                    <h4>Рассчитать</h4>
                </div>
            </div>

            <div>
                {t('tours.add-price-info.price_for_0_3_years_old')}
            </div>
            {adultCount + childrenCount >= totalMaxPersons && 
                <div>
                    {t('tours.tour_max_persons_count')}
                </div>}

            
            {showPriceResult && 
            <>
                <PriceResults 
                    adultCount={adultCount}
                    childrenCount={childrenCount}

                    adultPrice={currentTour?.adultPrice}
                    childAbsDiscount={currentTour?.childAbsDiscount} 
                    // priceAdditionalInfo={currentTour?.priceAdditionalInfo} 
                 />
                <ButtonContact tour={currentTour?.title || ""}/>
            </>}

            
        </div>
    )
}
