import React from 'react'

// import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'

import Style from '../scss/Pagination.module.scss'
export default function Pagination(props) {
  const { pagination, onPageChange } = props
  const { page, pages } = pagination

  const handlePageChange = (newPage) => {
    // check xem component cha co truyen onPageChange hay khong
    if (onPageChange) {
      onPageChange(newPage)
    }
  }

  return (
    <div>
      <button
        className={`${Style.paginationBtn} ${page <= 1 ? Style.disable : ''}`}
        onClick={() => {
          if (page > 1) {
            handlePageChange(page - 1)
          } else {
            return
          }
        }}
      >
        <KeyboardDoubleArrowLeftIcon />
      </button>
      {[...Array(pages).keys()].map((x) => (
        <button
          className={`${Style.paginationBtn} ${
            x + 1 === page ? Style.active : ''
          }`}
          key={x}
          onClick={() => handlePageChange(x + 1)}
        >
          {x + 1}
        </button>
      ))}
      <button
        className={`${Style.paginationBtn} ${
          page >= pages ? Style.disable : ''
        }`}
        onClick={() => {
          if (page < pages) {
            handlePageChange(page + 1)
          } else {
            return
          }
        }}
      >
        <KeyboardDoubleArrowRightIcon />
      </button>
    </div>
  )
}
