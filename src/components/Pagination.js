import React from 'react'

import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai'

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
        className={`pagination-btn ${page <= 1 ? 'disable' : ''}`}
        onClick={() => {
          if (page > 1) {
            handlePageChange(page - 1)
          } else {
            return
          }
        }}
      >
        <AiOutlineDoubleLeft />
      </button>
      {[...Array(pages).keys()].map((x) => (
        <button
          className={`pagination-btn ${x + 1 === page ? 'active' : ''}`}
          key={x}
          onClick={() => handlePageChange(x + 1)}
        >
          {x + 1}
        </button>
      ))}
      <button
        className={`pagination-btn ${page >= pages ? 'disable' : ''}`}
        onClick={() => {
          if (page < pages) {
            handlePageChange(page + 1)
          } else {
            return
          }
        }}
      >
        <AiOutlineDoubleRight />
      </button>
    </div>
  )
}
