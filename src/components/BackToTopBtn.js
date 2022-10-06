import React, { useState, useEffect } from 'react'

import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined'

import Style from '../scss/BackToTopBtn.module.scss'
export default function BackToTopBtn() {
  const [backToTopBtn, setBackToTopBtn] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setBackToTopBtn(true)
      } else {
        setBackToTopBtn(false)
      }
    })
  })

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div>
      {backToTopBtn && (
        <KeyboardArrowUpOutlinedIcon
          className={Style.backToTopBtn}
          onClick={() => {
            scrollUp()
          }}
        />
      )}
    </div>
  )
}
