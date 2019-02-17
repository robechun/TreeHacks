import MUIDataTable from "mui-datatables";
import React, { Component } from 'react'
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
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class Shared extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: [],
            columns: ['From', 'Path', 'Date Accessed'],
            data: [],
            showDialog: false,
            userID: "",
            fileName: "",
            username: "",
        }
    }

    // url looks like:
    // <prefix>/<owner_address>/from.json
    componentDidMount = () => {

      // let obj = {
      //   '1': {
      //     id: 'kimjenna',
      //     date: Date.now()
      //   },
      //   '2': {
      //     id: 'jimothy29',
      //     date: Date.now()
      //   }
      // }
      // putFile('from.json', JSON.stringify(obj), { encrypt: true })
      // putFile('open/two.json', JSON.stringify(obj), { encrypt: false })
      // putFile('open/three.json', JSON.stringify(obj), { encrypt: false })
    
      // Fetch from your local `from` mapping, decrypt it with your private key, and populate the database.
      const options = { decrypt: true }; //, zoneFileLookupURL: 'https://core.blockstack.org/v1/names/' } TODO: might need zonefile
      getFile('from.json', options)
      .then((file) => {
        var parsedMapping = JSON.parse(file);

        let newData = [];

        for (var key in parsedMapping) {
          var temp = [ parsedMapping[key].id, key, parsedMapping[key].date ]
          newData.push(temp);
        }

        console.log(newData);
        this.setState({ data: newData });

        // var statuses = JSON.parse(file || '[]')
        // this.setState({
        //   person: new Person(loadUserData().profile),
        //   username: loadUserData().username,
        //   statusIndex: statuses.length,
        //   statuses: statuses,
        // })
      })
      .catch(err => {
        //TODO modal popup
        console.log('Error:' + err.message);
      })
      .finally(() => {
        this.setState({ isLoading: false })
      });
    }

    handleRowClick = (currentRowsSelected, allRowsSelected) => {
      console.log(currentRowsSelected);

      let zone = '';
      let username = currentRowsSelected[0] + '.id.blockstack';
      let fileToFetch = currentRowsSelected[1];

      (async () => {
        await lookupProfile(username)
        .then(res => zone = res.api.gaiaHubUrl);
      })()
      
      const options = { decrypt: true, username: username, zoneFileLookupURL: zone }
      getFile(username + '/' + fileToFetch + '.json', options)
      .then(res => console.log(res))    // TODO: show the stuff in a view
      .catch(err => console.log(err))

    }

    handleOpenDialog = () => {
      this.setState({
        showDialog: true,
      })
    }

    handleCloseDialog = () => {
      this.setState({
        showDialog: false,
      })
    }

    handleAdd = () => {
      blockstack.getFile('from.json', {decrypt: true })
      .then((fileContents) => {
        console.log(fileContents)
        let tfileContents = JSON.parse(fileContents)
        
        let _fileName = this.state.fileName;

        var obj = {};
        obj[_fileName] = {'id': this.state.userID, 'date': Date.now()};
        
        var obj2 = Object.assign(tfileContents, obj);
        console.log(JSON.stringify(obj2));
        blockstack.putFile('from.json', JSON.stringify(obj2), { encrypt: true });
      });
    }

    handleTextField1Change = (e) => {
      this.setState({
        userID: e.target.value
      })
    }

    handleTextField2Change = (e) => {
      this.setState({
        fileName: e.target.value
      })
    }

  render() {
    const options = {
      selectableRows: true,
      onRowClick: this.handleRowClick
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <MUIDataTable
              title={"Records shared with me"}
              data={this.state.data}
              columns={this.state.columns}
              options={options}
            />  
          </div>
        </div>
        <button
          className="btn btn-primary btn-lg"
          onClick={this.handleOpenDialog}
        >
          Add
        </button>
        <Dialog
          open={this.state.showDialog}
          onClose={this.handleCloseDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <DialogContentText>
              UserID
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="User ID"
              type="text"
              fullWidth
              onChange={this.handleTextField1Change}
            />
            <DialogContentText>
              Doc Number
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Doc"
              type="text"
              fullWidth
              onChange={this.handleTextField2Change}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleAdd} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
  
}