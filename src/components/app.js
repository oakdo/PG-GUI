import React, { Component } from 'react';
// import {
//   BrowserRouter as Router,
//   Link,
//   Route, Switch,
// } from 'react-router-dom';
import MainContainer from '../container/MainContainer';
import LoginContainer from '../container/LoginContainer';
import ChartContainer from '../container/ChartContainer';
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
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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

  handleFormSubmit(e) {
    e.preventDefault();
    const { type } = e.target;
    const { userDetails } = this.state;
    console.log(userDetails);
    const loginEndPoint = '/server/login';
    const signupEndpoint = '/server/signup';
    const url = type === 'login' ? loginEndPoint : signupEndpoint;

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
          action={this.handleFormSubmit}
        />
        <ChartContainer/>
      </div>
    );
  }
}


export default App;
