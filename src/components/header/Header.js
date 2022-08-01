import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

export default function Header() {
  return (
    <div id='header' bg='dark' variant='dark'>
      <div>
        <Link to='/'>shopping_now</Link>
      </div>
      <div>
        <ul>
          <li>
            <Link to='/'>
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
