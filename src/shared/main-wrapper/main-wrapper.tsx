import { ReactNode } from "react"
import { Footer } from "../../pages/footer/footer"
// import { Header } from "../../pages/header/header"
// import { ContactFeedbackForm } from "../../widgets/contact-form-feedback/contact-form-feedback"
// import { ContactsWidget } from "../../widgets/contacts/contacts"
import { ContactWidget2 } from "../../widgets/contacts/contacts-2"
import { WellcomeFrame } from "../../widgets/wellcome-widget/wellcome-widget"

type PropsType = {
    children: JSX.Element | JSX.Element[] | ReactNode | ReactNode[]
}
export const MainWrapper = (props: PropsType) => {
    return (
        <>
            {/* <Header /> */}
            <WellcomeFrame />

            {props.children}

            {/* <ContactFeedbackForm /> */}
            {/* <ContactsWidget /> */}
            <ContactWidget2 />

            <Footer />
        </>
    )
}