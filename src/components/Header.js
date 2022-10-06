import React, { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'

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
          <Link to='/men'>Men</Link>
          <Link to='/women'>Women</Link>
          <Link to='/kids'>Kids</Link>
          <Link to='/baby'>Baby</Link>
          <button className='nav-btn nav-close-btn' onClick={showNavbar}>
            <CloseIcon />
          </button>
        </nav>
      </div>

      <div>
        <div className='webSearch'>
          <SearchBox />
        </div>
        <Link to='/' className='header-icon'>
          <FavoriteBorderIcon />
        </Link>
        <Link
          className='header-icon'
          to={`${userInfo ? '/userInfo' : '/login'}`}
        >
          <PersonOutlineIcon />
        </Link>
        <Link
          className='header-icon'
          to='/cart'
          style={{ position: 'relative' }}
        >
          <ShoppingCartIcon />
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
          <MenuIcon />
        </button>
      </div>
    </header>
  )
}
