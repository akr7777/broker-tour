// import { NavLink } from 'react-router-dom'
import { NavMenuPropsType } from '../../../pages/header/header'
import { AnimatePresence, motion } from "framer-motion"

import { ANIMATION_TIME, ANIMATION_TIME_SHORT } from '../../../store/consts'
import uuid from 'react-uuid'

import './desctop-nav-classes.scss'
import { SubNavMenuElement } from './sub-menu-elem'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const DestopNavMenu = (props: NavMenuPropsType) => {

    const navigate = useNavigate()
    const [showTitle, setShowTitle] = useState<string>('')

    const onLinkClickHandler = (link: string) => {
        setShowTitle('')
        navigate(link)
    }
    const subMenuClickHandler = (title: string) => {
        if (showTitle === title) {
            setShowTitle('')
        }
        if (showTitle !== title) {
            setShowTitle(title)
        }
    }

    const onCloseOutletClick = () => {
        // console.log('close');
        setShowTitle('')
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
                                key={uuid()}
                                className='desctop-nav-link-class' 
                                // to={elem.path} 
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
                                {elem.title === showTitle &&
                                    <>
                                    <div className='desctop-nav-oulet-close-div' onClick={onCloseOutletClick}/>
                                    <motion.div 
                                        className='desctop-nav-sublink-div'
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: ANIMATION_TIME_SHORT }}
                                        exit={{opacity: 0}}
                                    >
                                        {elem.subElements && elem.subElements.map(subElem => {
                                            return (
                                                <SubNavMenuElement {...subElem}/>
                                                // <NavLink to={subElem.path}>{subElem.title}</NavLink>
                                            )
                                        })}
                                    </motion.div>
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