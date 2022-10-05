import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'

import { FiSearch } from 'react-icons/fi'

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
        <FiSearch />
      </button>
    </Form>
  )
}
