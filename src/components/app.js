import React, { Component } from 'react';
// import {
//   BrowserRouter as Router,
//   Link,
//   Route, Switch,
// } from 'react-router-dom';
import MainContainer from '../container/MainContainer';
import LoginContainer from '../container/LoginContainer';
import Header from './header/header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {
        email: '',
        password: '',
        isLoggedIn: false,
      },

    };
    this.handleInput = this.handleInput.bind(this);
    this.handleFormSubmitSignUp = this.handleFormSubmitSignUp.bind(this);
    this.handleFormSubmitLogin = this.handleFormSubmitLogin.bind(this);
  }

  //   componentDidMount() {
  //     return {


  //     };
  //   }

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

  handleFormSubmitSignUp(e) {
    e.preventDefault();
    const { userDetails } = this.state;

    const url = '/server/signup';
    console.log('this is the url i am using: ', url);

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then((data) => {
        console.log(`This is the response data for ${url}:`, data);
        alert('Sign Up successful please login now!');
      })
      .catch((err) => console.log(err));
  }

  handleFormSubmitLogin(e) {
    e.preventDefault();
    const { userDetails } = this.state;
    const url = '/server/login';

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then((data) => {
        console.log(`This is the response data for ${url}:`, data);
        this.setState({
          userDetails:
            { isLoggedIn: true },
        });
        console.log(this.state);
        alert('Login successful');
      })
      .catch((err) => console.log(err));
  }


  render() {
    console.log(this.state.userDetails.isLoggedIn);
    if (this.state.userDetails.isLoggedIn) {
      return (
        <div>
          <Header />
          <MainContainer />
        </div>
      );
    }
    return (
      <div>
        <Header />
        <LoginContainer
          handleChange={this.handleInput}
          userDetails={this.state.userDetails}
          handleSignUp={this.handleFormSubmitSignUp}
          handleLogin={this.handleFormSubmitLogin}
        />
      </div>
    );
  }
}


export default App;
