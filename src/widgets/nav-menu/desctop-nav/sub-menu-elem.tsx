import { useNavigate } from "react-router-dom"
import { NavMenuElementsType } from "../../../pages/header/header"

import './sub-menu-classes.scss'
import { useAppDispatch } from "../../../store/store"
import { setWhichSubMenuPointOpen } from "../../../store/appSlice"

export const SubNavMenuElement = (props: NavMenuElementsType) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const onElemClick = () => {
        dispatch(setWhichSubMenuPointOpen(''))
        navigate(props.path)
    }

    return (
        <div
            className="desctop-nav-sublink-elem-wrapper-class"
            onClick={onElemClick}
        >
            <div className="desctop-nav-sublink-elem-title-class">
                <img alt="" src={props.imagePath} />
                {props.title}
            </div>
            <div className="desctop-nav-sublink-elem-description-class">
                {props.description}
            </div>
        </div>
    )
}