import { useTranslation } from 'react-i18next'
import { PATHS } from '../../widgets/nav-menu/nav-paths'
import { localizedPath, LanguagesType } from '../../i18/langs'
import { NavLink } from '../../vike/nav-link'

import './not-found-page-classes.scss'
import clsx from 'clsx'

export const NotFoundPage = () => {
    const {t, i18n} = useTranslation()
    const language = i18n.language as LanguagesType

    return (
        <>
            <div className='not-found-page-wrapper'>
                <h2>{t('not_found_page.title')}</h2>
                <div className={clsx('not-found-page-text-div', 'not-found-page-link-class')}>
                    <div>{t('not_found_page.text')}</div>
                    <NavLink 
                        className={'not-found-page-link-class'}
                        to={localizedPath(PATHS.mainPage, language)}
                    >
                        {t('not_found_page.link_text')}
                    </NavLink>
                </div>
            </div>
        </>
    )
}