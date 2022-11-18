import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import axios, { Axios } from "axios";
import { Box } from "@mui/system";
import { Star } from "@mui/icons-material";

const Marker = (options) => {
  const [marker, setMarker] = React.useState();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);
  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);
  return null;
};
const GoogleMap = ({ center }) => {
  const ref = useRef();
  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center,
      zoom: 16,
    });
  }, [center]);
  return <div ref={ref} id="map" style={{ height: "100vh" }} />;
};

const render = (status) => {
  switch (status) {
    case Status.LOADING:
      return <div>Loading...</div>;
    case Status.FAILURE:
      return <div>Error</div>;
    default:
      return null;
  }
};

const MyApp = ({ coords }) => {
  const center = { lat: coords.latitude, lng: coords.longitude };
  return (
    <Wrapper apiKey={"AIzaSyAXf5iZ79WWzZ3gf17SVyM9b6i6vOS_QNk"} render={render}>
      <GoogleMap center={center}>
        <Marker position={center} />
      </GoogleMap>
    </Wrapper>
  );
};

const RestaurantsRecommendation = () => {
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
      .get("http://localhost:5000/restaurant/recommendation", {
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

RestaurantsRecommendation.propTypes = {};

RestaurantsRecommendation.defaultProps = {};

export default RestaurantsRecommendation;