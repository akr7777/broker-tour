import { useTranslation } from "react-i18next"
import { WidgetWrapper } from "../../shared/widget-wrapper/widget-wrapper"
import { PriceCalculation2 } from "../../widgets/price-calculation-2/price-calculation-2"
import { useNavigate, useParams } from "react-router-dom"
import { TourType, toursContent } from "../../store/tour-info"
import { PATHS } from "../../widgets/nav-menu/nav-paths"
import { DaysPlan2, DaysPlanType } from "./tour-plan-2"
import { ReactNode } from "react"
import { tourPhotos } from "../../store/tour-days-photos"
import { ArticleTitle } from "../../shared/title/title"
import { LINE_DEVIDER } from "../../store/consts"
import uuid from "react-uuid"

import './tours-classes.scss'

const TourInfoPage = () => {
    const { t } = useTranslation()
    const {tourId} = useParams()
    const navigate = useNavigate()

    const currentTour: TourType | undefined = toursContent().find(tour => tour.id === Number(tourId))

    if (!currentTour)
        navigate(PATHS.mainPage)

    const daysPlanData: Array<DaysPlanType> = currentTour?.plan.map(d => {
        const photos: Array<ReactNode> | undefined = 
            tourPhotos
                .find(el => el.tourId === currentTour.id)?.data.find(b => b.day === d.dayNumber)?.photos
        return { day: d.dayNumber, description: d.dayContent, photos: photos}
    }) || []

    return (
        <>

         <WidgetWrapper>
            <ArticleTitle title={currentTour?.title}/>
            <div className="tour-page-description">
                { currentTour?.description }
            </div>
            <div>
                { currentTour?.fullDescription.split(LINE_DEVIDER).map(p => <div key={uuid()}>{p}</div>) }
            </div>
         </WidgetWrapper>

         <PriceCalculation2 />

         <WidgetWrapper>
            <ArticleTitle title={t('tours.plan-of-the-trip')}/>

            <DaysPlan2 data={daysPlanData} />
         </WidgetWrapper>

         {/* <PriceCalculation /> */}

         <PriceCalculation2 />

        </>
    )
}

export default TourInfoPage