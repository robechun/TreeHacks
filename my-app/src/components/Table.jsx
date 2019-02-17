import MUIDataTable from "mui-datatables";
import React, { Component } from 'react';

export default class Table extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {

    }
	render() {

		const columns = ["Date", "File Name"];

		const data = [
		 ["04/03/17", "file1"],
		 ["03/19/16", "file2"]
		];

		const options = {
		  filterType: 'checkbox',
		  onRowsSelect: this.props.onRowsSelect,
		};

		return (
			<MUIDataTable
			  title={"Medical Data"}
			  data={this.props.data}
			  columns={columns}
			  options={options}
			/>
		)
	}
}