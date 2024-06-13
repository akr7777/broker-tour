import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { ToastContainer } from 'react-toastify';
import App from './App.tsx';

import './index.scss'
import './assets/fonts/Montserrat/Montserrat-Italic-VariableFont_wght.ttf'
import './assets/fonts/Montserrat/Montserrat-VariableFont_wght.ttf'
import { Loading } from './shared/loading/loading.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>

      <Provider store={store}>
        <ToastContainer />
        <App />
      </Provider>
    
    </Suspense>

  </React.StrictMode>,
)
