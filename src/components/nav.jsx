import * as React from 'react';
import "./page1.css"
import PropTypes from 'prop-types';
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
import { Link } from 'react-scroll'; 

const drawerWidth = 260;
const navItems = ['HOME', 'CATEGORIES', 'REVIEWS', 'ABOUT US', 'CONTACT US'];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container = window !== undefined ? () => window().document.body : undefined;
  const closeDrawer = () => {
    setMobileOpen(false);
  };

  const getNavLink = (item) => (
    <Link
      key={item}
      to={item.toLowerCase()} 
      spy={true}
      smooth={true}
      duration={500}
      offset={-200}
      onClick={closeDrawer}
    >
      <Button
        sx={{ color: 'white', fontWeight: '400', marginRight: '25px', fontSize: '15px' }}
        className='nav-button'
      >
        {item}
      </Button>
    </Link>
  );

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center'}}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <img className='logo-black' src="/logo_black.png" alt="" />
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center', color:'black'}}>
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
      <AppBar component="nav" sx={{backgroundColor: "black"}}>
        <Toolbar sx={{ padding: "0 5rem 0 5rem !important" }}>
          <IconButton className='navicon'
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ ml: 'auto', display: { sm: 'none' }}}
          >
            <MenuIcon />
            <img className='logo-white' src="/logo_white.png" alt="" />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }}}
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
