import MUIDataTable from "mui-datatables";
import React, { Component } from 'react'
import { UserGroup } from 'radiks';
import AbstractForm from "../Forms/AbstractForm";

export default class TestForm extends Component {
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
            console.log('in the component mount of shared')
            console.log(groups);
            console.log('in the component mount of shared')
            

            // TODO: populate table with group stuff
        })();
    }

  render() {
    return (
        <AbstractForm></AbstractForm>
    )
  }
}
