import React, { Component } from 'react';
import SideImageDisplay from '../components/login/SideImageDisplay';
import LoginDisplay from '../components/login/LoginDisplay';
import './LoginContainer.css';


class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {
        email: '',
        password: '',
      },

    };
    this.handleInput = this.handleInput.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInput(e) {
    const { value } = e.target;
    const { name } = e.target;
    this.setState(
      (prevState) => ({
        userDetails: {
          ...prevState.userDetails,
          [name]: value,
        },
      }),
      () => console.log('This is my userDetails, ', this.state.userDetails),
    );
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const { type } = e.target;
    const { userDetails } = this.state;
    console.log(userDetails);
    const loginEndPoint = '/server/login';
    const signupEndpoint = '/server/signup';
    // const url = type === 'login' ? loginEndPoint : signupEndpoint;
    // TODO: replace this with conditional for login and sign up once testing has finishied
    const url = loginEndPoint;

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="login-container">
        <SideImageDisplay />
        <LoginDisplay handlechange={this.handleInput} userDetails={this.state.userDetails} action={this.handleFormSubmit} />
      </div>
    );
  }
}

export default LoginContainer;
