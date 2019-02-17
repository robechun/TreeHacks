import MUIDataTable from "mui-datatables";
import React, { Component } from 'react'
import { UserGroup } from 'radiks';

export default class Open extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: [],
            columns: ['Blockstack ID'],
            data: []
        }
    }

    componentDidMount = () => {
        (async () => {
            const groups = await UserGroup.myGroups();
            console.log('in the component mount of open')
            console.log(groups);
            console.log('in the component mount of open')
            

            // TODO: populate table with group stuff
        })();
    }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <MUIDataTable
                title={"Anonymized Records"}
                data={this.state.data}
                columns={this.state.columns}
                // options={options}
            />  
          </div>
        </div>
      </div>
    )
  }
}
