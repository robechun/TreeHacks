import React, { Component, Link } from 'react';
import Profile from '../views/Profile.jsx';
import Signin from './Signin.jsx';
import Collab from '../views/Collab.jsx';
import Shared from '../views/Shared.jsx'

import {
  isSignInPending,
  isUserSignedIn,
  redirectToSignIn,
  handlePendingSignIn,
  signUserOut,
} from 'blockstack';

import { User } from 'radiks';

import { Switch, Route } from 'react-router-dom'
import ActivateInvitation from '../views/ActivateInvitation.jsx';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      called: false
    }
  
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

  // oneTime = () => {
  //   (async () => {
  //     console.log('ya yeet')
  //     await User.createWithCurrentUser();
  //     console.log('ya yeet2')
  //   })();
  // }

  render() {
    // if (isUserSignedIn()) {
    //   this.oneTime()
    // }

    return (
      <div className="site-wrapper">
        <div className="site-wrapper-inner">
          { !isUserSignedIn() ?
            <Signin handleSignIn={ this.handlePendingSignIn } />
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
          <Collab></Collab>
          <ActivateInvitation></ActivateInvitation>
          <Shared></Shared>
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
