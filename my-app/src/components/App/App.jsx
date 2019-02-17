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
  decryptPrivateKey
} from 'blockstack';

import Header from '../Header/Header'
import Home from '../Home/Home'

import { User } from 'radiks';

import { Switch, Route } from 'react-router-dom'

export default class App extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      called: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handlePendingSignIn = async (e) => {
    if (isSignInPending()) {
      await handlePendingSignIn();
      await User.createWithCurrentUser();
    } else {
      e.preventDefault();
      const { origin } = window.location;
      redirectToSignIn(origin, origin + '/manifest.json', ['store_write', 'publish_data']);
    }
  }

  handleSignOut(e) {
    e.preventDefault();
    signUserOut(window.location.origin);
  }

  testFunc(text) {
    console.log('hi');
  }

  render() {
    return (
      <div className="site-wrapper">
        <div className="site-wrapper-inner">
          { !isUserSignedIn() ?
            <Signin handleSignIn={ this.handlePendingSignIn } />
            : 
            <div>
              <Header testFunc = {this.testFunc} />
              <Home handleSignOut={ this.handleSignOut }/>
            </div>
          }
        </div>
      </div>
    )
  }
  
  componentWillMount() {
    if (isSignInPending()) {
      handlePendingSignIn().then((userData) => {
        window.location = window.location.origin;
      });
    }
    if (isUserSignedIn() && !this.state.called) {
      (async () => {
        console.log('please sign in');
        await User.createWithCurrentUser();
        console.log('please sign in2');
        this.setState({ called: true });
      })();
    }
  }
}
