import React, { useState, useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'

import { login } from '../services/UserService'
import LoadingBox from '../components/LoadingBox'
import { Store } from '../Store'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Box, Button, Typography } from '@mui/material'
export default function LoginScreen() {
  const { dispatch: ctxDispatch } = useContext(Store)

  let navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMessage, setErrMessage] = useState()

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await login({ email, password })
      ctxDispatch({ type: 'USER_LOGIN', payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
      setLoading(false)

      navigate('/userInfo')
    } catch (err) {
      setErrMessage('Wrong email or password')
      setLoading(false)
    }
  }
  return (
    <div>
      <Header />
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Box
        sx={{
          padding: '2rem 0',
          margin: '0 auto',
          width: {
            xs: '90%',
            sm: '70%',
            md: '50%',
          },
        }}
      >
        <form onSubmit={submitHandler}>
          <Typography sx={{ textAlign: 'center', fontSize: '2rem' }}>
            Login
          </Typography>
          <Box>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              className='form-control'
              type='email'
              required
              onChange={(e) => {
                setEmail(e.target.value)
                setErrMessage()
              }}
            />
          </Box>
          <Box mt={2}>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              className='form-control'
              type='password'
              required
              onChange={(e) => {
                setPassword(e.target.value)
                setErrMessage()
              }}
            />
          </Box>
          <Box>
            {errMessage && errMessage !== '' && (
              <Typography sx={{ color: 'red' }} mt={1}>
                {` * `}
                {errMessage}
              </Typography>
            )}

            <Box mt={2}>
              <Button
                type='submit'
                variant='contained'
                color='success'
                fullWidth
              >
                Login
              </Button>
            </Box>
            <Box sx={{ textAlign: 'center' }} mt={2}>
              New customer?
              <Link
                style={{
                  textDecoration: 'none',
                  color: 'purple',
                  fontWeight: 'bold',
                }}
                to='/signup'
              >
                {' '}
                Create your account
              </Link>
            </Box>
            <Box sx={{ textAlign: 'center' }}>{loading && <LoadingBox />}</Box>
          </Box>
        </form>
      </Box>
      <Footer />
    </div>
  )
}
