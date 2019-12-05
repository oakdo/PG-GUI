import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route, // for later
} from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MainContainer from './container/MainContainer';
import LoginContainer from './container/LoginContainer';
import store from './store';
import Header from './components/header/header';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Header />
        <Route exact path="/" component={LoginContainer} />
        <Route path="/home" component={MainContainer} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
