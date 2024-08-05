import { LanguageChanger } from '../../components/languageChanger/languageChanger'
import { useTranslation } from "react-i18next";
import { PATHS } from '../../widgets/nav-menu/nav-paths';
import { DestopNavMenu } from '../../widgets/nav-menu/desctop-nav/desctop-nav';
import { Logo } from '../../shared/logo/logo';
import { ResizeType, useResize } from '../../hooks/use-resize/useResize';
import { MobileNavigation } from '../../widgets/nav-menu/modile-nav/mobile-nav';
import { toursContent } from '../../store/tour-info';
import { DIV_IDS, NAV_MENU_BREAKPOINT } from '../../store/consts';

import mainPageIcon from '../../assets/icons/menu/home_page.png'
import phoneIcon from '../../assets/icons/menu/contacts.png'
import toursIcon from '../../assets/icons/menu/tours.png'
import faqImage from '../../assets/icons/menu/faq-2.png'
import aboutUsIcon from '../../assets/icons/menu/about_us.png'
import bookingIcon from '../../assets/icons/menu/booking.png'

import './header-classes.scss'

export type NavMenuElementsType = {
    title: string,
    path: string,
    imagePath: string,
    subElements?: Array<NavMenuElementsType>,
    description?: string
}
export type NavMenuPropsType = {
    elements: Array<NavMenuElementsType>
}


// export const HEADER_DIV_ID = 'header_element'

export const Header = () => {

    const { t } = useTranslation()
    const windowSize: ResizeType = useResize()

    // const toursSubElements: Array<NavMenuElementsType> = [
    //     { title: t('tours.tour1.title'), description: t('tours.tour1.description'),path: PATHS.tour1, imagePath: mainPageIcon },
    //     { title: t('tours.tour2.title'), description: t('tours.tour2.description'), path: PATHS.tour2, imagePath: mainPageIcon },
    //     { title: t('tours.tour3.title'), description: t('tours.tour3.description'), path: PATHS.mainPage, imagePath: mainPageIcon },
    // ]

    const tourSubElem: Array<NavMenuElementsType> = toursContent().map(t => {
        return {
            title: t.title, description: t.description, path: t.urlPath, imagePath: t.tourIcon
        }
    })

    const headerNavElements: Array<NavMenuElementsType> = [
        { title: t('nav.main_page'), path: PATHS.mainPage, imagePath: mainPageIcon },
        { title: t('nav.nav_tours'), path: PATHS.tourInfo, imagePath: toursIcon, subElements: tourSubElem },
        { title: t('nav.contacts'), path: '#'+DIV_IDS.contacts, imagePath: phoneIcon },
        
        
        { title: t('nav.how_to_book'), path: PATHS.mainPage + '#'+DIV_IDS.howToBook, imagePath: bookingIcon },
        { title: t('nav.about_us'), path: PATHS.mainPage + '#'+DIV_IDS.aboutUs, imagePath: aboutUsIcon },
        // { title: t('nav.faq'), path: PATHS.mainPage + '#' + DIV_IDS.faq, imagePath: faqImage },

        { title: t('nav.faq'), path: PATHS.separateFaqPage, imagePath: faqImage },
    ]
    
    return (
        <>
        <header className='header-wrapper'>

                
                <Logo />
                
                {
                    windowSize.width > NAV_MENU_BREAKPOINT
                        ? <DestopNavMenu elements={headerNavElements}/>
                        : <MobileNavigation elements={headerNavElements} />
                }

                <LanguageChanger />
        </header>
        </>

    )
}