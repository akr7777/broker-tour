
import { 
    motion, useInView,
} from 'framer-motion'
import { ReactNode, useRef } from 'react'
import { LINE_DEVIDER } from '../../store/consts'

import './title.scss'

type PropsType = {
    title: string | undefined
    image?: string
    level?: 'h1' | 'h2' | 'h3' | 'h4'
}

export const ArticleTitle = ({title, image, level = 'h2'} : PropsType) => {
    const ref = useRef(null)
    const isInView = useInView(ref)
    const Tag = level

    const titleText: ReactNode = title && title.includes(LINE_DEVIDER)
        ? (
            <Tag>
                {title.split(LINE_DEVIDER).map((line, index, lines) => (
                    <span key={index}>
                        {line}
                        {index < lines.length - 1 && <br />}
                    </span>
                ))}
            </Tag>
        )
        : <Tag>{title}</Tag>


    return (
        <motion.div
            className='title-wrapper'
            ref={ref}
            style={{
                transform: isInView ? "none" : "translateX(-20px)",
                opacity: 1,
                transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.1s"
              }}
        >

            {image && <img alt="" src={image} />}
            {titleText}

        </motion.div>
    )
}