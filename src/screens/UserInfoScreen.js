import React, { useContext, useState } from 'react'

import { Store } from '../Store'
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
    <div className='container my-5 pt-5'>
      <div className='d-flex align-item-center justify-content-center'>
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
          <button
            className='btn btn-danger mt-3 text-center'
            onClick={logoutHandler}
          >
            logout
          </button>
        </div>
        <div className='w-50'>
          <form className='form w-50 ps-5'>
            <div>
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
            <div>
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
            <button className='btn btn-warning form-control mt-3'>
              update
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
