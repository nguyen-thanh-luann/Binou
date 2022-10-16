import React from 'react'
import Header from '../components/Header'
import BackToTopBtn from '../components/BackToTopBtn'
import Footer from '../components/Footer'
import Style from '../scss/Layout.module.scss'
export default function Layout({ children }) {
  return (
    <div className={Style.layout}>
      <Header />

      <div className={Style.layout__children}>{children}</div>
      <BackToTopBtn />
      <Footer />
    </div>
  )
}
