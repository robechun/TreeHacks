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

import * as blockstack from 'blockstack'

import Table from "../Table.jsx";
import HealthChart from "../../models/HealthChart.jsx"
import SubmitForm from '../SubmitForm/SubmitForm.jsx';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
      showDialog: false,

      toSend: "",
      willOpenSource: false,
    };

    this.selectedRows = []

    this.data = [
     ["04/03/17", "statuses.json"],
     ["03/19/16", "file2"]
    ];
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

    this.setState({showModal: true})
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
    putFile('statuses.json', JSON.stringify(statuses), options)
      .then(() => {
        this.setState({
          statuses: statuses
        })
      })
  }

  handleSignOut(e) {
    e.preventDefault();
    signUserOut(window.location.origin);
  }
  
  // TODO refactor or delete
  fetchData() {
    // use invitationKey to access the pool
    // query the pool
    // and get document
    // save document on my local file aka handleUploadNewFile on my part

    this.setState({ isLoading: true })
    const options = { decrypt: false, zoneFileLookupURL: 'https://core.blockstack.org/v1/names/' }
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
      });
    /*} else {
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
      }
      */
  }

  isLocal() {
    return this.props.match.params.username ? false : true
  }

  handleCloseUploadModal = () => {
    this.setState({ showModal: false });
  };

  handleOpenUploadModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseShareDialog = () => {
    this.setState({ showDialog: false });
  };

  handleOpenShareDialog = () => {
    this.setState({ showDialog: true });
  };

  handleShare = () => {
    var index;
    for (index in this.selectedRows) {
      let options = {decrypt: false}
      if (this.toSend.length > 0) {
        blockstack.getFile(this.data[index][1], {decrypt: false})
        .then((fileContents) => {
          blockstack.putFile(this.toSend + this.data[index][1], fileContents, options);
        });
      }
      if (this.willOpenSource) {
        blockstack.getFile(this.data[index][1], {decrypt: false})
        .then((fileContents) => {
          blockstack.putFile('openSource' + this.data[index][1], fileContents, options);
        });
      }
    }
  }

  handleTextFieldChange = (e) => {
    this.toSend = e.target.value;
  }

  handleCheckboxChange = (e, checked) => {
    this.willOpenSource = checked;
    console.log(checked);
  }

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
              <Table 
                onRowsSelect={
                  (currentRowsSelected: array, allRowsSelected: array) => {
                    this.selectedRows = allRowsSelected;
                  }}
                data={this.data}>
              </Table>
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
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={this.handleOpenShareDialog}
                  >
                    Share
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
        <Modal 
          onClose={this.handleCloseUploadModal}
          open={this.state.showModal} 
          style={modalStyles}>
          <SubmitForm />
        </Modal>
        <Dialog
          open={this.state.showDialog}
          onClose={this.handleCloseShareDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <DialogContentText>
              Send to...
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="User ID"
              type="text"
              fullWidth
              onChange={this.handleTextFieldChange}
            />
            <Checkbox
            id="checkbox"
            onChange={this.handleCheckboxChange}
            label="Open Source?"></Checkbox><font size="3" color="black">Open Source?</font>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseShareDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleShare} color="primary">
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </div> : null
    );
  }
}
