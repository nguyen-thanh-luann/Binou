import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

import Style from '../scss/SearchBox.module.scss'

export default function SearchBox() {
  const navigate = useNavigate()
  const [query, setQuery] = useState()
  const submitHandler = (e) => {
    e.preventDefault()
    navigate(query ? `/search?name=${query}` : '/search')
  }
  return (
    <Form onSubmit={submitHandler} className={Style.searchBox}>
      <input
        type='text'
        onChange={(e) => setQuery(e.target.value)}
        placeholder='search product...'
        className={Style.searchBox__input}
      />
      <button
        type='submit'
        id='button-search'
        className={Style.searchBox__button}
      >
        <SearchOutlinedIcon />
      </button>
    </Form>
  )
}
