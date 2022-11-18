import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Typist from "react-typist-component";

import "../../App.css";
const drawerWidth = 240;
const navItems = ['Home', 'Edit Profile', 'Contact Us'];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // improve repetitve code F.R. 

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', color: '#fff'}} id="appbar">
      <Typography variant="h6" sx={{ my: 2 }} >
        Vacatio
      </Typography>
      <Divider />
      <List id="appbar">
      <a href="/homepage">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'center', color: '#fff' }}>
              <ListItemText primary={navItems[0]} />
            </ListItemButton>
          </ListItem>
          </a>

          <a href="/userprofile">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'center', color: '#fff'}}>
              <ListItemText primary={navItems[1]} />
            </ListItemButton>
          </ListItem>
          </a>

          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'center', color: '#fff' }}>
              <ListItemText primary={navItems[2]} />
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" id="appbar"  >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', textAlign: 'left' } }}
          >
            <a href="/homepage">
              <Button id="btn"  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', textAlign: 'left' }, color: '#fff' }}>
                Vacatio
              </Button>
             </a>
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <a href="/homepage">
              <Button id="appbar-hover" sx={{ color: '#fff' }}>
                {navItems[0]}
              </Button>
              </a>

              <a href="/userprofile">
              <Button id="appbar-hover" sx={{ color: '#fff' }}>
                {navItems[1]}
              </Button>
              </a>

              <a href="/contact">
              <Button id="appbar-hover" sx={{ color: '#fff' }}>
                {navItems[2]}
              </Button>
              </a>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        
      </Box>
    </Box>
  );
}

export default DrawerAppBar;
