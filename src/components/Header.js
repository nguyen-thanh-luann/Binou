import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { BiUser } from 'react-icons/bi'
import { BsCart } from 'react-icons/bs'
import { AiOutlineCaretDown } from 'react-icons/ai'

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
            <Link to={`${userInfo ? '/userInfo' : '/login'}`}>
              <BiUser />
            </Link>
          </li>
          <li>
            <Link to='/cart'>
              <BsCart />
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
                <AiOutlineCaretDown />
              </Link>
              <ul>
                <li>
                  <Link to='/productManager'>Product</Link>
                </li>
                <li>
                  <Link to='/categoryManager'>Category</Link>
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
