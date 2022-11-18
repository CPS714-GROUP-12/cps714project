import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useState } from 'react'

// { m: 1, width: '90%', position: 'relative' }
const currencies = [
  {
    value: 'Restaurant',
    label: 'Restaurant',
  },
  {
    value: 'Music',
    label: 'Music',
  },
  {
    value: 'Movie',
    label: 'Movie',
  },
  {
    value: 'Festival',
    label: 'Festival',
  },
];


export default function LiveFeed(props) {
    
    const [category, setCategory] = React.useState('EUR');

    const handleChange = (event) => {
    setCategory(event.target.value);
    };

    // const [value, setValue] = React.useState(' ');

  return (
    <div>
    <List sx={{ width: '100%', bgcolor: 'background.paper',  position: 'relative', overflow: 'auto', maxHeight: 300 }}>
      <ListItem alignItems="flex-start">  
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        {/* <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar> */}
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                to Scott, Alex, Jennifer
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        {/* <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar> */}
        <ListItemText
          primary="Oui Oui"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Sandra Adams
              </Typography>
              {' — Do you have Paris recommendations? Have you ever…'}
            </React.Fragment>
          }
        />
      </ListItem>

      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        {/* <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar> */}
        <ListItemText
          primary="Oui Oui"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Sandra Adams
              </Typography>
              {' — Do you have Paris recommendations? Have you ever…'}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        {/* <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar> */}
        <ListItemText
          primary="Oui Oui"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Sandra Adams
              </Typography>
              {' — Do you have Paris recommendations? Have you ever…'}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
    <FormControl sx={{ m: 1, width: '90%' }}>
    <TextField
         id="outlined-select-category"
         select
         label="Select a Category"
         value={category}
         onChange={handleChange}
         helperText=" "
       >
         {currencies.map((option) => (
           <MenuItem key={option.value} value={option.value}>
             {option.label}
           </MenuItem>
         ))}
       </TextField>
       <TextField
          required
          id="multiline-flexible"
          label="Share your thoughts"
          multiline
          maxRows={2}
        //   value={value}
          onChange={handleChange}
          inputProps={{ maxLength: 250 }}
        />
        <Button sx={{ m: 1, width: '50%'}} variant="contained" type="submit"
        endIcon={<SendIcon />} >
            Send
        </Button>
        <Button sx={{ m: 1, width: '50%'}} variant="contained" type="submit"
        endIcon={<SendIcon />} >
            Refresh
        </Button>
    </FormControl>
    </div>
  );
}