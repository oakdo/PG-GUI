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
import ChartContainer from './container/ChartContainer'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Header />
        <Route path="/home" component={MainContainer} />
        <Route path="/" component={ChartContainer} />
        {/* <Route path="/" component = {LoginContainer} /> */}
      </div>



    </Router>
  </Provider>,
  document.getElementById('root'),
);
