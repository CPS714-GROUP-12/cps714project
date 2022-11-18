//edit user profile

import { useState } from 'react';
import axios from "axios";
import '../styles/App.css';
import * as React from 'react';
//import { AppBar } from '@mui/material';
import AppBar from '../components/AppBar';
import LanguageHelpTab from './LanguageHelp';

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
      <h2>Choose your language: </h2>
        <div className="user-box">
          <LanguageHelpTab/>
          </div>
    </div>
    </div>

  );
};