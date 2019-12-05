import React, { Component } from 'react';
import SideImageDisplay from '../components/login/SideImageDisplay';
import LoginDisplay from '../components/login/LoginDisplay';
import './LoginContainer.css';


class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    return (
      <div className="login-container">
        <SideImageDisplay />
        <LoginDisplay />
      </div>
    );
  }
}

export default LoginContainer;
