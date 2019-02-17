import MUIDataTable from "mui-datatables";
import React, { Component } from 'react'
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


export default class Open extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: [],
            columns: ['File path'],
            data: []
        }
    }

    componentDidMount = () => {
      
      // Fetch from your open soure route 
      // TODO: ENCRYPTION/DECRYPTION
      //       Encryption with open-boy.
      let openSourced = [];
      console.log('in Open')
      listFiles((file) => {
        if (file.includes('open/')) {
          var temp = [ file ]
          
          console.log(file)

          let newData = this.state.data.concat([[ file ]])
          
          this.setState({ data: newData })
        }

        return true;
        })

      // for (var item in openSourced) {
      //   options = { decrypt: false }
      //   getFile(item, options)
      //   .then(file => {
      //     var parsedMapping = JSON.parse(file);

      //     let newData = [];

      //     for (var key in parsedMapping) {
      //       var temp = [ parsedMapping[key].id, key, parsedMapping[key].date ]
      //       newData.push(temp);
      //     }

      //     console.log(newData);
      //     this.setState({ data: newData });

      //   })
      //   .catch(err => {
      //     //TODO modal popup
      //     console.log('Error:' + err.message);
      //   })
      // }
    }

    handleRowClick = (currentRowsSelected, allRowsSelected) => {
      console.log(currentRowsSelected);

      let fileToFetch = currentRowsSelected[0];
      
      const options = { decrypt: false }
      getFile(fileToFetch, options)
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
                title={"Anonymized Records"}
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
