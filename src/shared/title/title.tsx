
import { 
    motion, useInView,
} from 'framer-motion'
import { ReactNode, useRef } from 'react'
import { LINE_DEVIDER } from '../../store/consts'
import uuid from 'react-uuid'

import './title.scss'

type PropsType = {
    title: string | undefined
}

export const ArticleTitle = ({title} : PropsType) => {
    const ref = useRef(null)
    const isInView = useInView(ref)
    
    const titleText: ReactNode = title && title.includes(LINE_DEVIDER)
        ? <>{title.split(LINE_DEVIDER).map(line => <h2 key={uuid()}>{line}</h2>)}</>
        : <h2>{title}</h2>

    return (
        <motion.div
            className='title-wrapper'
            ref={ref}
            style={{
                transform: isInView ? "none" : "translateX(-20px)",
                opacity: isInView ? 1 : 0,
                transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.1s"
              }}
        >
           
            {titleText}

        </motion.div>
    )
}