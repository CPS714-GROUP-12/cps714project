//edit user profile 

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import '../App.css';
import * as React from 'react';
//import { AppBar } from '@mui/material';
import AppBar from './components/AppBar';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import ExpandCard from './components/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import Typist from "react-typist-component";
import TextField from '@mui/material/TextField';

export default function Homepage(props) {

  //code copied from Profile.js. 
  //Note: reduce repetitive code! - F.R.
  const [EditProfileForm, setEditProfileForm] = useState({
    email: "",
    username: "",
    password: "",
    verify_password: "",
    first_name: "",
    last_name: ""
  })

  function EditProfile(event) {
    axios({
      method: "POST",
      url:"/EditProfile",
      data:{
        email: EditProfileForm.email,
        username: EditProfileForm.username,
        password: EditProfileForm.password,
        verify_password: EditProfileForm.verify_password,
        first_name: EditProfileForm.first_name,
        last_name: EditProfileForm.last_name,
       }
    })
    .then((response) => {
      props.setToken(response.data.access_token)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })

    setEditProfileForm(({
      email: "",
      username: "",
      password: "",
      verify_password: "",
      first_name: "",
      last_name: ""}))

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
                  type="verify_password"
                  text={EditProfileForm.verify_password}
                  name="verify_password"
                  value={EditProfileForm.verify_password}
                  required="" />
          <label>Verify Password</label>
        </div>

        <a href="#">
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
