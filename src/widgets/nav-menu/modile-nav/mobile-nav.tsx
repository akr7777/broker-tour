
import { useState } from 'react'
import { NavMenuPropsType } from '../../../pages/header/header'
import uuid from 'react-uuid';
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import burgerMenu from '../../../assets/icons/burger-menu.svg'
import crossIcon from '../../../assets/icons/cross.png'

import './mobile-nav-classes.scss'
import { ANIMATION_TIME_SHORT } from '../../../store/consts';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { setIsMobileMenuOpen } from '../../../store/appSlice';
import { Logo } from '../../../shared/logo/logo';
// import { NavLink } from 'react-router-dom'

export const MobileNavigation = (props: NavMenuPropsType) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    // const [isShow, setIsShow] = useState<boolean>(false)
    const isMobileMenuShow: boolean = useAppSelector(state => state.app.isMobileMenuOpen)
    const setIsShow = (value: boolean) => {
        dispatch(setIsMobileMenuOpen(value))
    }

    const onLinkClickHandler = (link: string) => {
        dispatch(setIsMobileMenuOpen(false))
        navigate(link)
    }
    const onShowClickHandler = (title: string) => {
        if (titleShow === title) {
            setTitleShow('')
        } else {
            setTitleShow(title)
        }
    }
    
    const [titleShow, setTitleShow] = useState<string>('')

    return (
        <nav className='mobile-nav-menu-class'>
            {!isMobileMenuShow && 
                <motion.div 
                    className='mobile-nav-menu-class'
                    initial={{ opacity: 0, y: -50}}
                    animate={{ opacity: 1, y: 0}}
                    transition={{ duration: ANIMATION_TIME_SHORT }}
                    exit={{opacity: 0}}
                >
                    <img 
                        src={burgerMenu} 
                        alt='Open navigation menu' 
                        onClick={() => setIsShow(true)}
                        className='mobile-nav-menu-img'
                    />
                </motion.div>
            }

            <AnimatePresence mode="wait" initial={false}>
                {isMobileMenuShow && (

                    <motion.div 
                        className='mobile-nav-menu-outlet-wrapper'
                        initial={{ opacity: 0, y: -50}}
                        animate={{ opacity: 1, y: 0}}
                        transition={{ duration: ANIMATION_TIME_SHORT}}
                        exit={{opacity: 0}}
                    >
                        
                        <div className='mobile-nav-menu-logo-close-div '>
                            <Logo />
                            <AnimatePresence mode="wait" initial={true}>
                                <motion.img
                                    src={crossIcon}
                                    alt='Close navigation menu'
                                    className='mobile-nav-menu-img-div-class'
                                    onClick={() => setIsShow(false)}
                                    animate={{ rotate: 360 }}
                                    whileHover={{ rotate: 90 }}
                                />
                            </AnimatePresence>
                        </div>
                        


                        <div className='mobile-nav-menu-elements-list'>
                            {props.elements.map(elem => {
                                return (
                                    <AnimatePresence>
                                    <motion.div 
                                        key={uuid()}
                                        className='mobile-nav-menu-element' 
                                        onClick={
                                            elem.subElements
                                                ? () => onShowClickHandler(elem.title)
                                                : () => onLinkClickHandler(elem.path)
                                            }

                                        whileHover={{ width: 300 }}
                                        // whileFocus={{ width: 300 }}
                                        whileTap={{ width: 300 }}
                                    >
                                        <img alt='' src={elem.imagePath} />
                                        <div>{elem.title}</div>
                                    </motion.div>

                                    <AnimatePresence>
                                        {titleShow && elem.subElements &&
                                            <motion.div
                                                // className='mobile-nav-menu-elements-list'
                                                initial={{ opacity: 0, x: -150 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5 }}
                                                exit={{opacity: 0, x: 150}}

                                                className='mobile-nav-menu-subelem-child-list'
                                            >
                                                {elem.subElements.map(subElem => {
                                                    return (
                                                        <motion.div 
                                                            key={uuid()}
                                                            className='mobile-nav-menu-subelem-child-class'
                                                            onClick={() => onLinkClickHandler(subElem.path)}
                                                        >
                                                            {subElem.title}
                                                        </motion.div>
                                                    )
                                                })}
                                            </motion.div>
                                        }
                                    </AnimatePresence>
                                    </AnimatePresence>
                                )
                            })}
                        </div>
                        
                    </motion.div>
                )}
            </AnimatePresence>


        </nav>
    )
}