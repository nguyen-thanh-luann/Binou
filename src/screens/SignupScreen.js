import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { signup } from '../services/UserService'

export default function SignupScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cnfPassword, setCnfPassword] = useState('')

  const signupHandler = (e) => {
    e.preventDefault()
    if (password === cnfPassword) {
      const user = {
        name,
        email,
        password,
      }
      signup(user)
        .then((res) => {
          console.log(res)
          window.location.href = '/login'
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  return (
    <div className='container my-5'>
      <Helmet>
        <title>Signup</title>
      </Helmet>
      <div className='d-flex justify-content-center'>
        <form className='form w-25'>
          <h1 className='text-center'>Signup</h1>

          <div>
            <label htmlFor='email'>Name</label>
            <input
              id='name'
              className='form-control'
              type='text'
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='mt-2'>
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
          <div className='mt-2'>
            <label htmlFor='cnfpassword'>Confirm password</label>
            <input
              id='cnfpassword'
              className='form-control'
              type='password'
              required
              onChange={(e) => setCnfPassword(e.target.value)}
            />
          </div>
          <button
            type='submit'
            className='form-control btn btn-success mt-2'
            onClick={signupHandler}
          >
            Signup
          </button>
          <div className='mt-3'>
            you already have account?
            <Link to='/login' style={{ textDecoration: 'none' }}>
              {' '}
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
