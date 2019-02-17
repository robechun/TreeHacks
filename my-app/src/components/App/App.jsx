import React, { Component, Link } from 'react';
import Profile from '../Profile/Profile.jsx';
import Signin from '../Signin.jsx';
import Collab from '../Collab.jsx';
import {
  isSignInPending,
  isUserSignedIn,
  redirectToSignIn,
  handlePendingSignIn,
  signUserOut,
} from 'blockstack';

import Header from '../Header/Header'
import Home from '../Home/Home'

import { User } from 'radiks';

import { Switch, Route } from 'react-router-dom'

export default class App extends React.Component {

  constructor(props) {
  	super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleSignIn = (e) =>  {
    if (isSignInPending()) {
      console.log('zero')
      (async () => {
        console.log('one')
        await handlePendingSignIn();
      })();
      (async () => {
        console.log('two')
        await User.createWithCurrentUser();
      })();
    } else {
      e.preventDefault();
      const origin = window.location.origin
      redirectToSignIn(origin, origin + '/manifest.json', ['store_write', 'publish_data'])
    }
  }

  handleSignOut(e) {
    e.preventDefault();
    signUserOut(window.location.origin);
  }

  render() {
    return (
      <div>
        <Header/>
        <Home/>
      </div>
    )
  }

  // render() {
  //   return (
  //     <div className="site-wrapper">
  //       <div className="site-wrapper-inner">
  //         <Navbar color="light" light expand="md">
  //           <NavbarBrand href="/">HAHA!</NavbarBrand>
  //           <NavbarToggler onClick={this.toggle} />
  //           <Collapse isOpen={this.state.isOpen} navbar>
  //             <Nav className="ml-auto" navbar>
  //               <NavItem label="hi">
  //                 <NavLink href="/components/"></NavLink>
  //               </NavItem>
  //               <NavItem>
  //                 <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
  //               </NavItem>
  //             </Nav>
  //           </Collapse>
  //         </Navbar>
  //         { !isUserSignedIn() ?
  //           <Signin handleSignIn={ this.handleSignIn } />
  //           : 
  //           <Switch>
  //             <Route 
  //               path='/:username?' 
  //               render={
  //                 routeProps => <Profile handleSignOut={ this.handleSignOut } {...routeProps} />
  //               } 
  //             />
  //           </Switch>
  //         }
  //         <Collab></Collab>
  //       </div>
  //     </div>
  //   );
  // }

  componentWillMount() {
    if (isSignInPending()) {
      handlePendingSignIn().then((userData) => {
        window.location = window.location.origin;
      });
    }
  }
}
