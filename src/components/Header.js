import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { BiUser } from 'react-icons/bi'
import { BsCart } from 'react-icons/bs'
import { AiOutlineCaretDown, AiOutlineClose } from 'react-icons/ai'
import { BiMenuAltRight } from 'react-icons/bi'

import { Store } from '../Store'
import SearchBox from './SearchBox'
import '../scss/App.scss'
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  })
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { cart, userInfo } = state

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p)
  }

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (size.width > 740 && menuOpen) {
      setMenuOpen(false)
    }
  }, [size.width, menuOpen])

  return (
    <div className='header'>
      <div>
        <Link className='header__logo' to='/'>
          shopping_now
        </Link>
      </div>
      <div className='header__content'>
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
      <div className='header__toggle'>
        {!menuOpen ? (
          <BiMenuAltRight onClick={menuToggleHandler} />
        ) : (
          <AiOutlineClose onClick={menuToggleHandler} />
        )}
      </div>
    </div>
  )
}
