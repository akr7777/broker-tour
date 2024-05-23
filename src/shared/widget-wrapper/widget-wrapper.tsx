import { ReactNode } from 'react'
import './widget-wrapper-classes.scss'

type PropsType = {
    children: JSX.Element | JSX.Element[] | ReactNode | ReactNode[]
  }
  
export const WidgetWrapper = ({children} : PropsType) => {
    return (
        <div className='widget-wrapper-class'>

            <div className='widget-wrapper-upper-div '/>

            {children}

            <div className='widget-wrapper-lower-div'/>

            {/* <div className='widget-wrapper-devider-div' /> */}

        </div>
    )
}