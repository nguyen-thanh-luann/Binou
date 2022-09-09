import React from 'react'

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
      {/* <button disabled={page <= 1} onClick={() => handlePageChange(page - 1)}>
        Prev
      </button>
      <button
        disabled={page >= pages}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button> */}
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
        <i className='fa-solid fa-angle-left'></i>
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
        <i className='fa-solid fa-angle-right'></i>
      </button>
    </div>
  )
}
