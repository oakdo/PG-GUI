import React from 'react';
import './LoginDisplay.css';


const LogInDisplay = (props) => (
  <div className="login-display">
    <div className="form-group">
      <label htmlFor="email" className="form-label">
          Email:
      </label>
      <input className="form-input" name="email" type="text" value={props.userDetails.email} onChange={props.handlechange} placeholder="email" required />
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
