//edit user profile 

import { useState } from 'react';
import axios from "axios";
import '../styles/App.css';
import ReactDOM from 'react-dom';
import * as React from 'react';
//import { AppBar } from '@mui/material';
import AppBar from '../components/AppBar';

export default function Homepage(props) {

  //code copied from Profile.js. 
  //Note: reduce repetitive code! - F.R.
  const myelement = (
        <p id="signup-link"> Please try again. Password must have a minimum length of 6 and contain lowercase letters, uppercase letters and a number. </p>
    );
    const myelement2 = (
        <p id="signup-link"> Profile Edited Successfully! </p>
    );

  const [EditProfileForm, setEditProfileForm] = useState({
    email: "",
    username: "",
    password: "",
    verify_password: "",
  })

  function EditProfile(event) {
    axios({
      method: "POST",
      url:"/userprofile",
      data:{
        email: EditProfileForm.email,
        username: EditProfileForm.username,
        password: EditProfileForm.password,
        verify_password: EditProfileForm.verify_password,
       }
    })
    .then((response) => {
      ReactDOM.render(myelement2, document.getElementById('boxy'));
      props.setToken(response.data.access_token)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        ReactDOM.render(myelement, document.getElementById('boxy'));
        }
    })

    setEditProfileForm(({
      email: "",
      username: "",
      password: "",
      verify_password: "",
    }))

    event.preventDefault()
  }

  function handleChange(event) {
    const {value, name} = event.target
    setEditProfileForm(prevNote => ({
        ...prevNote, [name]: value})
    )}

  return (
    <div>
      <AppBar/>  
      <div className="login-box">
      <h2>Edit Profile</h2>
      <form>

        <div id="boxy"> </div>
        <div className="user-box">
          <input  onChange={handleChange}
                  type="email"
                  text={EditProfileForm.email}
                  name="email"
                  value={EditProfileForm.email}
                  required="" />
          <label> Change Email</label>
        </div>


        <div className="user-box">
          <input onChange={handleChange}
                  type="username"
                  text={EditProfileForm.username}
                  name="username"
                  value={EditProfileForm.username}
                  required="" />
          <label>Change Username</label>
        </div>


        <div className="user-box">
          <input onChange={handleChange}
                  type="password"
                  text={EditProfileForm.password}
                  name="password"
                  value={EditProfileForm.password}
                  required="" />
          <label>Change Password</label>
        </div>


        <div className="user-box">
          <input onChange={handleChange}
                  type="password"
                  text={EditProfileForm.verify_password}
                  name="verify_password"
                  value={EditProfileForm.verify_password}
                  required="" />
          <label>Verify Password</label>
        </div>

        <a href="/">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <button onClick={EditProfile}>Submit</button>
        </a>
      </form>
    </div>
    </div>

  );
};
