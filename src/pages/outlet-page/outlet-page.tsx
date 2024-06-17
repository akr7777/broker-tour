import { Outlet } from "react-router-dom"
import { WellcomeFrame } from "../../widgets/wellcome-widget/wellcome-widget"
import { Footer } from "../footer/footer"
import { ContactWidget2 } from "../../widgets/contacts/contacts-2"
import { ButterflyAnimation } from "../../shared/butterfly-animation/buterfly-animation"

export const OutletPage = () => {
    return (
        <div>
            <WellcomeFrame />

            <ButterflyAnimation />

            <Outlet />
            
            <ContactWidget2 />

            <Footer />
        </div>
    )
}