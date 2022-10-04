import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AiOutlineUser } from 'react-icons/ai'
import { BsCart } from 'react-icons/bs'

import SearchBox from './SearchBox'
import { Store } from '../Store'
import Style from '../scss/Header.module.scss'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

export default function Header() {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { cart, userInfo } = state
  return (
    <div className={Style.nav}>
      <div className={Style.nav__items}>
        <Link to='/' className={Style.nav__logo}>
          Binou
        </Link>
        <div>
          <Link to='/' className={Style.nav__item}>
            <span>Home</span>
          </Link>
          <Link to='/' className={Style.nav__item}>
            Men
          </Link>
          <Link to='/' className={Style.nav__item}>
            Women
          </Link>
          <Link to='/' className={Style.nav__item}>
            Baby
          </Link>
          <Link to='/' className={Style.nav__item}>
            Kids
          </Link>
        </div>
      </div>
      <div className={Style.nav__utils}>
        <SearchBox />
        <div>
          <Link to={`${userInfo ? '/userInfo' : '/login'}`}>
            <AiOutlineUser className={Style.nav__utils__icon} />
          </Link>
          <Link to='/cart' className='position-relative'>
            <BsCart className={Style.nav__utils__icon} />
            {cart.cartItems.length > 0 && (
              <span
                className='position-absolute top-0 translate-middle bg-danger text-light border border-light rounded-circle'
                style={{
                  fontSize: '0.6rem',
                  padding: '0.1rem 0.25rem',
                  fontWeight: 'bold',
                }}
              >
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </span>
            )}
          </Link>
        </div>
        {userInfo && userInfo.isAdmin && (
          <DropdownButton
            style={{ marginLeft: '1rem' }}
            align='end'
            title='Admin'
            variant='secondary'
          >
            <Dropdown.Item>
              <Link
                className={Style.nav__link}
                to='/productManager'
                style={{ width: '100%' }}
              >
                Product
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>Customer</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Logout</Dropdown.Item>
          </DropdownButton>
        )}
      </div>
    </div>
  )
}
