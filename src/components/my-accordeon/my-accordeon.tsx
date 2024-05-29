import { useState } from 'react'
import clsx from 'clsx'
import uuid from 'react-uuid'

import arrowUp from '../../assets/icons/faq/arrow-up.png'
import arrowDown from '../../assets/icons/faq/arrow-down.png'

import './my-accordeon.scss'

export type AccordeonDataType = {
    id: string,
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
                return (
                    <div className={wrapperClass} key={item.id}>

                        <div 
                            onClick={() => onHeadClickHandler(isShow, item.id)}
                            className='my-accordeon-item-question-question'
                        >
                            <h4>{item.title}</h4>
                            <img alt="" src={arrow} />
                        </div>

                        {isShow && 
                            <>
                                {item.context.map(p => {
                                    return <div key={uuid()}>{p}</div>
                                })}
                            </>
                        }
                    </div>
                )
            })}
        </div>
    )
}