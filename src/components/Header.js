import React, { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'

import { Store } from '../Store'
import '../scss/Header.scss'
import SearchBox from './SearchBox'
import { Badge } from '@mui/material'

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
        <Link className='header-icon' to='/cart'>
          <Badge
            badgeContent={cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
            color='warning'
          >
            <ShoppingCartIcon />
          </Badge>
        </Link>
        {userInfo && userInfo.isAdmin && (
          <Link className='header-icon' to='/productManager'>
            <AdminPanelSettingsIcon />
          </Link>
        )}
        <button className='nav-btn' onClick={showNavbar}>
          <MenuIcon />
        </button>
      </div>
    </header>
  )
}
