import { useTranslation } from "react-i18next"
import { MainWrapper } from "../../shared/main-wrapper/main-wrapper"
import { WidgetWrapper } from "../../shared/widget-wrapper/widget-wrapper"

import { VerticalStepper, VerticalStepperType } from "../../components/vertical-stepper/vertical-stepper"

import './tours-classes.scss'
// import { stepperColors } from "../../components/vertical-stepper/stepper-colors"



export const Tour1 = () => {
    const { t } = useTranslation()

    const tourOneStepsAuto: Array<VerticalStepperType> = []
    for (let i = 1; i <= 7; i++) {
        const nextStep: VerticalStepperType = {
            day: i,
            description: t('tours.tour1.plan.day' + i).split('\n'),
        }
        tourOneStepsAuto.push(nextStep)
    }

    return (
        <MainWrapper>
            <div id='tour1'/>

         <WidgetWrapper>
            <h2>{ t('tours.tour1.title') }</h2>

            <div className="background-color">
                <div>{ t('tours.tour1.description') }</div>
            </div>
         </WidgetWrapper>

         <WidgetWrapper>
            <h2>План поездки:</h2>
            <VerticalStepper steps={tourOneStepsAuto}/>
         </WidgetWrapper>

        </MainWrapper>
    )
}