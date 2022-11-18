import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RestaurantCard from '../components/Card';
import AppBar from "../components/AppBar";
import { CardActionArea } from '@mui/material';
import '../styles/App.css';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Restaurant() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  return (
    <div>
    <AppBar> </AppBar>
    <div class="row">
    <h4 id="intro-title"> Restaurant Recommendations Page </h4>
        <div class="column">
            <div class="card">
                <RestaurantCard>
                </RestaurantCard>
            </div>
        </div>

        <div class="column">
            <div class="card"> <h4> Location </h4>  
            <Card sx={{ maxWidth: 450 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={require("../assets/toronto.jpg")}
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
            `
            `
         <div class="column">
            <div class="card">
             <Card class="card" sx={{ maxWidth: 450 }}>
            <h4> Restaurants Near Your Current Location </h4>
            <CardActions disableSpacing>
                <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                <Typography paragraph>Expand the card to see a list of restaurants near you right now.
                </Typography> 
                </CardContent>
            </Collapse>
            </Card>
        </div>   
        </div>        
    

                </div>
            </div>        

  );
}