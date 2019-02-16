import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

const Header = (props) => (
  <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand className="navbar-brand">
            <span><img className="logo" src="https://thumb.ibb.co/ctNaSo/34497858_1998022223846047_6463238276474994688_n.png"/></span>
            <h3 id="biffelTitle">biffel</h3>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse className="salmon">
          <Nav pullRight>
            <LinkContainer to="/profile">
              <NavItem className="navitem">Profile</NavItem>
            </LinkContainer>
            <LinkContainer to="/shared">
              <NavItem className="navitem">Shared</NavItem>
            </LinkContainer>
            <LinkContainer to="/open">
              <NavItem className="navitem">Open</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
)

export default Header

// <div className="flexbox">
//   <img className="logo" src="https://thumb.ibb.co/hnAbiT/biffel_Logo.png"/>
//   <h3>Biffel</h3>
// </div>
