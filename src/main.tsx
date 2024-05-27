import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { ToastContainer } from 'react-toastify';
import {
  // createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router} />
      {/* <App /> */}
    </Provider>
  </React.StrictMode>,
)
