import { motion } from 'framer-motion'
import { ANIMATION_TIME_SUPER_SHORT } from '../../store/consts'

import plus from '../../assets/icons/persons-chooser/plus.png'
import plusDis from '../../assets/icons/persons-chooser/plus-dis.png'
import minus from '../../assets/icons/persons-chooser/minus.png'
import minusDis from '../../assets/icons/persons-chooser/minus-dis.png'

import './persons-count-chooser.scss'

type PersonsCountChooserPropsType = {
    count: number,
    setCount: (count: number) => void,
    maxCount: number,
    minCount: number,
    isMaxPersons: boolean,
}
export const PersonsCountChooser = (props: PersonsCountChooserPropsType) => {
    const isMin: boolean = props.count === props.minCount
    const isMax: boolean = props.isMaxPersons || props.count === props.maxCount

    const minusImg = isMin ? minusDis : minus
    const plusImg = isMax ? plusDis : plus

    const minusClickHandler = () => {
        if (!isMin) {
            props.setCount(props.count - 1)
        }
    }

    const plusClickHandler = () => {
        if (!isMax) {
            props.setCount(props.count + 1)
        }
    }

    return (
        <div className='persons-count-chooser-wrapper'>
            <img alt='' src={minusImg} onClick={minusClickHandler}/>
            <motion.h3
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{ duration: ANIMATION_TIME_SUPER_SHORT }}
                whileHover={{ rotate: 20, scale: 1.5 }}
            >
                {props.count}
            </motion.h3>
            <img alt='' src={plusImg} onClick={plusClickHandler}/>
            {/* {isMax && <label>Достигнуто макс кол-во человек в рамках этого тура</label>} */}
        </div>
    )
}