import React, { Component } from 'react';
import SideImageDisplay from '../components/login/SideImageDisplay';
import LoginDisplay from '../components/login/LoginDisplay';
import './LoginContainer.css';


const LoginContainer = (props) => (
  <div className="login-container">
    <SideImageDisplay />
    <LoginDisplay handleChange={props.handleChange} userDetails={props.userDetails} action={props.action} />
  </div>
);

export default LoginContainer;
