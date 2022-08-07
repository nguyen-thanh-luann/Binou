import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { Store } from '../Store'

import '../scss/App.scss'
export default function Header() {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { cart, userInfo } = state

  return (
    <div id='header' bg='dark' variant='dark'>
      <div>
        <Link to='/'>shopping_now</Link>
      </div>
      <div>
        <ul>
          <li>
            {userInfo ? (
              <Link to='/userInfo'>
                <i className='fa-solid fa-user'></i>
              </Link>
            ) : (
              <Link to='/login'>
                <i className='fa-solid fa-user'></i>
              </Link>
            )}
          </li>
          <li>
            <Link to='/cart' className='ms-3'>
              <i className='fa-solid fa-cart-shopping'></i>
              {cart.cartItems.length > 0 && (
                <span className='badge rounded-pill text-bg-danger p-1'>
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </span>
              )}
            </Link>
          </li>
          {userInfo && userInfo.isAdmin && (
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
          )}
        </ul>
      </div>
    </div>
  )
}
