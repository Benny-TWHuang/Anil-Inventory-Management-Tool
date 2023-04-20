import React, { useState } from 'react';
import './Login.css';
import PropTypes from 'prop-types';

async function loginUser(credentials) {
  return fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.text())
 }

export default function Login({ setToken }) {
  const [region, setRegion] = useState();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      region,
      username,
      password
    });
    setToken(token);
  }
  
  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p className="text">Region</p>
          <select onChange={e => setRegion(e.target.value)}>
            <option>Please select your region.</option>
            <option>GAR</option>
            <option>AMR</option>
            <option>GER</option>
            <option>CCR</option>
          </select>
        </label>
        <label>
          <p className="text" htmlFor="username">Username(IDSID)</p>
          <input type="text" onChange={e => setUserName(e.target.value)} id="username"/>
        </label>
        <label>
          <p className="text">Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div className="submit-but">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}