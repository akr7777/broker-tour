import { Outlet } from "react-router-dom"
import { WellcomeFrame } from "../../widgets/wellcome-widget/wellcome-widget"
import { Footer } from "../footer/footer"
import { ContactWidget2 } from "../../widgets/contacts/contacts-2"

export const OutletPage = () => {
    return (
        <div>
            <WellcomeFrame />

            <Outlet />
            
            <ContactWidget2 />

            <Footer />
        </div>
    )
}