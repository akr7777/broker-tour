import { MainWrapper } from "../../shared/main-wrapper/main-wrapper"
import { AboutUsWidget } from "../../widgets/aboutUs/about-us-widget"
import { HowToBookWidget } from "../../widgets/how_to_book/how-to-book"
import { OurTour2 } from "../../widgets/our-tour-widget-2/our-tour-2"
import { PriceCalculation2 } from "../../widgets/price-calculation-2/price-calculation-2"
// import { ToDoAction1 } from "../../widgets/to-do-widget-1/todo-1"
import { WellcomeFrame } from "../../widgets/wellcome-widget/wellcome-widget"
// import { WhyUNeedTour } from "../../widgets/why-u-need-a-tour/why-u-need-a-tour"
// import { ChooseTourPage } from "../choose-tour/choose-tour"
// import { ContactFeedbackForm } from "../../widgets/contact-form-feedback/contact-form-feedback"
// import { ContactsWidget } from "../../widgets/contacts/contacts"
// import { Footer } from "../footer/footer"
// import { Header } from "../header/header"

export const MainPage = () => {
    return (
        <MainWrapper>
            {/* <Header /> */}
            <WellcomeFrame />
            {/* <ChooseTourPage /> */}
            <OurTour2 />
            <PriceCalculation2 />


            {/* <WhyUNeedTour />
            <ToDoAction1 /> */}
            {/* <ContactFeedbackForm /> */}
            {/* <ContactsWidget />
            <Footer /> */}

            <AboutUsWidget />
            <HowToBookWidget />
        </MainWrapper>
    )
}