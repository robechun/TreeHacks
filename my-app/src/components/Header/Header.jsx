import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import PropTypes from 'prop-types';

const Header = (props) => (
  <Navbar bg="light" variant="light">
    <Navbar.Brand className="navbar-brand">
      <h3 id="title">Treehacks</h3>
    </Navbar.Brand>
    <Navbar.Collapse className="salmon">
      <LinkContainer to="/profile">
        <NavItem className="navitem">Profile</NavItem>
      </LinkContainer>
      <LinkContainer to="/shared">
        <NavItem className="navitem">Shared</NavItem>
      </LinkContainer>
      <LinkContainer to="/open">
        <NavItem className="navitem">Open</NavItem>
      </LinkContainer>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
