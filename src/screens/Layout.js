import React from 'react'
import Header from '../components/Header'
import BackToTopBtn from '../components/BackToTopBtn'
import Footer from '../components/Footer'

export default function Layout({ children }) {
  return (
    <div className='layout'>
      <Header />
      <div className='children'>{children}</div>
      <BackToTopBtn />
      <Footer />
    </div>
  )
}
