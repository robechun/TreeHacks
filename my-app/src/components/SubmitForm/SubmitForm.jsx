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
      'opacity': '0.5',
      'background-color': '#808080',
    };

    return (
      <div style={{'margin': '20px'}}>
        <RecordForm />
        <Button variant="outlined" style={styles} >JENNA!</Button>
      </div>
    )
  };
}
