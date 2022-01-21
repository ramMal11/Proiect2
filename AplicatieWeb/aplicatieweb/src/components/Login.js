
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router'

// async function loginUser(userName, pwd) {
//  return fetch(`http://localhost/7001/api/users/${userName}/${pwd}`, {
//    method: 'GET'
//  })
//    .then(data => data.json())
// }

async function loginUser(userName, pwd) {
    console.log(userName + "xxxx")
    console.log(pwd + "yyyyy")
    return fetch(`http://localhost/7001/api/users/${userName}/${pwd}`
    // , {
    //     method: 'GET',
    //     headers: {
    //     "Accept": "application/json",
    //     'Content-Type': 'application/json'
    //     }
    // }
    )
    .then(response => { return response.json();})
    .then(responseData => {console.log(responseData); return responseData;})


    // .catch(err => {
    //     console.log("fetch error" + err);
    // });
   }


export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  //console.log(username + "bbbbb")

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser(
      username,
      password
    );
    setToken(token);
  }

  
  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="text" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};