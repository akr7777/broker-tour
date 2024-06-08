import { useLocation } from "react-router-dom"
import { AboutUsWidget } from "../../widgets/aboutUs/about-us-widget"
import { FAQ } from "../../widgets/faq/faq"
import { HowToBookWidget } from "../../widgets/how_to_book/how-to-book"
import { OurTour2 } from "../../widgets/our-tour-widget-2/our-tour-2"
import { PriceCalculation2 } from "../../widgets/price-calculation-2/price-calculation-2"

export const MainPage = () => {

    const location = useLocation()
    
    if (location.hash) {
        setTimeout(() => {
            const elem = document.getElementById(location.hash.slice(1, location.hash.length))
            if (elem) {
                elem.scrollIntoView({ behavior: 'smooth'})
            }
        }, 500)
        
    }
    

    return (
        <>
            <OurTour2 />
            <PriceCalculation2 />

            <AboutUsWidget />
            <HowToBookWidget />
            <FAQ />
        </>
    )
}