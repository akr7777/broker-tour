import { ReactNode } from "react"
import { Footer } from "../../pages/footer/footer"
import { Header } from "../../pages/header/header"
// import { ContactFeedbackForm } from "../../widgets/contact-form-feedback/contact-form-feedback"
import { ContactsWidget } from "../../widgets/contacts/contacts"

type PropsType = {
    children: JSX.Element | JSX.Element[] | ReactNode | ReactNode[]
}
export const MainWrapper = (props: PropsType) => {
    return (
        <>
            <Header />

            {props.children}

            {/* <ContactFeedbackForm /> */}
            <ContactsWidget />
            <Footer />
        </>
    )
}