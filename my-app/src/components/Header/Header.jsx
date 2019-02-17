import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem, Form, FormControl, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import PropTypes from 'prop-types';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    const { testFunc } = this.props;
    console.log(testFunc);
    return (
      <Navbar bg="light" variant="light">
        <Navbar.Brand className="navbar-brand">
          <h3 id="title">Treehacks</h3>
        </Navbar.Brand>
        <Navbar.Collapse className="salmon">
          <Nav className="mr-auto">
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
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success" onClick={testFunc}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
