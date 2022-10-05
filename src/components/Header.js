import React, { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'

import { FaBars, FaTimes } from 'react-icons/fa'
import { AiOutlineUser, AiOutlineHeart } from 'react-icons/ai'
import { BsCart } from 'react-icons/bs'

import { Store } from '../Store'
import '../scss/Header.scss'
import { DropdownButton } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
export default function Head() {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { cart, userInfo } = state
  const navRef = useRef()

  const showNavbar = () => {
    navRef.current.classList.toggle('responsive_header')
  }
  return (
    <header>
      <div>
        <Link to='/' className='logo'>
          Binou
        </Link>
        <nav ref={navRef}>
          <Link to='/'>Home</Link>
          <Link to='/'>Men</Link>
          <Link to='/'>Women</Link>
          <Link to='/'>Kids</Link>
          <Link to='/'>Baby</Link>
          <button className='nav-btn nav-close-btn' onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
      </div>

      <div>
        <div className='webSearch'>
          <SearchBox />
        </div>
        <Link to='/'>
          <AiOutlineHeart className='header-icon' />
        </Link>
        <Link
          className='header-icon'
          to={`${userInfo ? '/userInfo' : '/login'}`}
        >
          <AiOutlineUser />
        </Link>
        <Link
          to='/cart'
          className='header-icon'
          style={{ position: 'relative' }}
        >
          <BsCart />
          {cart.cartItems.length > 0 && (
            <span
              className='translate-middle bg-danger text-light rounded-circle'
              style={{
                fontSize: '0.6rem',
                padding: '0.1rem 0.25rem',
                fontWeight: 'bold',
                position: 'absolute',
                top: '10px',
              }}
            >
              {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
            </span>
          )}
        </Link>
        {userInfo && userInfo.isAdmin && (
          <DropdownButton
            style={{ marginLeft: '1rem' }}
            align='end'
            title='Admin'
            variant='secondary'
          >
            <Dropdown.Item>
              <Link to='/productManager' style={{ width: '100%' }}>
                Product
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>Customer</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Logout</Dropdown.Item>
          </DropdownButton>
        )}
        <button className='nav-btn' onClick={showNavbar}>
          <FaBars />
        </button>
      </div>
    </header>
  )
}
