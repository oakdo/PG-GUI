import React, { Component } from 'react';
import SideImageDisplay from '../components/login/SideImageDisplay';
import LoginDisplay from '../components/login/LoginDisplay';
import './LoginContainer.css';


const LoginContainer = (props) => (
  <div className="login-container">
    <SideImageDisplay />
    <LoginDisplay handleChange={props.handleChange} userDetails={props.userDetails} handleSignUp={props.handleSignUp} handleLogin={props.handleLogin} />
  </div>
);

export default LoginContainer;
