import React, { Component } from 'react'
import { UserGroup } from 'radiks';
import Button from '@material-ui/core/Button'

import RecordForm from '../Forms/RecordForm.jsx';

export default class SubmitForm extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    let styles = {
      'margin': '20px',
      'backgroundColor': '#808585',
    };

    return (
      <div style={{'margin': '0px auto', 'background-color': '#fa8072', 'width': '50%', 'padding': '20px', 'align': 'center'}}>
        <RecordForm />
        <Button variant="outlined" style={styles} >Upload</Button>
      </div>
    )
  };
}
