import { NavMenuPropsType } from '../../../pages/header/header'
import { AnimatePresence, motion } from "framer-motion"

import { ANIMATION_TIME, ANIMATION_TIME_SHORT } from '../../../store/consts'
import uuid from 'react-uuid'

import './desctop-nav-classes.scss'

import { SubNavMenuElement } from './sub-menu-elem'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { setWhichSubMenuPointOpen } from '../../../store/appSlice'

export const DestopNavMenu = (props: NavMenuPropsType) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const whichTitleOpen: string = useAppSelector(state => state.app.whichSubMenuPointOpen)

    const onLinkClickHandler = (link: string) => {
        dispatch(setWhichSubMenuPointOpen(''))
        navigate(link)
    }
    const subMenuClickHandler = (title: string) => {
        if (whichTitleOpen === title) {
            dispatch(setWhichSubMenuPointOpen(''))
        }
        if (whichTitleOpen !== title) {
            dispatch(setWhichSubMenuPointOpen(title))
        }
    }

    const onCloseOutletClick = () => {
        dispatch(setWhichSubMenuPointOpen(''))
    }

    return (
        <nav className='desctop-nav-wrapper'>
                <motion.div 
                    className='desctop-nav-wrapper'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: ANIMATION_TIME }}
                    exit={{opacity: 0}}
                >
                    {props.elements.map(elem => {
                        return (
                            <div key={uuid()}>
                            <div 
                                className='desctop-nav-link-class' 
                                onClick={
                                    elem.subElements 
                                        ? () => subMenuClickHandler(elem.title)
                                        : () => onLinkClickHandler(elem.path)
                                }
                            >
                                <img alt="" src={elem.imagePath} />
                                {elem.title}
                            </div>

                            <AnimatePresence mode="wait" initial={false}>
                                {elem.title === whichTitleOpen &&
                                    // <motion.div
                                    //         initial={{ opacity: 0, x: -200 }}
                                    //         animate={{ opacity: 1, x: 0 }}
                                    //         transition={{ duration: 10 }}
                                    //         exit={{opacity: 0}}
                                    // >
                                    <>
                                        <AnimatePresence>
                                            <motion.div 
                                                className='desctop-nav-oulet-close-div' 
                                                onClick={onCloseOutletClick}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: ANIMATION_TIME_SHORT }}
                                                exit={{opacity: 0}}
                                            />
                                        </AnimatePresence>
                                        <AnimatePresence>
                                            <motion.div 
                                                className='desctop-nav-sublink-div'
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: ANIMATION_TIME_SHORT }}
                                                exit={{opacity: 0}}
                                            >
                                                {elem.subElements && elem.subElements.map(subElem => {
                                                    return ( 
                                                        <SubNavMenuElement {...subElem} key={uuid()}/>
                                                    )
                                                })}
                                            </motion.div>
                                        </AnimatePresence>
                                    </>
                                }
                                </AnimatePresence>

                            </div>
                        )
                    })}
                </motion.div>
        </nav>
    )
}