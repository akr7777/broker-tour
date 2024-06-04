import { motion } from "framer-motion"
import uuid from "react-uuid"
import { ANIMATION_TIME_SHORT } from "../../store/consts"

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