import { useContext } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

import { AiOutlineUser } from 'react-icons/ai'
import { BsCart } from 'react-icons/bs'

import SearchBox from './SearchBox'
import { Store } from '../Store'

import Style from '../scss/Header.module.scss'

function Header() {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { cart, userInfo } = state
  return (
    <>
      <Navbar
        className={Style.header}
        sticky='top'
        key='lg'
        bg='light'
        expand='lg'
      >
        <Container fluid>
          <Navbar.Brand>
            <Link to='/' className={(Style.header__logo, Style.header__link)}>
              Shopping now
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement='end'
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                Shopping_now
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className='justify-content-end flex-grow-1'>
                <SearchBox />
                <Nav.Link>
                  <Link to={`${userInfo ? '/userInfo' : '/login'}`}>
                    <AiOutlineUser className={Style.header__icon} />
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to='/cart' className='position-relative'>
                    <BsCart className={Style.header__icon} />
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
                </Nav.Link>
                {userInfo && userInfo.isAdmin && (
                  <DropdownButton align='end' title='Admin' variant='secondary'>
                    <Dropdown.Item>
                      <Link
                        className={Style.header__link}
                        to='/productManager'
                        style={{ width: '100%' }}
                      >
                        Product
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>Another action</Dropdown.Item>
                    <Dropdown.Item>Something else here</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>Logout</Dropdown.Item>
                  </DropdownButton>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
