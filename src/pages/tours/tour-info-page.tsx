import { useTranslation } from "react-i18next"
import { MainWrapper } from "../../shared/main-wrapper/main-wrapper"
import { WidgetWrapper } from "../../shared/widget-wrapper/widget-wrapper"
// import { VerticalStepper, VerticalStepperType } from "../../components/vertical-stepper/vertical-stepper"
// import { PriceCalculation } from "../../widgets/price-calculation/price-calculation"
import { PriceCalculation2 } from "../../widgets/price-calculation-2/price-calculation-2"
import { useNavigate, useParams } from "react-router-dom"
import { TourType, toursContent } from "../../store/tour-info"
import { PATHS } from "../../widgets/nav-menu/nav-paths"
import { DaysPlan2, DaysPlanType } from "./tour-plan-2"
 
import './tours-classes.scss'
import { ReactNode } from "react"
import { tourPhotos } from "../../store/tour-days-photos"
import { ArticleTitle } from "../../shared/title/title"
import { LINE_DEVIDER } from "../../store/consts"
import uuid from "react-uuid"
// import uuid from "react-uuid"

export const TourInfoPage = () => {
    const { t } = useTranslation()
    const {tourId} = useParams()
    const navigate = useNavigate()

    const currentTour: TourType | undefined = toursContent().find(tour => tour.id === Number(tourId))

    if (!currentTour)
        navigate(PATHS.mainPage)

    // const tourTwoStepsAuto: Array<VerticalStepperType> = currentTour?.plan.map(d => {
    //     return { day: d.dayNumber, description: d.dayContent}
    // }) || []

    const daysPlanData: Array<DaysPlanType> = currentTour?.plan.map(d => {
        const photos: Array<ReactNode> | undefined = 
            tourPhotos
                .find(el => el.tourId === currentTour.id)?.data.find(b => b.day === d.dayNumber)?.photos
        return { day: d.dayNumber, description: d.dayContent, photos: photos}
    }) || []

    return (
        <MainWrapper>

         <WidgetWrapper>
            {/* <h2>{ currentTour?.title }</h2> */}
            <ArticleTitle title={currentTour?.title}/>
            <div>{ currentTour?.description }</div>
            { currentTour?.fullDescription.split(LINE_DEVIDER).map(p => <div key={uuid()}>{p}</div>) }
         </WidgetWrapper>

         {/* <WidgetWrapper>
            <h2>{t('tours.plan-of-the-trip')}</h2>
            <VerticalStepper steps={tourTwoStepsAuto}/>
         </WidgetWrapper> */}

         <WidgetWrapper>
            {/* <h2>{t('tours.plan-of-the-trip')}</h2> */}
            <ArticleTitle title={t('tours.plan-of-the-trip')}/>

            <DaysPlan2 data={daysPlanData} />
         </WidgetWrapper>

         {/* <PriceCalculation /> */}

         <PriceCalculation2 />


        </MainWrapper>
    )
}