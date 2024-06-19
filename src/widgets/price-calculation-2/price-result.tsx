import { useTranslation } from 'react-i18next'
import { AdultPriceType } from '../../store/tour-info'
import { motion } from 'framer-motion'

import './price-calc.scss'

export type PriceResultsPropsType = {
    adultCount: number,
    childrenCount: number,

    adultPrice: Array<AdultPriceType> | undefined,
    childAbsDiscount: number | undefined,
}

export const PriceResults = (props: PriceResultsPropsType) => {
    const { t } = useTranslation()

    const oneAdultPrice: number = props.adultPrice?.find(el => 
        el.personsCount === props.adultCount + props.childrenCount)?.oneAdultPrice || 0
    const adultsPrice: number = oneAdultPrice * props.adultCount

    const oneChildPrice: number = props.childAbsDiscount ? oneAdultPrice - props.childAbsDiscount : 0
    const childrenPrice: number = oneChildPrice * props.childrenCount

    const result: number = adultsPrice + childrenPrice

    return (
        <motion.div className='price-calc-2-results-wrapper'>
            {result !== 0 && <h3>{t('tours.tour-price-is')} {result}$</h3>}

            <div className='price-calc-2-results-additional-info-div'>
                {
                    props.adultCount + props.childrenCount <= 4
                        ? <div>{t('tours.add-price-info.info1')}</div>
                        : <div>{t('tours.add-price-info.info2')}</div>
                }
                <div>{t('tours.add-price-info.price_for_0_3_years_old')}</div>
                <div>{t('tours.add-price-info.tour-info-eat-hotel')}</div>
            </div>
            
        </motion.div>
    )
}