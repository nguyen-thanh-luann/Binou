import React, { useState, useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { login } from '../services/UserService'
import { Store } from '../Store'
export default function LoginScreen() {
  const { dispatch: ctxDispatch } = useContext(Store)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const { data } = await login({ email, password })
      ctxDispatch({ type: 'USER_LOGIN', payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
      window.location.href = '/userInfo'
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='container my-5'>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className='d-flex justify-content-center'>
        <form className='form w-25' onSubmit={submitHandler}>
          <h1 className='text-center'>Login</h1>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              className='form-control'
              type='email'
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mt-2'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              className='form-control'
              type='password'
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type='submit'
            className='form-control btn btn-success mt-2'
            value='Login'
          />

          <div className='mt-3'>
            New customer?
            <Link to='/signup' style={{ textDecoration: 'none' }}>
              {' '}
              Create your account
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
