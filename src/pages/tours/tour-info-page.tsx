import { useTranslation } from "react-i18next"
import { MainWrapper } from "../../shared/main-wrapper/main-wrapper"
import { WidgetWrapper } from "../../shared/widget-wrapper/widget-wrapper"
import { VerticalStepper, VerticalStepperType } from "../../components/vertical-stepper/vertical-stepper"
// import { PriceCalculation } from "../../widgets/price-calculation/price-calculation"
import { PriceCalculation2 } from "../../widgets/price-calculation-2/price-calculation-2"
import { useNavigate, useParams } from "react-router-dom"
import { TourType, toursContent } from "../../store/tour-info"
import { PATHS } from "../../widgets/nav-menu/nav-paths"
import { DaysPlan2 } from "./tour-plan-2"
 
import './tours-classes.scss'
// import uuid from "react-uuid"

export const TourInfoPage = () => {
    const { t } = useTranslation()
    const {tourId} = useParams()
    const navigate = useNavigate()

    const currentTour: TourType | undefined = toursContent().find(t => t.id === Number(tourId))

    if (!currentTour)
        navigate(PATHS.mainPage)

    const tourTwoStepsAuto: Array<VerticalStepperType> = currentTour?.plan.map(d => {
        return { day: d.dayNumber, description: d.dayContent}
    }) || []
    // for (let i = 1; i <= 12; i++) {
    //     const nextStep: VerticalStepperType = {
    //         day: i,
    //         description: t('tours.tour2.plan.day' + i).split('\n'),
    //     }
    //     tourTwoStepsAuto.push(nextStep)
    // }

    return (
        <MainWrapper>

         <WidgetWrapper>
            <h2>{ currentTour?.title }</h2>

            {/* <div className="background-color"> */}
                <div>{ currentTour?.description }</div>
            {/* </div> */}
         </WidgetWrapper>

         <WidgetWrapper>
            <h2>{t('tours.plan-of-the-trip')}</h2>
            <VerticalStepper steps={tourTwoStepsAuto}/>
         </WidgetWrapper>

         <WidgetWrapper>
            <DaysPlan2 tourTwoStepsAuto={tourTwoStepsAuto}/>
         </WidgetWrapper>

         {/* <PriceCalculation /> */}

         <PriceCalculation2 />


        </MainWrapper>
    )
}