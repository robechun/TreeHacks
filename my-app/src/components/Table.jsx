import MUIDataTable from "mui-datatables";
import React, { Component } from 'react';

export default class Table extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
      
    }
	render() {
		const columns = ["Date", "Name", "Access"];

		const data = [
		 ["04/03/17", "Most Recent File", "jaylee29"],
		 ["03/19/16", "Im Sick", "jaylee29, robertchung"]
		];

		const options = {
		  filterType: 'checkbox',
		};

		return (
			<MUIDataTable
			  title={"Medical Data"}
			  data={data}
			  columns={columns}
			  options={options}
			/>
		)
	}
}
