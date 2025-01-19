import { NavMenuPropsType } from '../../../pages/header/header'
import { AnimatePresence, motion } from "framer-motion"
import { ANIMATION_TIME, ANIMATION_TIME_SHORT, DIV_IDS } from '../../../store/consts'
import uuid from 'react-uuid'
import { SubNavMenuElement } from './sub-menu-elem'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { setWhichSubMenuPointOpen } from '../../../store/appSlice'

import './desctop-nav-classes.scss'

export const DestopNavMenu = (props: NavMenuPropsType) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const whichTitleOpen: string = useAppSelector(state => state.app.whichSubMenuPointOpen)

    const onLinkClickHandler = (link: string) => {
        dispatch(setWhichSubMenuPointOpen(''))

        if (link.slice(0,1) === '#') {
            const elemId = link.slice(1, link.length)
            const elem = document.getElementById(elemId)
            
            if (elem) {
                elem.scrollIntoView({ behavior: 'smooth'})
            }
        } else {
            navigate(link)

            const elem = document.getElementById(DIV_IDS.wellcomePageLowerText)
            
            if (elem) {
                elem.scrollIntoView({ behavior: 'smooth'})
            }
        }

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
        <div className='desctop-nav-wrapper'>
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

                                <nav 
                                    className='desctop-nav-link-class' 
                                    onClick={
                                        elem.subElements 
                                            ? () => subMenuClickHandler(elem.title)
                                            : () => onLinkClickHandler(elem.path)
                                    }
                                >
                                    {elem.title}
                                </nav>

                                <AnimatePresence mode="wait" initial={false}>
                                    {elem.title === whichTitleOpen &&
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
                                                <motion.nav 
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
                                                </motion.nav>
                                            </AnimatePresence>
                                        </>
                                }
                                </AnimatePresence>

                            </div>
                        )
                    })}
                </motion.div>
        </div>
    )
}