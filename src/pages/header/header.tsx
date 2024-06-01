import { LanguageChanger } from '../../components/languageChanger/languageChanger'
import { useTranslation } from "react-i18next";
import { PATHS } from '../../widgets/nav-menu/nav-paths';
import { DestopNavMenu } from '../../widgets/nav-menu/desctop-nav/desctop-nav';
import { Logo } from '../../shared/logo/logo';
import { ResizeType, useResize } from '../../hooks/use-resize/useResize';
import { MobileNavigation } from '../../widgets/nav-menu/modile-nav/mobile-nav';
import { toursContent } from '../../store/tour-info';

import phoneIcon from '../../assets/icons/phone.png'
import tourIcon from '../../assets/icons/tour.png'
import mainPageIcon from '../../assets/icons/main-page.png'

import './header-classes.scss'
import { DIV_IDS } from '../../store/consts';

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

// console.log('toursConten=', toursContent);

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
        { title: t('nav.nav_tours'), path: PATHS.tourInfo, imagePath: tourIcon, subElements: tourSubElem },
        { title: t('nav.contacts'), path: '#'+DIV_IDS.contacts, imagePath: phoneIcon },
        // { title: "111", path: PATHS.mainPage, imagePath: mainPageIcon },
        // { title: "222", path: PATHS.tours, imagePath: tourIcon, subElements: toursSubElements },
        // { title: "333", path: PATHS.contacts, imagePath: phoneIcon },
    ]
    
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