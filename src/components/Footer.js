import React from 'react'

import FacebookIcon from '@mui/icons-material/Facebook'
import TelegramIcon from '@mui/icons-material/Telegram'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

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
          <FacebookIcon />
        </a>
        <a href='https://t.me/imthanhluan' target='_blank' rel='noreferrer'>
          <TelegramIcon />
        </a>
        <a
          href='https://www.facebook.com/imthanhluann'
          target='_blank'
          rel='noreferrer'
        >
          <TwitterIcon />
        </a>
        <a
          href='https://www.linkedin.com/in/imthanhluann'
          target='_blank'
          rel='noreferrer'
        >
          <LinkedInIcon />
        </a>
      </div>
      <h6 className='mt-3'>Made by Nguyen Thanh Luan</h6>
    </div>
  )
}
