import React, { Component } from 'react'
import { UserGroup } from 'radiks';

import RecordForm from '../Forms/RecordForm.jsx';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default class SubmitForm extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        firstName: "",
        lastName: "",
        age: 0,
        date: "",
        symptoms: "",
        diagnosis: "",
        treatment: "",
      }
  }

  handleClick = () => {
    this.props.onSubmitForm(this.state.firstName,this.state.lastName,this.state.age,this.state.date,this.state.symptoms,this.state.diagnosis,this.state.treatment);
  }

  render() {
    let styles = {
      'margin': '20px',
      'backgroundColor': '#808585',
    };

    return (
      <div style={{'margin': '0px auto', 'background-color': '#fa8072', 'width': '50%', 'padding': '20px', 'align': 'center'}}>
        <div>
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              New Health Record
            </Typography>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  ref="field1"
                  id="firstName"
                  name="firstName"
                  label="First name"
                  fullWidth
                  autoComplete="fname"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={e => this.setState({ firstName: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  ref="field2"
                  required
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  fullWidth
                  autoComplete="lname"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={e => this.setState({ lastName: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  ref="field3"
                  required
                  id="age"
                  name="age"
                  label="Age"
                  fullWidth
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={e => this.setState({ age: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  ref="field4"
                  id="date"
                  name="date"
                  label="Date"
                  fullWidth
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={e => this.setState({ date: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="symptoms"
                  name="symptoms"
                  label="Symptoms"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={e => this.setState({ symptoms: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField 
                  id="diagnosis" 
                  name="diagnosis" 
                  label="Diagnosis" 
                  fullWidth 
                  InputLabelProps={{
                    shrink: true,
                  }} 
                  onChange={e => this.setState({ diagnosis: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="treatment"
                  name="treatment"
                  label="Treatment"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={e => this.setState({ treatment: e.target.value })}
                />
              </Grid>
            </Grid>
          </React.Fragment>
          <Button variant="outlined" style={styles} onClick={this.handleClick}>Upload</Button>
        </div>
      </div>
    )
  };
}
