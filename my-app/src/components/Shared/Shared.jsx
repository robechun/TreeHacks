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

export default class Shared extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: [],
            columns: ['From', 'Path', 'Date Accessed'],
            data: []
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
      // putFile('open/one.json', JSON.stringify(obj), { encrypt: false })
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
      
      const options = { decrypt: false, username: username, zoneFileLookupURL: zone }
      getFile('/' + currentRowsSelected[0] + '/' + fileToFetch + '.json', options)
      .then(res => console.log(res))    // TODO: show the stuff in a view
      .catch(err => console.log(err))

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
      </div>
    )
  }
  
}