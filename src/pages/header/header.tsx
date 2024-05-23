import { LanguageChanger } from '../../components/languageChanger/languageChanger'
import { useTranslation } from "react-i18next";
import { PATHS } from '../../widgets/nav-menu/nav-paths';
import { DestopNavMenu } from '../../widgets/nav-menu/desctop-nav/desctop-nav';
import { Logo } from '../../shared/logo/logo';
import { ResizeType, useResize } from '../../hooks/use-resize/useResize';
import { MobileNavigation } from '../../widgets/nav-menu/modile-nav/mobile-nav';

import phoneIcon from '../../assets/icons/phone.png'
import tourIcon from '../../assets/icons/tour.png'
import mainPageIcon from '../../assets/icons/main-page.png'

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

    const toursSubElements: Array<NavMenuElementsType> = [
        { title: t('tours.tour1.title'), description: t('tours.tour1.description'),path: PATHS.tour1, imagePath: mainPageIcon },
        { title: t('tours.tour2.title'), description: t('tours.tour2.description'), path: PATHS.mainPage, imagePath: mainPageIcon },
        { title: t('tours.tour3.title'), description: t('tours.tour3.description'), path: PATHS.mainPage, imagePath: mainPageIcon },
    ]

    const headerNavElements: Array<NavMenuElementsType> = [
        { title: t('nav.main_page'), path: PATHS.mainPage, imagePath: mainPageIcon },
        { title: t('nav.nav_tours'), path: PATHS.tours, imagePath: tourIcon, subElements: toursSubElements },
        { title: t('nav.contacts'), path: PATHS.contacts, imagePath: phoneIcon },
    ]

    console.log('windowSize=', windowSize.width, windowSize.isScreenMd);
    
    
    return (
        <header className='header-wrapper'>
                <Logo />
                
                {
                    windowSize.isScreenMd
                        ? <DestopNavMenu elements={headerNavElements}/>
                        : <MobileNavigation elements={headerNavElements} />
                }
                

                <LanguageChanger />
        </header>
    )
}