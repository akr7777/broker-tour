import { ChangeEvent } from 'react'
import clsx from 'clsx'

import './text-fileds.classes.scss'

export type TextFiledPropsType = {
    text: string,
    onTextChange: (newValue: string) => void,

    type?: 'text' | 'password'
    isError?: boolean
    placeholder?: string
}

export const LineTextField = (props: TextFiledPropsType) => {

    const textFiledClass: string = clsx(
        'one-line-text-field-class',
        props.isError ? 'text-filed-error' : 'text-field-normal' 
    )

    const onChange = (elem: ChangeEvent<HTMLInputElement>) => {
        props.onTextChange(elem.currentTarget.value)
    }

    return (
        <input 
            type={props.type ? props.type : 'text'}
            className={textFiledClass}
            onChange={elem => onChange(elem)}
            placeholder={props.placeholder ? props.placeholder : ""}
        />
    )
}


export const MultilineTextField = (props: TextFiledPropsType) => {

    const textFiledClass: string = clsx(
        'one-line-text-field-class',
        props.isError ? 'text-filed-error' : 'text-field-normal' 
    )

    const onChange = (elem: ChangeEvent<HTMLTextAreaElement>) => {
        props.onTextChange(elem.currentTarget.value)
    }

    return (
        <textarea 
            // type={props.type ? props.type : 'text'}
            className={textFiledClass}
            onChange={elem => onChange(elem)}
            placeholder={props.placeholder ? props.placeholder : ""}
            rows={6}
        />
    )
}