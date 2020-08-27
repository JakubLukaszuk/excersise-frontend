import React, {useContext} from 'react'
import {Navbar, Nav} from 'react-bootstrap';
import NaviItem from '../NavItem/NavItem';
import * as ROUTES from '../../../constants/routes';
import {UserContext} from '../../../App.js';

const NavBar = () => {
  const {state} = useContext(UserContext);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
      <Navbar.Brand>React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NaviItem url={ROUTES.HOME} displayName={'Home'}/>
          <NaviItem url={ROUTES.USER_INFO} displayName={'User Info'}/>
          {state.isPageAllowed ? <NaviItem url={ROUTES.RESTRICTED_PHOTO} displayName={'Restricted Pohto'}/> :
          null}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
