import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function RecordForm() {
  let styles = {
    'margin': '20px',
    'backgroundColor': '#808585',
  };
  return (
    <div>
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          New Health Record
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="fname"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="lname"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="age"
              name="age"
              label="Age"
              fullWidth
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="date"
              name="date"
              label="Date"
              fullWidth
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
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
              }} />
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
            />
          </Grid>
        </Grid>
      </React.Fragment>
      <Button variant="outlined" style={styles} onClick={this.props.onSubmitForm}>Upload</Button>
    </div>
  );
}

export default RecordForm;