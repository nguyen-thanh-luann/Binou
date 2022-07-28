import React from 'react'
import { Navbar, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import './Header.scss'

export default function Header() {
  return (
    <Navbar id="header" bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>SHOPPING_NOW</Navbar.Brand>
        </LinkContainer>
      </Container>
    </Navbar>
  )
}
