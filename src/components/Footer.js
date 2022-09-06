import React from 'react'

import '../scss/App.scss'
export default function Footer() {
  return (
    <div className='footer'>
      <h2 className='mb-4'>Follow Me!</h2>
      <div>
        <a
          href='https://www.facebook.com/imthanhluann'
          target='_blank'
          rel='noreferrer'
        >
          <i className='fa-brands fa-square-facebook'></i>
        </a>
        <a href='https://t.me/imthanhluan' target='_blank' rel='noreferrer'>
          <i className='fa-brands fa-telegram'></i>
        </a>
        <a
          href='https://www.facebook.com/imthanhluann'
          target='_blank'
          rel='noreferrer'
        >
          <i className='fa-brands fa-twitter'></i>
        </a>
        <a
          href='https://www.facebook.com/imthanhluann'
          target='_blank'
          rel='noreferrer'
        >
          <i className='fa-brands fa-tiktok'></i>
        </a>
      </div>
      <h6 className='mt-3'>Made by Nguyen Thanh Luan</h6>
    </div>
  )
}
