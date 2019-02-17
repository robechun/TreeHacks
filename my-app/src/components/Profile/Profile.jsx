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
import HealthChart from "../../models/HealthChart.jsx"
import SubmitForm from '../SubmitForm/SubmitForm.jsx';
import Modal from '@material-ui/core/Modal';

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

      isLoading: false,

      showModal: false,
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
    // saveNewStatus(text)
    this.setState({showModal: true})
  }

  handleUpload(event) {
    // scrap json data
    // to make healthchart

    const HealthChart = {
      userGroupId: "dummy", 
      name: "Jay",
      age: 13,
      date: Date.now(),
      symptoms: "hi",
      dianosis: "hi",
      treatment: "hi"
    }

    this.saveNewStatus(JSON.stringify(HealthChart))
  }

  // TODO refactor or delete
  saveNewStatus = (statusText) => {
    let statuses = this.state.statuses
    let status = {
      id: this.state.statusIndex++,
      text: statusText.trim(),
      created_at: Date.now()
    }
    statuses.unshift(status)
    const options = { encrypt: false }
    putFile(this.state.username + '/' + this.state.statusIndex, JSON.stringify(status), options)
      .then(() => {
        this.setState({
          statuses: statuses
        })
      })

    this.fetchdata(this.state.username + '/' + this.state.statusIndex);

  }

  handleSignOut(e) {
    e.preventDefault();
    signUserOut(window.location.origin);
  }
  
  // TODO refactor or delete
  fetchData(filename) {
    // distinction between someone elses and mine?
    this.setState({ isLoading: true })
    const options = { decrypt: false}
    var data = '[]';
    getFile(filename, options)
      .then((file) => {
        data = JSON.parse(file || '[]')
        this.setState({
          person: new Person(loadUserData().profile),
          username: loadUserData().username,
          statusIndex: this.statusIndex + 1,
          statuses: this.statuses + [data],
        })
      })
      .finally(() => {
        this.setState({ isLoading: false })
      });
    console.log(data)
    // return data
  }

  isLocal() {
    return this.props.match.params.username ? false : true
  }

  handleClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { handleSignOut } = this.props.handleSignOut;
    const { person } = this.state;
    const { username } = this.state;

    const modalStyles = {
      'position': 'absolute',
      'top': '20%',
    };

    return (
      !isSignInPending() && person ?
      <div className="container">
        <div className="row">
          <div className="col-md-12">
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
                      <a onClick={e => handleSignOut(e)}>(Logout)</a>
                    </span>
                  }
                </div>
              </div>
              <Table></Table>
            </div>
            
            {this.isLocal() &&
              
              <div className="new-status">
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
          </div>
        </div>
        <Modal 
          onClose={this.handleClose}
          open={this.state.showModal} 
          style={modalStyles}>
          <SubmitForm />
        </Modal>
      </div> : null
    );
  }
}
