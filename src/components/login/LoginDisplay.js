import React from 'react';
import './LoginDisplay.css';


const LogInDisplay = (props) => (
  <div className="login-display">
    <div className="form-group">
      <input placeholder="username" />
      <input placeholder="password" />
      <button>Login</button>
      <button>Sign Up</button>
      <div>
        <a href="http://localhost:3000/login" className="button">Login With Github</a>
      </div>
    </div>
  </div>
);


export default LogInDisplay;
