import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import CheckroomIcon from '@mui/icons-material/Checkroom'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'

import { Store } from '../Store'
import SearchBox from './SearchBox'
import { Badge, Button, Menu, MenuItem } from '@mui/material'
import Style from '../scss/Header.module.scss'

export default function Header() {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { cart, userInfo } = state
  const [showNavbar, setShowNavbar] = useState(false)
  const [anchorAdminMenu, setAnchorAdminMenu] = useState(null)
  const openAdminMenu = Boolean(anchorAdminMenu)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  const handleOpenAdminMenu = (e) => {
    setAnchorAdminMenu(e.currentTarget)
  }

  const handleCloseAdminMenu = () => {
    setAnchorAdminMenu(null)
  }

  return (
    <header>
      <div>
        <Link to='/' className={Style.logo}>
          BINOU
        </Link>
        <nav className={showNavbar ? Style.responsiveHeader : ''}>
          <Link to='/men'>MEN</Link>
          <Link to='/women'>WOMEN</Link>
          <Link to='/kids'>KIDS</Link>
          <Link to='/baby'>BABY</Link>
          <button
            className={`${Style.navBtn} ${Style.navBtnClose}`}
            onClick={handleShowNavbar}
          >
            <CloseIcon />
          </button>
        </nav>
      </div>

      <div>
        <div className={Style.webSearch}>
          <SearchBox />
        </div>
        <Link to='/wishlist' className={Style.headerIcon}>
          <Badge
            badgeContent={
              userInfo.wishlist.length ? userInfo.wishlist.length : 0
            }
            color='error'
          >
            <FavoriteBorderIcon />
          </Badge>
        </Link>
        <Link
          className={Style.headerIcon}
          to={`${userInfo ? '/userInfo' : '/login'}`}
        >
          <PersonOutlineIcon />
        </Link>
        <Link className={Style.headerIcon} to='/cart'>
          <Badge badgeContent={cart.cartItems.length} color='error'>
            <ShoppingCartIcon />
          </Badge>
        </Link>
        {userInfo && userInfo.isAdmin && (
          <>
            <Button
              id='adminMenuBtn'
              color='inherit'
              startIcon={<AdminPanelSettingsIcon />}
              aria-controls={openAdminMenu ? 'adminMenu' : undefined}
              aria-haspopup='true'
              aria-expanded={openAdminMenu ? true : undefined}
              onClick={handleOpenAdminMenu}
            >
              Admin
            </Button>
            <Menu
              id='adminMenu'
              anchorEl={anchorAdminMenu}
              open={openAdminMenu}
              onClose={handleCloseAdminMenu}
              MenuListProps={{ 'aria-labelledby': 'adminMenuBtn' }}
            >
              <MenuItem onClick={handleCloseAdminMenu}>
                <Link className={Style.link} to='/productManager'>
                  <CheckroomIcon />
                  Product Manager
                </Link>
              </MenuItem>
            </Menu>
          </>
        )}
        <button className={Style.navBtn} onClick={handleShowNavbar}>
          <MenuIcon />
        </button>
      </div>
    </header>
  )
}
