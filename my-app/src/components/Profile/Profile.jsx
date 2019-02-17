import React, { Component } from 'react';
import {
  isSignInPending,
  loadUserData,
  Person,
  getFile,
  putFile,
  lookupProfile,
  signUserOut,
  listFiles
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

import MUIDataTable from "mui-datatables";


const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';
const statusFileName = 'statuses.json'

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Medical Data",
      tabledata: [],
      username: "",
      statuses: [],
      statusIndex: 0,
      showModal: false,
      showDialog: false,
      toSend: "",
      columns: ["Date", "File Name"],
      willOpenSource: false,

    };

    this.selectedRows = []
    

  }

  componentDidMount() {
    this.setState({
      username: loadUserData().username
    })
    let input = "kimjenna.id.blockstack/";
    listFiles((files) => {
     if (files.substring(0, input.length) === input) {
      this.fetchData(files);
     }
     return true;
    })
    console.log('whee')
    console.log(this.state.tabledata)
  }

  componentWillMount() {
    
    /*
    let input = this.state.username + "/";
    let index = input + "index.json"
    let hasInput = false

    listFiles((files) => {
     if (files.substring(0, index.length) === index) {
      hasInput = true;
     }
     return true;
    })

     if (!hasInput) {
      listFiles((files) => {
       if (files.substring(0, input.length) === input) {
        getFile(files, options)
        .then((file) => {
          var data = JSON.parse(file || '{}')

        })
       }
       return true;
      })
      hasInput = true;
     }
    */
  }


  handleUploadNewFile = () =>  {
    // TODO: allow user to put in a text file
    // saveNewStatus(text)
    this.setState({showModal: true})
  }

  handleUpload = () => {
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
    statuses.unshift(JSON.stringify(status))

    const options = { encrypt: false }
    putFile(this.state.username + '/' + this.state.statusIndex + '.json', JSON.stringify(status), options)
      .then(res => {
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
  fetchData(filename) {
    // distinction between someone elses and mine?
    const options = { decrypt: false}
    getFile(filename, options)
      .then((file) => {
        var data = JSON.parse(file || '{}')
        console.log('tyoe of data is: ' + typeof(data))
        console.log('tyoe of data id is: ' + typeof(data.id))
        let newData = this.state.tabledata.concat([[data.created_at, data.id]]);

        // newData = this.state.tabledata;
        console.log('yello1')
        // newData.push([data.id, data.created_at])

        console.log('yello2')
        console.log(this.state.tabledata)
        console.log(newData);
        let statuses = this.state.statuses
        statuses.unshift(data)
        this.setState({
          tabledata: newData,
          statusIndex: this.state.statusIndex + 1,
          statuses: statuses,
        })
      })
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
      let options = {decrypt: false, encrypt: false}
      let filename = this.data[index][1]
      if (this.toSend.length > 0) {
        blockstack.getFile(filename, options)
        .then((fileContents) => {
          blockstack.putFile(this.toSend + filename, fileContents, options);
        });
        blockstack.getFile('to.json', options)
        .then((fileContents) => {
          fileContents = fileContents + this.toSend + ' => ' + filename + '\n'
          blockstack.putFile('to.json', fileContents, options);
        });
      }
      if (this.willOpenSource) {
        blockstack.getFile(filename, options)
        .then((fileContents) => {
          blockstack.putFile('open/' + filename, fileContents, options);
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

    const options = {
      'filterType': 'checkbox',
      'onRowsSelect': this.props.onRowsSelect,
    };

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-12">
              <div className="avatar-section">
                <img
                  src={ avatarFallbackImage }
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

              <MUIDataTable
                title={this.state.title}
                data={this.state.tabledata}
                columns={this.state.columns}
                options={options}
              />
            </div>
            
            {this.isLocal() &&
              
              <div className="new-status">
                <div className="col-md-12 text-right">
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={this.handleUploadNewFile}
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
          <SubmitForm onSubmitForm={this.handleUpload}/>
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
      </div>
    );
  }
}
