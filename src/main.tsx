import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { ToastContainer } from 'react-toastify';
import App from './App.tsx';

import './index.scss'
import './assets/fonts/Montserrat/Montserrat-Italic-VariableFont_wght.ttf'
import './assets/fonts/Montserrat/Montserrat-VariableFont_wght.ttf'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
)
