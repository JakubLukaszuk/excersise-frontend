import React from 'react';
import { Link } from 'react-router-dom';
import {Nav, NavItem} from 'react-bootstrap';

const NaviItem = (props) => {
  return (
    <NavItem>
      <Nav.Link as={Link} to={props.url}>{props.displayName}</Nav.Link>
    </NavItem>
  )
}

export default NaviItem;
