import React from 'react';
import './LoginDisplay.css';


const LogInDisplay = (props) => (
  <div className="login-display">
    <div className="form-group">
      <label htmlFor="username" className="form-label">
          Username:
      </label>
      <input className="form-input" name="username" type="text" value={props.userDetails.username} onChange={props.handlechange} placeholder="username" required />
      <label htmlFor="password" className="form-label">
          Password:
      </label>
      <input className="form-input" name="password" type="password" value={props.userDetails.password} onChange={props.handlechange} placeholder="password" required />
      <button type="login" onClick={props.action}>Login</button>
      <button type="signup" onClick={props.action}>Sign Up</button>
      <div>
        <a href="http://localhost:3000/githubsignin" className="button">Login With Github</a>
      </div>
    </div>
  </div>
);


export default LogInDisplay;
