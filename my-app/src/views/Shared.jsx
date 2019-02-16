import MUIDataTable from "mui-datatables";
import React, { Component } from 'react'
import { UserGroup } from 'radiks';

export default class Shared extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groups = [],
            columns = ['Blockstack ID'],
            data = []
        }
    }

    componentDidMount = () => {
        (async () => {
            const groups = await UserGroup.myGroups();
            console.log(groups);
            // TODO: populate table with group stuff
        })();
    }

  render() {
    return (
        <MUIDataTable
            title={"Records shared with me"}
            data={this.state.data}
            columns={colthis.state.columns}
            // options={options}
        />  
    )
  }
}
