import React, { useState, useContext, useEffect } from 'react'
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

import './Header.scss'

export default function Header() {
  return (
    <header>
      <Navbar id='header' variant='dark' expand='lg'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>SHOPPING_NOW</Navbar.Brand>
          </LinkContainer>
        </Container>
      </Navbar>
    </header>
  )
}
