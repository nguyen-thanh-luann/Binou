import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import Layout from './Layout'
import { signup } from '../services/UserService'

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
          <div className='d-flex justify-content-center'>
            <form className='form w-25' onSubmit={handleSubmit(onSubmit)}>
              <h1 className='text-center'>Signup</h1>

              <div>
                <label htmlFor='email' className='fw-bold'>
                  Name{' '}
                  {errors.name && (
                    <span className='text-danger'>
                      *
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
              <div className='mt-2'>
                <label htmlFor='email' className='fw-bold'>
                  Email{' '}
                  {errors.email && (
                    <span className='text-danger'>
                      *
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
              <div className='mt-2'>
                <label htmlFor='password' className='fw-bold'>
                  Password{' '}
                  {errors.password && (
                    <span className='text-danger'>
                      *
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
              <input
                type='submit'
                className='form-control btn btn-success mt-2'
                value='Signup'
              />

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
      }
    />
  )
}
