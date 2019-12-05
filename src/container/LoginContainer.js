import React, { Component } from 'react';
import SideImageDisplay from '../components/login/SideImageDisplay'
import LoginDisplay from '../components/login/LoginDisplay'


class LoginContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {

    };
  };




  render () {
    return (
      <div 
      display = "flex"
      

      >
        <SideImageDisplay/>
        <LoginDisplay/>
      </div>
    )
  }
}

export default LoginContainer;