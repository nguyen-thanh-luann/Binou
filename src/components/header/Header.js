import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { Store } from '../../Store'

import './Header.scss'
export default function Header() {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { userInfo } = state

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
    <div id='header' bg='dark' variant='dark'>
      <div>
        <Link to='/'>shopping_now</Link>
      </div>
      <div>
        <ul>
          {userInfo ? (
            <li>
              <Link to='#'>
                <i className='fa-solid fa-user'></i>
              </Link>
              <ul>
                <li>
                  <Link to='/'>Infomation</Link>
                  <Link to='#logout' onClick={logoutHandler}>
                    logout
                  </Link>
                </li>
              </ul>
            </li>
          ) : (
            <li>
              <Link to='/login'>
                <i className='fa-solid fa-user'></i>
              </Link>
            </li>
          )}
          <li>
            <Link to='/' className='ms-3'>
              <i className='fa-solid fa-cart-shopping'></i>
            </Link>
          </li>
          <li>
            <Link to='/' className='ms-3'>
              Admin
              <i className='fa-solid fa-angle-down ms-1 fs-6'></i>
            </Link>
            <ul>
              <li>
                <Link to='/productManager'>Product</Link>
                <Link to='/'>Category</Link>
                <Link to='/'>Order</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}
