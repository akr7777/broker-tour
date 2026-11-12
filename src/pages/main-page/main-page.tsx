import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from "../../vike/router"
import { AboutUsWidget } from "../../widgets/aboutUs/about-us-widget"
import { FAQ } from "../../widgets/faq/faq"
import { HowToBookWidget } from "../../widgets/how_to_book/how-to-book"
import { OurTour2 } from "../../widgets/our-tour-widget-2/our-tour-2"
import { PriceCalculation2 } from "../../widgets/price-calculation-2/price-calculation-2"

import './main-page-classes.scss'

const MainPage = () => {
    const { t } = useTranslation()
    const location = useLocation()

    useEffect(() => {
        if (!location.hash || typeof document === 'undefined') return

        const timer = window.setTimeout(() => {
            const elem = document.getElementById(location.hash.slice(1, location.hash.length))
            if (elem) {
                elem.scrollIntoView({ behavior: 'smooth'})
            }
        }, 500)

        return () => window.clearTimeout(timer)
    }, [location.hash])
    

    return (
        <>
            <h1 className="main-page-h1">{t('main-page.h1')}</h1>
            <OurTour2 />
            <PriceCalculation2 />

            <div className="main-page-classes-two-cols-block">
                <AboutUsWidget />
                <HowToBookWidget />
            </div>
            
            <FAQ />
        </>
    )
}

export default MainPage