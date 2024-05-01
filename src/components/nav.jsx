import * as React from "react";
import { scroller } from "react-scroll";
import PropTypes from "prop-types";
import "./nav.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { Link, useNavigate } from "react-router-dom";
import { auth, storage } from "/src/firebase.js"; // Import storage from firebase
import { getDownloadURL, ref } from "firebase/storage"; // Import getDownloadURL and ref from firebase storage

const drawerWidth = 260;
const navItems = [
  { text: "HOME", link: "#home" },
  { text: "CATEGORIES", link: "#categories" },
  { text: "REVIEWS", link: "#reviews" },
  { text: "ABOUT US", link: "/aboutus" },
];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [profilePic, setProfilePic] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

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

  React.useEffect(() => {
    const fetchProfilePic = async (currentUser) => {
      try {
        if (currentUser) {
          // Get the collection ID of the profile picture
          const collectionId = `profile_images/${currentUser.email}`;
          // Reference to the profile image in Firebase Storage
          const storageRef = ref(storage, collectionId);
          // Get the download URL for the profile image
          const url = await getDownloadURL(storageRef);
          setProfilePic(url); // Set the profilePic state with the URL
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error);
        setLoading(false);
      }
    };

    const currentUser = auth.currentUser;
    fetchProfilePic(currentUser);
  }, []);

  const getNavLink = (item) => {
    if (item.text === "ABOUT US") {
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
            sx={{
              color: "white",
              fontWeight: "400",
              marginRight: "25px",
              fontSize: "15px",
            }}
            className="nav-button"
          >
            {item.text}
          </Button>
        </Link>
      );
    } else {
      return (
        <Button
          key={item.text}
          onClick={() => scrollToId(item.link.slice(1))}
          sx={{
            color: "white",
            fontWeight: "400",
            marginRight: "25px",
            fontSize: "15px",
          }}
          className="nav-button"
        >
          {item.text}
        </Button>
      );
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const renderProfileCircle = () => {
    const avatarStyle = {
      cursor: "pointer",
      width: "45px",
      height: "45px",
      backgroundColor: "white",
      color: "black",
      backgroundImage: `url(${profilePic || "/user.png"})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };

    return (
      <Avatar className="avatarr" onClick={handleProfileClick} sx={avatarStyle}>
        {!loading || !profilePic}
      </Avatar>
    );
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link to="/">
          <a>
            <img className="logo-black" src="/logo_black.png" alt="" />
          </a>
        </Link>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton sx={{ textAlign: "center", color: "black" }}>
              <ListItemText primary={getNavLink(item)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: "auto", mb: 2 }}>
        {renderProfileCircle()} {/* Render the profile picture circle */}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "black" }}>
        <Toolbar sx={{ padding: "0 5rem 0 5rem !important" }}>
          <IconButton
            className="navicon"
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ ml: "auto", display: { sm: "none" } }}
          >
            <MenuIcon />
            <img className="logo-white" src="/logo_white.png" alt="" />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <img className="logo-white" src="/logo_white.png" alt="" />
          </Typography>
          <Box
            sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}
          >
            {" "}
            {/* Added alignItems for centering */}
            {navItems.map((item) => getNavLink(item))}
            {renderProfileCircle()} {/* Render the profile picture circle */}
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
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
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
