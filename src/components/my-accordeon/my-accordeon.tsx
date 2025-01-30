import { useState } from 'react'
import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import { AccordeonHidenText, AccordeonHotelsHiddenText } from './my-accordeon-hiden-text'
import { HotelType } from '../../store/tour-info'

import './my-accordeon.scss'

import arrowUp from '../../assets/icons/faq/arrow-up-3.png'
import arrowDown from '../../assets/icons/faq/arrow-down-3.png'

// import arrowUp2

export type AccordeonDataType = {
    id: string
    title: string,
    context: Array<string>
}
export type AccordeonPropsType = {
    data: Array<AccordeonDataType>
}
export const MyAccordeon = (props: AccordeonPropsType) => {

    const [showElems, setShowElems] = useState<Array<string>>([])

    const onHeadClickHandler = (isShow: boolean, id: string) => {
        if (isShow) {
            setShowElems(showElems.filter(el => el !== id))
        } else {
            setShowElems([...showElems, id])
        }
    }

    return (
        <div className='my-accordeon-wrapper'>
            {props.data.map(item => {
                const isShow: boolean = showElems.some(elem => elem === item.id)
                const arrow: string = isShow ? arrowUp : arrowDown
                const wrapperClass: string = clsx(
                    'my-accordeon-item-question-wrapper',
                    isShow && 'my-accordeon-item-question-wrapper-top'
                )
                const greenPointClass: string = clsx(
                    'my-accordeon-item-question-question-circle',
                    isShow && 'my-accordeon-item-question-question-circle-green'
                )

                return (
                    <div className={wrapperClass} key={item.id}>

                        <div 
                            onClick={() => onHeadClickHandler(isShow, item.id)}
                            className='my-accordeon-item-question-question'
                        >
                            <div className={greenPointClass} />
                            <h4>{item?.title}</h4>
                            <img alt="" src={arrow} />
                        </div>

                        <AnimatePresence mode="wait" initial={false}>
                            {isShow && <AccordeonHidenText text={item.context} />}
                        </AnimatePresence>
                    </div>
                )
            })}
        </div>
    )
}


export type MyAccordeonHotelType = {
    id: string
    hotels: Array<HotelType | undefined>
    point: string
}
export type MyAccordeonPropsType = { data: Array<MyAccordeonHotelType>}
export const MyHotelsAccordeon = (props: MyAccordeonPropsType) => {
    const [showElems, setShowElems] = useState<Array<string>>([])

    const onHeadClickHandler = (isShow: boolean, id: string) => {
        if (isShow) {
            setShowElems(showElems.filter(el => el !== id))
        } else {
            setShowElems([...showElems, id])
        }
        // const newArr: Array<AccordeonDataType>
    }

    return (
        <div className='my-accordeon-wrapper'>
            {props.data.map(item => {
                const isShow: boolean = showElems.some(elem => elem === item.id)
                const arrow: string = isShow ? arrowUp : arrowDown
                const wrapperClass: string = clsx(
                    'my-accordeon-item-question-wrapper',
                    isShow && 'my-accordeon-item-question-wrapper-top'
                )
                const greenPointClass: string = clsx(
                    'my-accordeon-item-question-question-circle',
                    isShow && 'my-accordeon-item-question-question-circle-green'
                )

                return (
                    <div className={wrapperClass} key={item.id}>

                        <div 
                            onClick={() => onHeadClickHandler(isShow, item.id)}
                            className='my-accordeon-item-question-question'
                        >
                            <div className={greenPointClass} />
                            <h4>{item.point}</h4>
                            <img alt="" src={arrow} />
                        </div>

                        <AnimatePresence mode="wait" initial={false}>
                            {isShow && <AccordeonHotelsHiddenText data={item.hotels} />}
                        </AnimatePresence>
                    </div>
                )
            })}
        </div>
    )
}