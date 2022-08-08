import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import Layout from './Layout'
import { signup } from '../services/UserService'

import '../scss/App.scss'
export default function SignupScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    const user = {
      name: data.name,
      email: data.email,
      password: data.password,
    }
    console.log(user)
    signup(user)
      .then(() => {
        if (window.confirm('create your account success!!')) {
          window.location.href = '/login'
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Layout
      children={
        <div>
          <Helmet>
            <title>Signup</title>
          </Helmet>
          <div className='signup-page'>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
              <h1 className='text-center'>Signup</h1>
              <div className='form-group'>
                <label htmlFor='email'>
                  Name{' '}
                  {errors.name && (
                    <span className='text-danger'>
                      *{' '}
                      {errors.name?.type === 'required' &&
                        'This field is required'}
                      {errors.name?.type === 'maxLength' &&
                        'your name too long'}
                      {errors.name?.type === 'minLength' &&
                        'your name too short'}
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
              <div className='form-group'>
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
              <div className='form-group'>
                <label htmlFor='password'>
                  Password{' '}
                  {errors.password && (
                    <span className='text-danger'>
                      *{' '}
                      {errors.password?.type === 'required' &&
                        'This field is required'}
                      {errors.password?.type === 'minLength' &&
                        'Min 6 character'}
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
              <div className='form-group'>
                <input
                  type='submit'
                  className='form-control btn btn-success'
                  value='Signup'
                />
                <div>
                  you already have account?
                  <Link to='/login'> Login</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      }
    />
  )
}
