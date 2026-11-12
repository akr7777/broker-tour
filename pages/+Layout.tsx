import { useEffect, useMemo, type ReactNode } from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { usePageContext } from 'vike-react/usePageContext'
import { WellcomeFrame } from '../src/widgets/wellcome-widget/wellcome-widget'
import { ButterflyAnimation } from '../src/shared/butterfly-animation/buterfly-animation'
import { ContactWidget2 } from '../src/widgets/contacts/contacts-2'
import { Footer } from '../src/pages/footer/footer'
import { store } from '../src/store/store'
import '../index.css'
import '../src/index.scss'
import '../src/assets/fonts/Montserrat/Montserrat-Italic-VariableFont_wght.ttf'
import '../src/assets/fonts/Montserrat/Montserrat-VariableFont_wght.ttf'
import { I18nextProvider } from 'react-i18next'
import { createI18n } from '../src/i18/i18-config'
import { useNavigate } from '../src/vike/router'
import { LanguageLC, getRootRedirectLanguage, localizedPath } from '../src/i18/langs'

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  const pageContext = usePageContext()
  const navigate = useNavigate()
  const language = pageContext.routeParams.lang ?? 'ru'
  const i18n = useMemo(() => createI18n(language), [language])

  useEffect(() => {
    if (pageContext.urlPathname !== '/') return

    const redirectLanguage = getRootRedirectLanguage(localStorage.getItem(LanguageLC))
    if (redirectLanguage) {
      navigate(localizedPath('/', redirectLanguage))
    }
  }, [pageContext.urlPathname, navigate])

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
      <div id="index-preloader" className="index-preloader-outlet">
        <div className="index-preloader-class"></div>
      </div>
      <ToastContainer />
      <WellcomeFrame />
      <ButterflyAnimation />
      {children}
      <ContactWidget2 />
      <Footer />
      </Provider>
    </I18nextProvider>
  )
}
