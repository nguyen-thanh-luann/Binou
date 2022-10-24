import React, { useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import LoadingBox from '../components/LoadingBox'
import { signup } from '../services/UserService'

import Style from '../scss/RegisterScreen.module.scss'
import Swal from 'sweetalert2'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Button } from '@mui/material'
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
      <div className={Style.page}>
        <form className={Style.form} onSubmit={handleSubmit(onSubmit)}>
          <h1 className='text-center'>Signup</h1>
          <div className={Style.formGroup}>
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
          </div>
          <div className={Style.formGroup}>
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
          </div>
          <div className={Style.formGroup}>
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
          </div>

          <div className={Style.formGroup}>
            <Button type='submit' variant='contained' color='success' fullWidth>
              Signup
            </Button>
            <div className='mt-4 text-center'>
              you already have account?
              <Link to='/login'> Login</Link>
            </div>
          </div>
          <div className='text-center'>{loading && <LoadingBox />}</div>
        </form>
      </div>
      <Footer />
    </div>
  )
}
