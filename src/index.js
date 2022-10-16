import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import { HelmetProvider } from 'react-helmet-async'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'sweetalert2/src/sweetalert2.scss'
import App from './App'
import { StoreProvider } from './Store'
import '../src/scss/App.scss'
import BackToTopBtn from './components/BackToTopBtn'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <App />
        <ToastContainer />
        <BackToTopBtn />
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
)
