
import { useState } from 'react'
import { NavMenuPropsType } from '../../../pages/header/header'
import uuid from 'react-uuid';
import { useNavigate } from '../../../vike/router'
import { AnimatePresence, motion } from 'framer-motion'
import { ANIMATION_TIME_SHORT, DIV_IDS, LINE_DEVIDER } from '../../../store/consts';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { setIsMobileMenuOpen } from '../../../store/appSlice';

import burgerMenu from '../../../assets/icons/burger-menu-3-white.svg'
import crossIcon2 from '../../../assets/icons/cross_2.svg'
import { Logo } from '../../../shared/logo/logo';

import './mobile-nav-classes.scss'

export const MobileNavigation = (props: NavMenuPropsType) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isMobileMenuShow: boolean = useAppSelector(state => state.app.isMobileMenuOpen)
    const setIsShow = (value: boolean) => {
        dispatch(setIsMobileMenuOpen(value))
    }

    const onLinkClickHandler = (link: string) => {
        dispatch(setIsMobileMenuOpen(false))

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
    const onShowClickHandler = (title: string) => {
        if (titleShow === title) {
            setTitleShow('')
        } else {
            setTitleShow(title)
        }
    }
    
    const [titleShow, setTitleShow] = useState<string>('')

    return (
        <div className='mobile-nav-menu-class'>
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
                            <Logo isDark={true}/>
                            <AnimatePresence mode="wait" initial={true}>
                                <motion.img
                                    src={crossIcon2}
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
                                    <AnimatePresence mode='wait' key={uuid()}>
                                        <motion.a
                                            key={uuid()}
                                            className='mobile-nav-menu-element'
                                            href={elem.subElements?.[0]?.path ?? elem.path}
                                            onClick={(event) => {
                                                event.preventDefault()
                                                if (elem.subElements) {
                                                    onShowClickHandler(elem.title)
                                                } else {
                                                    onLinkClickHandler(elem.path)
                                                }
                                            }}
                                        >
                                            <img alt='' src={elem.imagePath} />
                                            <div>{elem.title}</div>
                                        </motion.a>

                                        <AnimatePresence mode='wait'>
                                            {titleShow === elem.title && elem.subElements &&
                                                <motion.nav
                                                    initial={{ opacity: 0, x: -150 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: .5 }}
                                                    exit={{opacity: 0, x: 150 }}

                                                    className='mobile-nav-menu-subelem-child-list'
                                                >
                                                    {elem.subElements.map(subElem => {
                                                        return (
                                                            <a
                                                                key={uuid()}
                                                                className='mobile-nav-menu-subelem-child-class'
                                                                href={subElem.path}
                                                                onClick={(event) => {
                                                                    event.preventDefault()
                                                                    onLinkClickHandler(subElem.path)
                                                                }}
                                                            >
                                                                <img alt="" src={elem.imagePath} />
                                                                <div>
                                                                    {subElem.title.split(LINE_DEVIDER).map(p => 
                                                                        <div key={uuid()}>
                                                                            {p}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </a>
                                                        )
                                                    })}
                                                </motion.nav>
                                            }
                                        </AnimatePresence>
                                    </AnimatePresence>
                                )
                            })}
                        </div>
                        
                    </motion.div>
                )}
            </AnimatePresence>


        </div>
    )
}