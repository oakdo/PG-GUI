import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MainContainer from './container/MainContainer';
import LoginContainer from './container/LoginContainer';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
      <LoginContainer />
    </Provider>,
    document.getElementById('root'),
);
