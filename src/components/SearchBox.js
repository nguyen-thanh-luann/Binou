import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import { useNavigate } from 'react-router-dom'

import { FiSearch } from 'react-icons/fi'

export default function SearchBox() {
  const navigate = useNavigate()
  const [query, setQuery] = useState()
  const submitHandler = (e) => {
    e.preventDefault()
    navigate(query ? `/search?name=${query}` : '/')
  }
  return (
    <Form className='d-flex' onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          type='text'
          name='q'
          id='q'
          onChange={(e) => setQuery(e.target.value)}
          placeholder='search product...'
          aria-label='Search Products'
          style={{ border: '2px solid #ccc' }}
        ></FormControl>
        <Button variant='warning' type='submit' id='button-search'>
          <FiSearch />
        </Button>
      </InputGroup>
    </Form>
  )
}
