/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { UserGroup } from 'radiks';
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'

import * as blockstack from 'blockstack'


export default class Collab extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            usernameToInvite: "",
        };
    }

    componentDidMount = () => {
      
    }

    handleInputChange = event => {
        this.setState({ usernameToInvite: event.target.value })
    }
    
    handleShare = () => {
        const group = new UserGroup({ name: 'records-health-' + blockstack.loadUserData().profile.name }); 
        console.log(group);

        (async () => {
            await group.create();
            console.log('two');
            const invitation = await group.makeGroupMembership(this.state.usernameToInvite);
            console.log(invitation._id); // the ID used to later activate an invitation
            // TODO: give this to the user you want to share it with
        })();
    }

    render() {
        return (
            <div>
                <Input
                    placeholder="Username"
                    // className={classes.input}
                    inputProps={{
                        'aria-label': 'Blockstack ID',
                    }}
                    onChange={this.handleInputChange}
                />
                <Button variant="contained" onClick={this.handleShare}>
                    Share
                </Button>
            </div>
            
        )
    }
}
