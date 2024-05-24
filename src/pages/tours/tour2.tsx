import { useTranslation } from "react-i18next"
import { MainWrapper } from "../../shared/main-wrapper/main-wrapper"
import { WidgetWrapper } from "../../shared/widget-wrapper/widget-wrapper"

import { VerticalStepper, VerticalStepperType } from "../../components/vertical-stepper/vertical-stepper"

import './tours-classes.scss'

export const Tour2 = () => {
    const { t } = useTranslation()

    const tourTwoStepsAuto: Array<VerticalStepperType> = []
    for (let i = 1; i <= 12; i++) {
        const nextStep: VerticalStepperType = {
            day: i,
            description: t('tours.tour2.plan.day' + i).split('\n'),
        }
        tourTwoStepsAuto.push(nextStep)
    }

    return (
        <MainWrapper>
            <div id='tour2'/>

         <WidgetWrapper>
            <h2>{ t('tours.tour2.title') }</h2>

            <div className="background-color">
                <div>{ t('tours.tour2.description') }</div>
            </div>
         </WidgetWrapper>

         <WidgetWrapper>
            <h2>План поездки:</h2>
            <VerticalStepper steps={tourTwoStepsAuto}/>
         </WidgetWrapper>

        </MainWrapper>
    )
}