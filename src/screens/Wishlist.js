import React from 'react'

import Penguin from '../components/Penguin'
import Footer from '../components/Footer'
import Header from '../components/Header'

import Style from '../scss/Wishlist.module.scss'
export default function Wishlist() {
  return (
    <div>
      <Header />
      <h3
        style={{
          textAlign: 'center',
          color: 'pink',
          fontWeight: 'bold',
          marginTop: '1rem',
        }}
      >
        Comming soon...
      </h3>
      <Penguin />
      <Footer />
    </div>
  )
}
