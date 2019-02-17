import React, { Component, Link } from 'react';
import Profile from '../views/Profile.jsx';
import Signin from './Signin.jsx';
import Collab from '../views/Collab.jsx';
import {
  isSignInPending,
  isUserSignedIn,
  redirectToSignIn,
  handlePendingSignIn,
  signUserOut,
} from 'blockstack';

import { User } from 'radiks';

import { Switch, Route } from 'react-router-dom'

export default class App extends Component {

  constructor(props) {
  	super(props);
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
      <div className="site-wrapper">
        <div className="site-wrapper-inner">
          { !isUserSignedIn() ?
            <Signin handleSignIn={ this.handleSignIn } />
            : 
            // add div and move collab
            <div>
            <Switch>
              <Route 
                path='/:username?' 
                render={
                  routeProps => <Profile handleSignOut={ this.handleSignOut } {...routeProps} />
                } 
              />
            </Switch>
            <Collab></Collab>
            </div>
          }
        </div>
      </div>
    );
  }

  componentWillMount() {
    if (isSignInPending()) {
      handlePendingSignIn().then((userData) => {
        window.location = window.location.origin;
      });
    }
  }
}
