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

      let obj = {
        '1': {
          id: 'robert',
          date: '123456'
        },
        '2': {
          id: 'bobert',
          date: '66314'
        }
      }

    
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
    }
  render() {
    console.log('rendering')

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