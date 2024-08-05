import { motion } from "framer-motion"
import uuid from "react-uuid"
import { ANIMATION_TIME_SHORT } from "../../store/consts"
import { HotelType } from "../../store/tour-info"

type PropsType = { text: Array<string> }

export const AccordeonHidenText = (props: PropsType) => {
    return (
        <motion.div
            initial={{ opacity: 0}}
            transition={{ duration: ANIMATION_TIME_SHORT }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {props.text.map( p => {
                return (
                    <div key={uuid()}>
                        {p}
                    </div>
                )
            })}
        </motion.div>
    )
}

export type AccordeonHotelsHiddenTextPropsType = {
    data: Array<HotelType | undefined>
}

export const AccordeonHotelsHiddenText = (props: AccordeonHotelsHiddenTextPropsType) => {
    return (
        <motion.div
            initial={{ opacity: 0}}
            transition={{ duration: ANIMATION_TIME_SHORT }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {props.data.map( hotel => {
                return (
                    <div key={uuid()}>
                        <a 
                            href={hotel?.link} 
                            target="_blank"
                            className="my-accordeon-item-link-class"
                        >{hotel?.title}</a>
                    </div>
                )
            })}
        </motion.div>
    )
}