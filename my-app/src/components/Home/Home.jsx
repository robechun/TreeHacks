import React, { Component, Link } from 'react';
import { Switch, Route } from 'react-router-dom';
import Profile from '../Profile/Profile.jsx';
import Shared from '../Shared/Shared.jsx';
import SubmitForm from '../SubmitForm/SubmitForm.jsx';
import Open from '../OpenSource/Open.jsx';

export default class Home extends Component	{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main className="home">
	    <Switch>
	      <Route exact path='/' render = {(props) => <Profile {...props} handleSignOut={this.props} />}/>
	      <Route exact path='/profile' render = {(props) => <Profile {...props} handleSignOut={this.props} />}/>
	      <Route exact path='/shared' component={Shared}/>
        <Route exact path='/test' component={SubmitForm}/>
        <Route exact path='/open' component={Open}/>
	    </Switch>
	  </main>
    );
  }
}


// export default class App extends React.Component {

//   constructor(props) {
//   	super(props);

//     this.toggle = this.toggle.bind(this);
//     this.state = {
//       isOpen: false
//     };
//   }

//   toggle() {
//     this.setState({
//       isOpen: !this.state.isOpen
//     });
//   }

//   handleSignIn = (e) =>  {
//     if (isSignInPending()) {
//       console.log('zero')
//       (async () => {
//         console.log('one')
//         await handlePendingSignIn();
//       })();
//       (async () => {
//         console.log('two')
//         await User.createWithCurrentUser();
//       })();
//     } else {
//       e.preventDefault();
//       const origin = window.location.origin
//       redirectToSignIn(origin, origin + '/manifest.json', ['store_write', 'publish_data'])
//     }
//   }

//   handleSignOut(e) {
//     e.preventDefault();
//     signUserOut(window.location.origin);
//   }

//   render() {
//     return (
//       <div className="site-wrapper">
//         <div className="site-wrapper-inner">
//           <Navbar color="light" light expand="md">
//             <NavbarBrand href="/">HAHA!</NavbarBrand>
//             <NavbarToggler onClick={this.toggle} />
//             <Collapse isOpen={this.state.isOpen} navbar>
//               <Nav className="ml-auto" navbar>
//                 <NavItem label="hi">
//                   <NavLink href="/components/"></NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
//                 </NavItem>
//               </Nav>
//             </Collapse>
//           </Navbar>
//           { !isUserSignedIn() ?
//             <Signin handleSignIn={ this.handleSignIn } />
//             : 
//             <Switch>
//               <Route 
//                 path='/:username?' 
//                 render={
//                   routeProps => <Profile handleSignOut={ this.handleSignOut } {...routeProps} />
//                 } 
//               />
//             </Switch>
//           }
//           <Collab></Collab>
//         </div>
//       </div>
//     );
//   }

//   componentWillMount() {
//     if (isSignInPending()) {
//       handlePendingSignIn().then((userData) => {
//         window.location = window.location.origin;
//       });
//     }
//   }
// }
