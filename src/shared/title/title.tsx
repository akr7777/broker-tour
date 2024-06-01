import './title.scss'

// import img1 from '../../assets/icons/favicon1.svg'
// import img2 from '../../assets/icons/favicon2.svg'
import { 
    motion, useInView,
    // useTime, useTransform 
} from 'framer-motion'
import { useRef } from 'react'

type PropsType = {
    title: string | undefined
}

export const ArticleTitle = ({title} : PropsType) => {

    // const time = useTime()
    // const rotate = useTransform(
    // time,
    // [0, 4000], // For every 4 seconds...
    // [0, 360], // ...rotate 360deg
    // { clamp: false }
    // )

    // const [titleRef, titleInView] = useInView({
    //     triggerOnce: true,
    //     rootMargin: '-100px 0px',
    //   });

    const ref = useRef(null)
    const isInView = useInView(ref)

    // useEffect(() => {
    //     console.log("Element is in view: ", isInView)
    //   }, [isInView])

    return (
        <motion.div
            className='title-wrapper'

            // initial={{ x: -200 }}
            // animate={{ x: 0 }}
            
            // transition={{ duration: 0.3 }}
            // animate={{ scale: titleInView ? 1 : 0 }}

            ref={ref}

            style={{
                transform: isInView ? "none" : "translateX(-20px)",
                opacity: isInView ? 1 : 0,
                transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.1s"
              }}
        >
            {/* <motion.img 
                alt="" 
                src={img1}
                style={{ rotate }}
            /> */}

            <h2>{title}</h2>

            {/* <motion.img 
                alt="" 
                src={img2}
                style={{ rotate }}
            /> */}
        </motion.div>
    )
}