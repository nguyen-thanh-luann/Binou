import React, { useState, useContext, useEffect } from 'react'
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import './Header.scss'

export default function Header() {
  return (
    <Navbar id='header' bg='dark' variant='dark'>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>SHOPPING_NOW</Navbar.Brand>
        </LinkContainer>
      </Container>
    </Navbar>
  )
}
