import * as React from 'react';
import { scroller } from 'react-scroll';
import PropTypes from 'prop-types';
import "./nav.css";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
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
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "/src/firebase.js";

const drawerWidth = 260;
const navItems = [
  { text: 'HOME', link: '#home' },
  { text: 'CATEGORIES', link: '#categories' },
  { text: 'REVIEWS', link: '#reviews' },
  { text: 'ABOUT US', link: '/aboutus' },
  { text: 'LOG OUT', link: '/logout' },
];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  const closeDrawer = () => {
    setMobileOpen(false);
  };

  const scrollToId = (id) => {
    scroller.scrollTo(id, {
      duration: 500,
      delay: 100,
      smooth: true,
      offset: -200,
    });
    closeDrawer();
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/signin"); // Redirect to the sign-in page after successful logout
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle logout error if needed
    }
  };

  const getNavLink = (item) => {
    if (item.text === 'ABOUT US') {
      return (
        <Link
          key={item.text}
          to={item.link.toLowerCase()}
          spy={true}
          smooth={true}
          duration={500}
          offset={-100}
          onClick={closeDrawer}
        >
          <Button
            sx={{ color: 'white', fontWeight: '400', marginRight: '25px', fontSize: '15px' }}
            className='nav-button'
          >
            {item.text}
          </Button>
        </Link>
      );
    } else if (item.text === 'LOG OUT') {
      return (
        <Button
          key={item.text}
          onClick={handleLogout}
          sx={{ color: 'white', fontWeight: '400', marginRight: '25px', fontSize: '15px' }}
          className='logout'
        >
          {item.text}
        </Button>
      );
    } else {
      return (
        <Button
          key={item.text}
          onClick={() => scrollToId(item.link.slice(1))}
          sx={{ color: 'white', fontWeight: '400', marginRight: '25px', fontSize: '15px' }}
          className='nav-button'
        >
          {item.text}
        </Button>
      );
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link to="/">
          <a>
            <img className='logo-black' src="/logo_black.png" alt="" />
          </a>
        </Link>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton sx={{ textAlign: 'center', color: 'black' }}>
              <ListItemText primary={getNavLink(item)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "black" }}>
        <Toolbar sx={{ padding: "0 5rem 0 5rem !important" }}>
          <IconButton className='navicon'
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ ml: 'auto', display: { sm: 'none' } }}
          >
            <MenuIcon />
            <img className='logo-white' src="/logo_white.png" alt="" />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <img className='logo-white' src="/logo_white.png" alt="" />
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => getNavLink(item))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
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
      </nav>
      <Box component="main" sx={{ p: 0 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
