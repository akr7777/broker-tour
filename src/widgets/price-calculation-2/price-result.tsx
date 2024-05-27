// import uuid from 'react-uuid'
import { useTranslation } from 'react-i18next'
import { AdultPriceType } from '../../store/tour-info'

import './price-calc.scss'

export type PriceResultsPropsType = {
    adultCount: number,
    childrenCount: number,

    adultPrice: Array<AdultPriceType> | undefined,
    childAbsDiscount: number | undefined,
    // priceAdditionalInfo: Array<PriceAdditionalInfoType> | undefined,
    // priceAdditionalInfo: PriceAdditionalInfoType | undefined,
}

// export type AdultPriceType = {
//     personsCount: number,
//     oneAdultPrice: number,
// }
// export type PriceAdditionalInfoType = {
//     maxPersons: number,
//     info: string,
// }

export const PriceResults = (props: PriceResultsPropsType) => {
    const { t } = useTranslation()

    const oneAdultPrice: number = props.adultPrice?.find(el => el.personsCount === props.adultCount)?.oneAdultPrice || 0
    const adultsPrice: number = oneAdultPrice * props.adultCount
    const oneChildPrice: number = props.childAbsDiscount ? oneAdultPrice - props.childAbsDiscount : 0
    const childrenPrice: number = oneChildPrice * props.childrenCount

    const result: number = adultsPrice + childrenPrice

    // console.log('props=', props);
    
    // console.log('adultsPrice=', adultsPrice, 'childrenPrice=', childrenPrice);
    

    return (
        <div className='price-calc-2-results-wrapper'>
            {result !== 0 && <h3>{t('tours.tour-price-is')} {result}$</h3>}
            {/* {props.priceAdditionalInfo &&
                props.priceAdditionalInfo.map(p => <div key={uuid()}>{p.}</div>)
            } */}

            <div className='price-calc-2-results-additional-info-div'>
                {/* {
                    props.priceAdditionalInfo && props.adultCount + props.childrenCount <= props.priceAdditionalInfo?.divCount
                        ? <div>{props.priceAdditionalInfo.info1}</div>
                        : <div>{props.priceAdditionalInfo?.info2}</div>
                } */}
                {
                    props.adultCount + props.childrenCount <= 4
                        ? <div>{t('tours.add-price-info.info1')}</div>
                        : <div>{t('tours.add-price-info.info2')}</div>
                }
                <div>{t('tours.add-price-info.price_for_0_3_years_old')}</div>
                <div>{t('tours.add-price-info.tour-info-eat-hotel')}</div>
            </div>
            
        </div>
    )
}