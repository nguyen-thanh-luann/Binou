import React, { useContext, useState, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { FaSignOutAlt } from 'react-icons/fa'
import { MdUpdate } from 'react-icons/md'

import { update } from '../services/UserService'
import Layout from './Layout'
import LoadingBox from '../components/LoadingBox'
import { Store } from '../Store'
import Style from '../scss/ProfileScreen.module.scss'
import Swal from 'sweetalert2'

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
    }

    update(updateInfo)
      .then((res) => {
        dispatch({
          type: 'UPDATE_SUCCESS',
        })
        setUserName(res.data.name)
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
    <Layout
      children={
        <div className={Style.profilePage}>
          <h2 className={Style.profilePage__title}>Account Infomation</h2>
          <div className='text-center'>
            <div>
              <img
                src={
                  'https://res.cloudinary.com/imthanhluan/image/upload/v1659500844/profileDefault_raklnm.png'
                }
                alt=''
                className='img-fluid'
                style={{ borderRadius: '50%', width: '10rem' }}
              />
            </div>
          </div>
          <div className={Style.infoArea}>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
              <div className='form-group'>
                <label htmlFor='name'>
                  Name{' '}
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
              </div>

              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  id='email'
                  className='form-control'
                  value={email}
                  disabled
                />
              </div>
              <div className='form-group'>
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
              </div>
              <div className='form-group'>
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
              </div>
              {loadingUpdate && <LoadingBox />}
              <button className={Style.updateBtn} type='submit'>
                <MdUpdate className={Style.updateBtn__icon} />
                Update
              </button>
            </form>
            <button
              className={Style.logoutBtn}
              onClick={() => logoutHandler()}
              style={{ marginRight: '1rem' }}
            >
              <FaSignOutAlt className={Style.logoutBtn__icon} />
              Logout
            </button>
          </div>
        </div>
      }
    />
  )
}
