import uuid from 'react-uuid'
import { MyAccordeonHotelType, MyHotelsAccordeon } from '../../components/my-accordeon/my-accordeon'
import { HotelRecomendationType } from '../../store/tour-info'
import { useTranslation } from 'react-i18next'

import './hotel-recomandations.scss'

export type HotelRecomendationsPropsType = {
    hotelRecomendations: Array<HotelRecomendationType> | undefined
}
export const HotelRecomendations = (props: HotelRecomendationsPropsType) => {
    const {t} = useTranslation()
    const accordeonData: Array<MyAccordeonHotelType> = props.hotelRecomendations
        ? props.hotelRecomendations.map(r => {
            const res:MyAccordeonHotelType = {
                id: uuid(),
                point: r.point,
                hotels: r.hotels,
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
            <MyHotelsAccordeon data={accordeonData} />
            
        </div>
    )
}