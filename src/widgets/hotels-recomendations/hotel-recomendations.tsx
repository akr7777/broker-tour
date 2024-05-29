import uuid from 'react-uuid'
import { AccordeonDataType, MyAccordeon } from '../../components/my-accordeon/my-accordeon'
import { HotelRecomendationType } from '../../store/tour-info'

import './hotel-recomandations.scss'
import { useTranslation } from 'react-i18next'

export type HotelRecomendationsPropsType = {
    hotelRecomendations: Array<HotelRecomendationType> | undefined
}
export const HotelRecomendations = (props: HotelRecomendationsPropsType) => {
    const {t} = useTranslation()
    const accordeonData: Array<AccordeonDataType> = props.hotelRecomendations
        ? props.hotelRecomendations.map(r => {
            const res:AccordeonDataType = {
                id: uuid(),
                title: r.point,
                context: r.hotels
            }
            return res
        })
        : []
        
    return (
        <div className='hotel-recomendations-wrapper'>

            <h3>{t('tours.hotel-recomenddations-title')}</h3>
            <div className='hotel-recomendations-description'>
                {t('tours.hotel-recomenddations-description')}
            </div>
            <MyAccordeon data={accordeonData} />
            
        </div>
    )
}