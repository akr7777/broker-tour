import { useTranslation } from 'react-i18next'
import { PATHS } from '../../widgets/nav-menu/nav-paths'
import { NavLink } from 'react-router-dom'

import './not-found-page-classes.scss'
import clsx from 'clsx'

export const NotFoundPage = () => {
    const {t} = useTranslation()

    return (
        <>
            <div className='not-found-page-wrapper'>
                <h2>{t('not_found_page.title')}</h2>
                <div className={clsx('not-found-page-text-div', 'not-found-page-link-class')}>
                    <div>{t('not_found_page.text')}</div>
                    <NavLink 
                        className={'not-found-page-link-class'}
                        to={PATHS.mainPage}
                    >
                        {t('not_found_page.link_text')}
                    </NavLink>
                </div>
            </div>
        </>
    )
}