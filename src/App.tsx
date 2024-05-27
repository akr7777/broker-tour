import { MainPage } from "./pages/main-page/main-page"
import { ToastContainer } from 'react-toastify';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { NotFoundPage } from "./pages/not-found-page/not-found-page";
import { PATHS } from "./widgets/nav-menu/nav-paths";

import './i18/i18init'
import 'react-toastify/dist/ReactToastify.css';
import { ContactPage } from "./pages/contacts/contacts-page";
// import { Tour1 } from "./pages/tours/tour1";
// import { Tour2 } from "./pages/tours/tour2";
import { TourInfoPage } from "./pages/tours/tour-info-page";

export const router = createBrowserRouter([
  {
    path: PATHS.mainPage,
    element: (<MainPage />),
  },
  {
    path: PATHS.contacts,
    element: <ContactPage />
  },
  {
    path: PATHS.tourInfo + '/:tourId',
    element: <TourInfoPage />
  },
  // {
  //   path: PATHS.tour1,
  //   element: <Tour1 />
  // },
  // {
  //   path: PATHS.tour2,
  //   element: <Tour2 />
  // },
  {
    path: '*',
    element: <NotFoundPage />
  }
]);

// createRoot(document.getElementById("root")).render(
//   <RouterProvider router={router} />
// );




function App() {
  return (
    <>
      <ToastContainer />
      {/* <MainPage /> */}
      <RouterProvider router={router} />
    </>
  )
}

export default App
