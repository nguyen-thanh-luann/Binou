import React, { useContext, useState, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import UpdateIcon from '@mui/icons-material/Update'
import LogoutIcon from '@mui/icons-material/Logout'

import { update } from '../services/UserService'
import LoadingBox from '../components/LoadingBox'
import { Store } from '../Store'
import Swal from 'sweetalert2'
import { Helmet } from 'react-helmet-async'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Box, Button, Grid, Typography } from '@mui/material'

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true }
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false }
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false }

    default:
      return state
  }
}

export default function UserInfoScreen() {
  let navigate = useNavigate()
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { userInfo } = state

  const [email] = useState(userInfo.email)
  const [phone, setPhone] = useState(userInfo.phone)
  const [address, setAddress] = useState(userInfo.address)
  const [userName, setUserName] = useState(userInfo.name)

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  })

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    dispatch({
      type: 'UPDATE_REQUEST',
    })
    const updateInfo = {
      id: userInfo._id,
      name: data.name,
      password: data.password,
      phone: data.phone,
      address: data.address,
    }

    update(updateInfo)
      .then((res) => {
        dispatch({
          type: 'UPDATE_SUCCESS',
        })
        setUserName(res.data.name)
        setPhone(res.data.phone)
        setAddress(res.data.address)
        localStorage.setItem('userInfo', JSON.stringify(res.data))
        ctxDispatch({ type: 'USER_LOGIN', payload: res.data })
        reset()
        Swal.fire({
          icon: 'success',
          title: 'Update Success!',
          showCancelButton: false,
          timer: 1000,
        })
      })
      .catch((err) => {
        dispatch({
          type: 'FETCH_FAIL',
        })
        console.log(err)
      })
  }

  const logoutHandler = () => {
    Swal.fire({
      icon: 'warning',
      title: 'You want to logout?',
      showCancelButton: true,
      cancelButtonColor: 'red',
      cancelButtonText: 'Cancel',
      confirmButtonColor: 'rgba(0,0,0,0.6)',
      confirmButtonText: 'Logout',
    }).then((result) => {
      if (result.isConfirmed) {
        ctxDispatch({ type: 'USER_LOGOUT' })
        localStorage.removeItem('userInfo')

        navigate('/login')
      }
    })
  }

  return (
    <>
      <Header />
      <Helmet>
        <title>Binou - Profile</title>
      </Helmet>
      <Box
        p={2}
        sx={{
          margin: '0 auto',
          width: {
            xs: '100%',
            sm: '80%',
            md: '70%',
          },
        }}
      >
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                textAlign: 'center',
                margin: '0 auto',
                width: {
                  xs: '60%',
                  sm: '30%',
                  md: '25%',
                },
              }}
            >
              <img
                src='https://res.cloudinary.com/imthanhluan/image/upload/v1659500844/profileDefault_raklnm.png'
                alt='profile'
                style={{ width: '100%', borderRadius: '50%' }}
              />
            </Box>
            <Grid container spacing={4} mt={2}>
              <Grid item xs={12} md={6}>
                <Box>
                  <label htmlFor='name'>
                    Name
                    {errors.name && (
                      <span className='text-danger'>
                        *{' '}
                        {errors.name?.type === 'required' &&
                          'This field is required'}
                        {errors.name?.type === 'maxLength' &&
                          'your name is too long'}
                        {errors.name?.type === 'minLength' &&
                          'your name is too short'}
                      </span>
                    )}
                  </label>
                  <input
                    id='name'
                    className='form-control'
                    defaultValue={userName}
                    {...register('name', {
                      required: true,
                      maxLength: 30,
                      minLength: 1,
                    })}
                  />
                </Box>
                <Box mt={2}>
                  <label htmlFor='email'>Email</label>
                  <input
                    id='email'
                    className='form-control'
                    value={email}
                    disabled
                  />
                </Box>
                <Box mt={2}>
                  <label htmlFor='phone'>
                    Phone number
                    {errors.phone && (
                      <span className='text-danger'>
                        *{' '}
                        {errors.phone?.type === 'minLength' &&
                          'invalid phone number'}
                      </span>
                    )}
                  </label>
                  <input
                    id='phone'
                    className='form-control'
                    type='text'
                    defaultValue={phone}
                    {...register('phone', {
                      minLength: 10,
                    })}
                  />
                </Box>
                <Box mt={2}>
                  <label htmlFor='address'>Address</label>
                  <textarea
                    id='address'
                    className='form-control'
                    type='text'
                    defaultValue={address}
                    style={{ height: '8rem' }}
                    {...register('address')}
                  ></textarea>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <label htmlFor='password'>
                    Password{' '}
                    {errors.password && (
                      <span className='text-danger'>
                        *{' '}
                        {errors.password?.type === 'minLength' &&
                          'your password is too short'}
                      </span>
                    )}
                  </label>
                  <input
                    id='password'
                    className='form-control'
                    type='password'
                    {...register('password', {
                      minLength: 6,
                    })}
                  />
                </Box>
                <Box mt={2}>
                  <label htmlFor='cfnPassword'>
                    Confirm password{' '}
                    {errors.cfnPassword && (
                      <span className='text-danger'>
                        *{' '}
                        {errors.cfnPassword?.type === 'validate' &&
                          'your password do not match'}
                      </span>
                    )}
                  </label>
                  <input
                    id='cfnPassword'
                    className='form-control'
                    type='password'
                    {...register('cfnPassword', {
                      validate: (value) => {
                        return (
                          value === watch('password') ||
                          'Your password do not match'
                        )
                      },
                    })}
                  />
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ textAlign: 'center' }}>
              {loadingUpdate && <LoadingBox />}
            </Box>
            <Box
              mt={2}
              sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              <Button
                startIcon={<UpdateIcon />}
                variant='contained'
                color='secondary'
                type='submit'
                sx={{
                  width: {
                    xs: '100%',
                    md: '30%',
                  },
                }}
              >
                Update
              </Button>
              <Button
                startIcon={<LogoutIcon />}
                variant='outlined'
                color='error'
                onClick={() => {
                  logoutHandler()
                }}
                sx={{
                  width: {
                    xs: '100%',
                    md: '30%',
                  },
                }}
              >
                Logout
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
      <Footer />
    </>
  )
}

/*
           


*/
