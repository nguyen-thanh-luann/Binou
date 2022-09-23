import React from 'react'

import {
  FaFacebookF,
  FaTelegramPlane,
  FaTwitter,
  FaLinkedinIn,
} from 'react-icons/fa'

import Style from '../scss/Footer.module.scss'
export default function Footer() {
  return (
    <div className={Style.footer}>
      <h2 className='mb-4'>Follow Me!</h2>
      <div>
        <a
          href='https://www.facebook.com/imthanhluann'
          target='_blank'
          rel='noreferrer'
        >
          <FaFacebookF />
        </a>
        <a href='https://t.me/imthanhluan' target='_blank' rel='noreferrer'>
          <FaTelegramPlane />
        </a>
        <a
          href='https://www.facebook.com/imthanhluann'
          target='_blank'
          rel='noreferrer'
        >
          <FaTwitter />
        </a>
        <a
          href='https://www.linkedin.com/in/imthanhluann'
          target='_blank'
          rel='noreferrer'
        >
          <FaLinkedinIn />
        </a>
      </div>
      <h6 className='mt-3'>Made by Nguyen Thanh Luan</h6>
    </div>
  )
}
