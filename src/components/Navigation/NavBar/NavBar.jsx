import React from 'react'
import {Navbar, Nav} from 'react-bootstrap';
import NaviItem from '../NavItem/NavItem';
import * as ROUTES from '../../../constants/routes';


const NavBar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          <NaviItem url={ROUTES.HOME} displayName={'Home'}/>
          <NaviItem url={ROUTES.USER_INFO} displayName={'User Info'}/>
          <NaviItem url={ROUTES.RESTRICTED_PHOTO} displayName={'Restricted Pohto'}/>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
}

export default NavBar
