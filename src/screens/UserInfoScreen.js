import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Layout from './Layout'
import { Store } from '../Store'
import '../scss/App.scss'
import Swal from 'sweetalert2'
export default function UserInfoScreen() {
  let navigate = useNavigate()
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { userInfo } = state

  const [name, setName] = useState(userInfo.name)
  const [email, setEmail] = useState(userInfo.email)

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
        // window.location.href = '/login'
        navigate('/login')
      }
    })
  }

  return (
    <Layout
      children={
        <div className='user-info-page'>
          <h2 className='page-title'>Account Infomation</h2>
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
          <div className='info-area'>
            <form className='form'>
              <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input
                  id='name'
                  className='form-control'
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  id='email'
                  className='form-control'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                />
              </div>
              <p
                className='text-danger mt-3 logout-btn'
                onClick={() => logoutHandler()}
              >
                Logout
              </p>
            </form>
          </div>
        </div>
      }
    />
  )
}
