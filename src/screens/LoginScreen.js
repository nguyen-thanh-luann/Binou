import React, { useState, useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { login } from '../services/UserService'
import { Store } from '../Store'
import Layout from './Layout'
import '../scss/App.scss'
export default function LoginScreen() {
  const { dispatch: ctxDispatch } = useContext(Store)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMessage, setErrMessage] = useState()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const { data } = await login({ email, password })
      ctxDispatch({ type: 'USER_LOGIN', payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
      window.location.href = '/userInfo'
    } catch (err) {
      setErrMessage('Wrong email or password')
    }
  }
  return (
    <Layout
      children={
        <div>
          <Helmet>
            <title>Login</title>
          </Helmet>
          <div className='login-page'>
            <form className='form' onSubmit={submitHandler}>
              <h1 className='text-center'>Login</h1>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  id='email'
                  className='form-control'
                  type='email'
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  id='password'
                  className='form-control'
                  type='password'
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className='form-group'>
                {errMessage && (
                  <p className='text-danger'>
                    {` * `}
                    {errMessage}
                  </p>
                )}
                <input
                  type='submit'
                  className='form-control btn btn-success'
                  value='Login'
                />
                <div className='mt-2'>
                  New customer?
                  <Link to='/signup'> Create your account</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      }
    />
  )
}
