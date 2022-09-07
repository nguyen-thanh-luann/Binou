import React from 'react'

export default function Pagination(props) {
  const { pagination, onPageChange } = props
  const { pages } = pagination

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
      {[...Array(pages).keys()].map((x) => (
        <button onClick={() => handlePageChange(x + 1)}>{x + 1}</button>
      ))}
    </div>
  )
}
