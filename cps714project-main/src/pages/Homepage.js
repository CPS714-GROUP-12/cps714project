import { useState } from 'react';
import axios from "axios";
import '../styles/App.css';
import * as React from 'react';
import AppBar from '../components/AppBar';
import { Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import Typist from "react-typist-component";
import playLogo from '../assets/play.jpg';
import food from '../assets/food.jpg';
import language from '../assets/language.jpg';
import experience from '../assets/experience.jpg';
// import ChatFeed from './components/ChatFeed';

import LiveFeed from '../components/Chat';
import LanguagePageCard from './LanguagePage';
import MapLocation from './Map';

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
    <div class="float-container">
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


      <div class="float-child1">
        <div class="row1">
        <div class="child1">
        <a href="/restaurant">
          <div class="card" >
          <img src={food} alt="Food" class="responsive"/>
              <h4> Restaurant Recommendations</h4>
          </div>
          </a>

          <a href="/entertainment">
            <div class="card">
            <img src={playLogo} alt="PlayLogo" class="responsive"/>
              <h4> Entertainment Near You</h4>
            </div>
            </a>
            </div>
          </div>

        <div class="row2" >
        <div class="child2">
        <a href="/restaurant">
          <div class="card">
          <img src={experience} alt="Experience" class="responsive"/>
             <h4>Experiences</h4>
           </div>
           </a>

        <a href="/language_help">
          <div class="card">
          <img src={language} alt="LanguageHelp" class="responsive"/>
             <h4> Language Help</h4>
           </div>
           </a>
           </div>
        </div>
       </div>


        <div class="float-child2">
            <div class="card" id="location">
            {/* <img src={gpsLogo} alt="MyGps" class="responsive"/> */}
            <h4> Location </h4>
            <Card sx={{ maxWidth: 450 }}>
              <CardActionArea>
                {/* <CardMedia
                  component="img"
                  height="140"
                  image={require("../assets/toronto.jpg")}
                  alt="toronto map"
                /> */}
                <CardContent >
                  <Typography gutterBottom variant="h8" component="div">
                    Your Location: Toronto
                    {MapLocation}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            </div>


            <div class="card" id="chatbox"  >
            <h4> Chat Timeline </h4>
            <div id="chatbox">
              <LiveFeed/>
            </div>
            </div>


        </div>
    </div>
  );
};
