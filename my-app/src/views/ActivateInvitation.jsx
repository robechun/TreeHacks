import React from 'react'
import Input from '@material-ui/core/Input'
import { GroupInvitation } from 'radiks';
import Button from "@material-ui/core/Button";


export default class ActivateInvitation extends React.Component {
  constructor(props) {
    // console.log('hello we are here');
    // console.log('props');
  	super(props);
    // console.log('now again');

    this.state = {
      inputVal: '',
    };
  }

  componentDidMount = () => {
      console.log('inside activate comp mount');
  }

  handleActivate = async () => {
    // (async () => {
      console.log(this.state.inputVal);
      const invitation = await GroupInvitation.findById(this.state.inputVal);
      console.log('yellow')
      console.log(invitation)
      await invitation.activate().catch(err => console.log(err))
      console.log('done with activate async')
    // })();
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
        <Button variant="contained" onClick={() => this.handleActivate()}>
            Activate
        </Button>
      </div>
    )
  }
}
