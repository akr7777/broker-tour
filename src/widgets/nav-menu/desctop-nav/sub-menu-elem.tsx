import { useNavigate } from "react-router-dom"
import { NavMenuElementsType } from "../../../pages/header/header"
import { useAppDispatch } from "../../../store/store"
import { setWhichSubMenuPointOpen } from "../../../store/appSlice"
import { ReactNode } from "react"
import { LINE_DEVIDER } from "../../../store/consts"
import uuid from "react-uuid"

import './sub-menu-classes.scss'

export const SubNavMenuElement = (props: NavMenuElementsType) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const menuTitleElement: ReactNode = props.title.includes(LINE_DEVIDER)
        ? <>{props.title.split(LINE_DEVIDER).map(p => {

            const par: ReactNode = p.includes('/')
                ? <>{p.split('/').map(l => 
                    <div 
                        className="desctop-nav-sublink-elem-sub-title-days"
                        key={uuid()}>
                            {l}
                        </div>
                )}</>
                : <>{p}</>
            return (
                <div key={uuid()}>{par}</div>
            )
        })}</>
        
        : <>{props.title}</>

    const onElemClick = () => {
        dispatch(setWhichSubMenuPointOpen(''))
        navigate(props.path)
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth", // Optional if you want to skip the scrolling animation
        });
    }

    return (
        <div
            className="desctop-nav-sublink-elem-wrapper-class"
            onClick={onElemClick}
        >
            <div className="desctop-nav-sublink-elem-title-class">
                <img alt="" src={props.imagePath} />
                {menuTitleElement}
            </div>
            <div className="desctop-nav-sublink-elem-description-class">
                {props.description}
            </div>
        </div>
    )
}