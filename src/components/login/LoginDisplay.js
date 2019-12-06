import React from 'react';
import './LoginDisplay.css';


const LogInDisplay = (props) => (
  <div className="login-display">
    <div className="form-group">
      <label htmlFor="email" className="form-label">
          Email:
      </label>
      <input className="form-input" name="email" type="text" value={props.userDetails.username} onChange={props.handleChange} placeholder="Enter email" required />
      <label htmlFor="password" className="form-label">
          Password:
      </label>
      <input className="form-input" name="password" type="password" value={props.userDetails.password} onChange={props.handleChange} placeholder="Enter password" required />
      <div>
        <button className="button" type="login" onClick={props.action}>Login</button>
        <span>or</span>
        <button className="button" type="signup" onClick={props.action}>Sign Up</button>
      </div>
      <div className="github">
        <a href="http://localhost:3000/githubsignin" className="login-with-git">Login With Github</a>
      </div>
    </div>
  </div>
);


export default LogInDisplay;
