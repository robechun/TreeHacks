import React, { Component } from 'react';
import {
  isSignInPending,
  loadUserData,
  Person,
  getFile,
  putFile,
  lookupProfile,
  signUserOut
} from 'blockstack';

import Table from "../Table.jsx";
import { UserGroup } from 'radiks';


const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';
const statusFileName = 'statuses.json'

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      person: {
        name() {
          return 'Anonymous';
        },
        avatarUrl() {
          return avatarFallbackImage;
        },
      },
      username: "",
      newStatus: "",


      statuses: [],
      statusIndex: 0,


      isLoading: false
    };
  }

  componentWillMount() {
    this.setState({
      person: new Person(loadUserData().profile),
      username: loadUserData().username
    })
  }

  componentDidMount() {
    this.fetchData()
  }

  // TODO refactor or delete
  handleNewStatusChange(event) {
    this.setState({
      newStatus: event.target.value
    })
  }

  // TODO refactor or delete
  handleNewStatusSubmit(event) {
    this.saveNewStatus(this.state.newStatus)
    this.setState({
      newStatus: ""
    })
  }

  handleUploadNewFile(event) {
    // TODO: allow user to put in a text file
    saveNewStatus(text)
    const group = new UserGroup({ name: 'records-health-' + blockstack.loadUserData().profile.name + this.state.statusIndex}); 
    console.log(group);

    (async () => {
        await group.create();
        console.log('two');
        const invitation = await group.makeGroupMembership(this.state.usernameToInvite);
        console.log(invitation._id); // the ID used to later activate an invitation
        // TODO: give this to the user you want to share it with
    })();
  }


  handleSignOut(e) {
    e.preventDefault();
    signUserOut(window.location.origin);
  }

  // TODO refactor or delete
  saveNewStatus(statusText) {
    let statuses = this.state.statuses

    let status = {
      id: this.state.statusIndex++,
      text: statusText.trim(),
      created_at: Date.now()
    }

    statuses.unshift(status)
    const options = { encrypt: false }
    putFile('statuses.json', JSON.stringify(statuses), options)
      .then(() => {
        this.setState({
          statuses: statuses
        })
      })
  }

  // TODO refactor or delete
  fetchData() {
    // if (this.isLocal()) {
      this.setState({ isLoading: true })
      const options = { decrypt: false}, zoneFileLookupURL: 'https://core.blockstack.org/v1/names/' }
      getFile('statuses.json', options)
        .then((file) => {
          var statuses = JSON.parse(file || '[]')
          this.setState({
            person: new Person(loadUserData().profile),
            username: loadUserData().username,
            statusIndex: statuses.length,
            statuses: statuses,
          })
        })
        .finally(() => {
          this.setState({ isLoading: false })
        })
    // } else {
      { /*
      const username = this.props.match.params.username
      this.setState({ isLoading: true })

      lookupProfile(username)
        .then((profile) => {
          this.setState({
            person: new Person(profile),
            username: username
          })
        })
        .catch((error) => {
          console.log('could not resolve profile')
        })

      const options = { username: username, decrypt: false, zoneFileLookupURL: 'https://core.blockstack.org/v1/names/'}

      getFile(statusFileName, options)
        .then((file) => {
          var statuses = JSON.parse(file || '[]')
          this.setState({
            statusIndex: statuses.length,
            statuses: statuses
          })
        })
        .catch((error) => {
          console.log('could not fetch statuses')
        })
        .finally(() => {
          this.setState({ isLoading: false })
        })
      */}
    // }
  }

  isLocal() {
    return this.props.match.params.username ? false : true
  }

  render() {
    const { person } = this.state;
    const { username } = this.state;

    return (
      !isSignInPending() && person ?
      <div className="container">
        <div className="row">
          <div className="col-md-offset-3 col-md-6">
            <div className="col-md-12">
              <div className="avatar-section">
                <img
                  src={ person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage }
                  className="img-rounded avatar"
                  id="avatar-image"
                />
                <div className="username">
                  <h1>
                    <span>{username}</span>
                  </h1>
                  {this.isLocal() &&
                    <span>
                      &nbsp;|&nbsp;
                      <a onClick={ e => this.handleSignOut(e) }>(Logout)</a>
                    </span>
                  }
                </div>
              </div>
            </div>
            <div>
            {/* This might be where we put the table in */}
              <Table></Table>
            </div>
            
            {this.isLocal() &&
              
              <div className="new-status">
                {/*
                <div className="col-md-12">
                  <textarea className="input-status"
                    value={this.state.newStatus}
                    onChange={e => this.handleNewStatusChange(e)}
                    placeholder="What's on your mind?"
                  />
                </div>
                */}
                <div className="col-md-12 text-right">
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={e => this.handleUploadNewFile(e)}
                  >
                    Upload New File
                  </button>
                </div>
              </div>
            }
            <div className="col-md-12 statuses">
            {this.state.isLoading && <span>Loading...</span>}
            {this.state.statuses.map((status) => (
                <div className="status" key={status.id}>
                  {status.text}
                </div>
                )
            )}
            </div>
          </div>
        </div>
      </div> : null
    );
  }
}
