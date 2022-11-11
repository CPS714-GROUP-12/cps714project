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


export default function Homepage(props) {

  //code copied from Profile.js. 
  //Note: reduce repetitive code! - F.R.

  const [profileData, setProfileData] = useState(null)
  function getData() {
    axios({
      method: "GET",
      url:"/profile",
      headers: {
        Authorization: 'Bearer ' + props.token
      }
    })
    .then((response) => {
      const res =response.data
      res.access_token && props.setToken(res.access_token)
      setProfileData(({
        profile_name: res.name,
        about_me: res.about}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}
    
  return (
    <div>
      <AppBar/>
      <div class="row">
      <Typography>
            <Typist typingDelay={100} cursor={<span className="cursor"></span>}>
            <span id="intro-title">
            {"Welcome back, "}
            {/* <span id="intro-name">{profileData.profile_name}</span> */}
            <span id="intro-name">{"user."}</span> 
          </span>
            </Typist>
        </Typography>
        </div>
      <div class="row">
        <div class="column">
          <a href="/restaurant"> 
                <ExpandCard>
                   <h4> Restaurant Recommendations</h4> 
                   <CardContent> <Typography> Test </Typography></CardContent> 
                   </ExpandCard>
            </a>
          </div>      

          <div class="column">
            <div class="card">
              <h4> Entertainment Near You</h4>
            </div>
          </div>

          <div class="column">
            <div class="card"> <h4> Location </h4>  
            <Card sx={{ maxWidth: 450 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={require("./toronto.jpg")}
                  alt="toronto map"
                />
                <CardContent>
                  <Typography gutterBottom variant="h8" component="div">
                    Your Location: Toronto
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            </div>        
          </div>

          <div class="column">
            <div class="card">  <h4> Other </h4>

            </div>        
          </div>

        <div class="column">
          <div class="card">  <h4> Language Help</h4>
           </div>        
        </div>

        <div class="column">
          <div class="card">  <h4>Experiences</h4> 
           </div>
        </div>




      </div>
    </div>
  );
};
