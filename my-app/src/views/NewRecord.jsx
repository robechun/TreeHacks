import React, { Component } from 'react'
import AbstractForm from '../components/Forms/AbstractForm.jsx'

export default class NewRecord extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    // TODO: handler functions for saving. Pass this to abstractform.

  render() {
    return (
      <AbstractForm></AbstractForm>
    )
  }
}
