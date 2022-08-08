import React, { useContext, useState } from 'react'

import Layout from './Layout'
import { Store } from '../Store'
import '../scss/App.scss'
export default function UserInfoScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { userInfo } = state

  const [name, setName] = useState(userInfo.name)
  const [email, setEmail] = useState(userInfo.email)

  const logoutHandler = () => {
    if (window.confirm('You want logout?')) {
      ctxDispatch({ type: 'USER_LOGOUT' })
      localStorage.removeItem('userInfo')
      window.location.href = '/login'
    } else {
      return
    }
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
