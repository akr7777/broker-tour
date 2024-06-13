import { lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { NotFoundPage } from "./pages/not-found-page/not-found-page";
import { PATHS } from "./widgets/nav-menu/nav-paths";

// import { TourInfoPage } from "./pages/tours/tour-info-page";
const TourInfoPage = lazy(() => import('./pages/tours/tour-info-page'));
// import { MainPage } from './pages/main-page/main-page';
const MainPage = lazy(() => import('./pages/main-page/main-page'));

import { useTranslation } from "react-i18next";
import { LanguageLC, LanguagesType } from "./i18/langs";
import { Helmet } from "react-helmet";
import { OutletPage } from "./pages/outlet-page/outlet-page";

import './i18/i18init'
import 'react-toastify/dist/ReactToastify.css';
import { Loading } from './shared/loading/loading';


const router = createBrowserRouter([
  {
    path: '/',
    element: <OutletPage />,
    children: [
      {
        // path: PATHS.mainPage,
        element: (
          <Suspense fallback={<Loading />}>
            <MainPage />
          </Suspense>
        ),
        index: true
      },
      {
        path: PATHS.tourInfo + '/:tourId',
        element: (
          <Suspense fallback={<Loading />}>
            <TourInfoPage />
          </Suspense>
        )
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  },
  // {
  //   // path: PATHS.mainPage,
  //   element: (<MainPage />),
  //   index: true
  // },
  // {
  //   path: PATHS.tourInfo + '/:tourId',
  //   element: <TourInfoPage />
  // },
  // {
  //   path: '*',
  //   element: <NotFoundPage />
  // }
]);

function App() {

  const { i18n } = useTranslation();
  const currentLanguageLC: LanguagesType | null = localStorage.getItem(LanguageLC)

  if (currentLanguageLC && i18n.language !== currentLanguageLC) {
      i18n.changeLanguage(currentLanguageLC)
  }
  
  const siteTitle = i18n.t('site_title')
  const siteDescription = i18n.t('site_description')
    
  return (
    <>
      <ToastContainer />
      <Helmet 
        title={siteTitle}
        meta={[
          { "property": "og:description", "content": siteDescription }
        ]}
      />
      <RouterProvider router={router} />
    </>
  )
}

export default App
