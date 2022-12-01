import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./EventsRecommendation.module.css";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import axios from "axios";
import MyApp from "./MyApp";

const EventsRecommendation = () => {
  const [placesPage, setPlacesPage] = useState({});
  const [coords, setCoords] = useState({
    latitude: 0.0,
    longitude: 0.0,
  });

  const handleCurrentLocation = (e) => {
    navigator.geolocation.getCurrentPosition((geolocationPosition) => {
      setCoords(geolocationPosition.coords);
    });
    e.preventDefault();
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/events/recommendation", {
        params: {
          lat: coords.latitude,
          lng: coords.longitude,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setPlacesPage(response.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [coords]);

  return (
    <Grid container>
      <Grid item md={4}>
        <Button onClick={handleCurrentLocation}>CURRENT LOCATION</Button>
        {placesPage &&
          placesPage.results &&
          placesPage.results.map((r) => (
            <Card key={r.place_id}>
              <CardHeader title={r.name}></CardHeader>
              <CardContent>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="caption">{r.business_status}</Typography>
                  <Rating value={r.rating}></Rating>
                </Box>
                <Typography variant="body2">{r.formatted_address}</Typography>
              </CardContent>
            </Card>
          ))}
      </Grid>
      <Grid item md={8}>
        <MyApp coords={coords} />
      </Grid>
    </Grid>
  );
};

EventsRecommendation.propTypes = {};

EventsRecommendation.defaultProps = {};

export default EventsRecommendation;
