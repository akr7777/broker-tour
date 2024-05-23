import { useTranslation } from 'react-i18next'
import './vertical-stepper-classes.scss'
import uuid from 'react-uuid'
import { stepperColors } from './stepper-colors'

export type VerticalStepperType = {
    day: number,
    description: Array<string>,
}
type PropsType = {
    steps: Array<VerticalStepperType>
}

export const VerticalStepper = (props: PropsType) => {
    const { t } = useTranslation()
    return (
        <>
            {props.steps.map(step => {
                return (
                    <div className='vert-stepper-wrapper' key={uuid()}>

                        <div className='vert-stepper-part1'>
                            <div className='vert-stepper-part1-vert-line' />
                            <div 
                                className='vert-stepper-part1-circle' 
                                style={{ backgroundColor: stepperColors[(step.day - 1) % stepperColors.length]}} 
                            />
                        </div>

                        <div className='vert-stepper-content'>

                            <div className='vert-stepper-part2'>
                                { t('stepper.day') } {step.day}
                            </div>

                            <div className='vert-stepper-part3'>
                                {step.description.map(d => {
                                    return (
                                        <div key={uuid()}>
                                            {d}
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                    </div>
                )
            })}
        </>
    )
}