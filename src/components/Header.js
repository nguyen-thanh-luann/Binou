import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { Store } from '../Store'
import SearchBox from './SearchBox'
import '../scss/App.scss'
export default function Header() {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { cart, userInfo } = state

  return (
    <div id='header'>
      <div>
        <Link to='/'>shopping_now</Link>
      </div>
      <div>
        <ul>
          <li className='search-group'>
            <SearchBox />
          </li>
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
            <Link to='/cart'>
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
              <Link to='/'>
                Admin
                <i className='fa-solid fa-angle-down ms-1 fs-6'></i>
              </Link>
              <ul>
                <li>
                  <Link to='/productManager'>Product</Link>
                </li>
                <li>
                  <Link to='/'>Category</Link>
                </li>
                <li>
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
