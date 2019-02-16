import React, { Component } from 'react'
import Input from '@material-ui/core/Input'
import { GroupInvitation } from 'radiks';


export default class ActivateInvite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputVal: ''
    }
  }

  componentDidMount = () => {
      console.log('inside activate comp mount');
  }

  handleActivate = () => {
    (async () => {
      const invitation = await GroupInvitation.findById(myInvitationID);
      await invitation.activate();
      console.log('done with activate async')
    })();
  }
  handleChange = event => {
    this.setState({
      inputVal: event.target.value
    });
  }

  render() {
    return (
      <div>
        <Input
          placeholder="Activation Code"
          // className={classes.input}
            inputProps={{
              'aria-label': 'Activation Code',
          }}
          onChange={this.handleChange}
        />
        <Button variant="contained" onClick={this.handleActivate}>
            Activate
        </Button>
      </div>
    )
  }
}
