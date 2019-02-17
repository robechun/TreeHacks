import React, { Component } from 'react';
import {
  isSignInPending,
  loadUserData,
  Person,
  getFile,
  putFile,
  lookupProfile,
  signUserOut,
  listFiles,
  getPublicKeyFromPrivate,
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
      showFile: false,
      fileContents: "",
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
    let publicKey = getPublicKeyFromPrivate(loadUserData().appPrivateKey);
    console.log(loadUserData());
    putFile(loadUserData().username + '/publickey.txt', publicKey, {encrypt: false});
    console.log(loadUserData().username);
    let input = "kimjenna.id.blockstack/";
    listFiles((files) => {
     if (files.substring(0, input.length) === input) {
      this.fetchData(files);
     }
     return true;
    })
  }

  componentWillMount() {
    
  }


  handleUploadNewFile = () =>  {
    // TODO: allow user to put in a text file
    // saveNewStatus(text)
    this.setState({showModal: true})
  }

  handleUpload = (fname,lname,age,date,symp,diag,treat) => {
    console.log(fname);
    console.log(lname);
    console.log(age);
    console.log(date);
    console.log(symp);
    console.log(diag);
    console.log(treat);
    const HealthChart = {
      userGroupId: fname, 
      name: lname,
      age: age,
      date:date,
      symptoms: symp,
      dianosis: diag,
      treatment: treat
    }

    this.saveNewStatus(JSON.stringify(HealthChart))
  }

  // TODO refactor or delete
  saveNewStatus = (statusText) => {
    let status = {
      id: this.state.statusIndex,
      text: statusText.trim(),
      created_at: Date.now()
    }
    console.log(this.state.statusIndex)
    let statuses = this.state.statuses.concat([JSON.stringify(status)]);
    let newData = this.state.tabledata.concat([[status.created_at, status.id]])
    newData.sort((a, b) => a[1] - b[1])

    const options = { encrypt: false }
    putFile(this.state.username + '/' + (this.state.statusIndex + 1) + '.json', JSON.stringify(status), options)
      .then(res => {
        this.setState({
          statuses: statuses,
          tabledata: newData,
          statusIndex: this.state.statusIndex + 1
        })
      })
    // this.fetchData(this.state.username + '/' + this.state.statusIndex + '.json')

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
        let newData = this.state.tabledata.concat([[data.created_at, data.id]]);
        let statuses = this.state.statuses.concat([data]);
        newData.sort((a, b) => a[1] - b[1])
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

  handleCloseFileDialog = () => {
    this.setState({ showFile: false });
  };

  handleOpenFileDialog = () => {
    this.setState({ showFile: true });
  };

  handleShare = () => {
    var index;
    for (index in this.selectedRows) {
      let options = {decrypt: false, encrypt: false}
      let filename = this.state.username + '/' + index + '.json'
      if (this.toSend.length > 0) {
        blockstack.getFile(this.toSend + '.id.blockstack/publickey.txt', options)
        .then((BPublicKey) => {
          blockstack.getFile(filename, options)
          .then((fileContents) => {
            blockstack.putFile(this.toSend + filename, fileContents, {encrypt: BPublicKey});
          })
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

  onRowsSelect = (currentRowsSelected: array, allRowsSelected: array) => {
    this.selectedRows = allRowsSelected;
  }

  onRowClick = (rowData: string[], rowMeta: { dataIndex: number, rowIndex: number }) => {
    if (this.selectedRows.length === 0) {

      let filename = this.state.username + '/' + (rowData[1]+1) + '.json';
      blockstack.getFile(filename, {decrypt: false})
      .then((fileContentz) => {
        this.setState({
          showFile: true,
          fileContents: fileContentz,
        })
      });   
    }
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
      'onRowsSelect': this.onRowsSelect,
      'onRowClick': this.onRowClick,
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

        <Dialog
          fullScreen
          open={this.state.showFile}
          scroll='paper'
          onClose={this.handleCloseFileDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <DialogContentText>
              {this.state.fileContents}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseFileDialog} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
