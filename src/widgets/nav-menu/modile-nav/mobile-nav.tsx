
import { useState } from 'react'
import { NavMenuPropsType } from '../../../pages/header/header'
import uuid from 'react-uuid';
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import burgerMenu from '../../../assets/icons/burger-menu.svg'
import crossIcon from '../../../assets/icons/cross.png'

import './mobile-nav-classes.scss'
import { ANIMATION_TIME, ANIMATION_TIME_SHORT } from '../../../store/consts';
// import { NavLink } from 'react-router-dom'

export const MobileNavigation = (props: NavMenuPropsType) => {
    const navigate = useNavigate()
    const [isShow, setIsShow] = useState<boolean>(false)

    return (
        <nav className='mobile-nav-menu-class'>
            {!isShow && 
                <motion.div 
                    className='mobile-nav-menu-class'
                    initial={{ opacity: 0, y: -50}}
                    animate={{ opacity: 1, y: 0}}
                    transition={{ duration: ANIMATION_TIME }}
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
                {isShow && (

                    <motion.div 
                        className='mobile-nav-menu-outlet-wrapper'
                        initial={{ opacity: 0, y: -50}}
                        animate={{ opacity: 1, y: 0}}
                        transition={{ duration: ANIMATION_TIME_SHORT}}
                        exit={{opacity: 0}}
                    >
                        
                        <AnimatePresence mode="wait" initial={true}>
                            <motion.img
                                src={crossIcon}
                                alt='Close navigation menu'
                                className='mobile-nav-menu-img-div-class'
                                onClick={() => setIsShow(false)}
                                animate={{
                                    // x: 0,
                                    // y: 0,
                                    // scale: 1,
                                    rotate: 360,
                                    
                                }}
                                // transition={{
                                //         opacity: { delay: 1, duration: 1.5 },
                                //         x: { delay: 1, duration: 1.5},
                                //         repeatType: "loop",
                                //         repeatDelay: 5,
                                //       }}
                                
                                whileHover={{ rotate: 90 }}
                                
                                // whileFocus={{ rotate: 360 }}
                                // exit={{ opacity: 0, rotate: 360 }}
                            />
                        </AnimatePresence>


                        <div className='mobile-nav-menu-elements-list'>
                            {props.elements.map(elem => {

                                const onClickHandler = () => {
                                    setIsShow(false)
                                    navigate(elem.path)
                                }

                                return (
                                    <motion.div 
                                        key={uuid()}
                                        className='mobile-nav-menu-element' 
                                        onClick={onClickHandler}

                                        whileHover={{ width: 300 }}
                                        // whileFocus={{ width: 300 }}
                                        whileTap={{ width: 300 }}
                                    >
                                        {elem.title}
                                    </motion.div>
                                )
                            })}
                        </div>
                        
                    </motion.div>
                )}
            </AnimatePresence>


        </nav>
    )
}