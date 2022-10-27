import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import LoadingBox from '../components/LoadingBox'
import { signup } from '../services/UserService'

import Swal from 'sweetalert2'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Box, Button, Typography } from '@mui/material'
export default function SignupScreen() {
  const [loading, setLoading] = useState(false)

  let navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    setLoading(true)
    const user = {
      name: data.name,
      email: data.email,
      password: data.password,
    }
    signup(user)
      .then(() => {
        setLoading(false)
        Swal.fire({
          icon: 'success',
          title: 'Create account success!!!',
          showConfirmButton: false,
          timer: 1000,
        })
        navigate('/login')
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        toast.error('Account already exists!', {
          position: 'bottom-left',
        })
        reset()
      })
  }

  return (
    <div>
      <Header />
      <Helmet>
        <title>Signup</title>
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography sx={{ textAlign: 'center', fontSize: '2rem' }}>
            Signup
          </Typography>
          <Box>
            <label htmlFor='email'>
              Name{' '}
              {errors.name && (
                <span className='text-danger'>
                  *{' '}
                  {errors.name?.type === 'required' && 'This field is required'}
                  {errors.name?.type === 'maxLength' && 'your name too long'}
                  {errors.name?.type === 'minLength' && 'your name too short'}
                </span>
              )}
            </label>
            <input
              id='name'
              className='form-control'
              type='text'
              {...register('name', {
                required: true,
                maxLength: 50,
                minLength: 2,
              })}
            />
          </Box>
          <Box mt={2}>
            <label htmlFor='email'>
              Email{' '}
              {errors.email && (
                <span className='text-danger'>
                  *{' '}
                  {errors.email?.type === 'required' &&
                    'This field is required'}
                </span>
              )}
            </label>
            <input
              id='email'
              className='form-control'
              type='email'
              {...register('email', { required: true })}
            />
          </Box>
          <Box mt={2}>
            <label htmlFor='password'>
              Password{' '}
              {errors.password && (
                <span className='text-danger'>
                  *{' '}
                  {errors.password?.type === 'required' &&
                    'This field is required'}
                  {errors.password?.type === 'minLength' && 'Min 6 character'}
                </span>
              )}
            </label>
            <input
              id='password'
              className='form-control'
              type='password'
              {...register('password', { required: true, minLength: 6 })}
            />
          </Box>

          <Box mt={2}>
            <Button
              type='submit'
              variant='contained'
              color='secondary'
              fullWidth
            >
              Signup
            </Button>
            <Box sx={{ textAlign: 'center' }} mt={2}>
              you already have account?{' '}
              <Link
                to='/login'
                style={{
                  color: 'purple',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                }}
              >
                Login
              </Link>
            </Box>
          </Box>
          <Box sx={{ textAlign: 'center' }}>{loading && <LoadingBox />}</Box>
        </form>
      </Box>
      <Footer />
    </div>
  )
}
