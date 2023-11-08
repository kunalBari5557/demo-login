import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Home from "./components/Home";
import { AiFillHome, AiFillVideoCamera } from "react-icons/ai";
import { SiSimpleanalytics } from "react-icons/si";
import Shorts from "./components/Shorts";
import Analytics from "./components/Analytics";
import { Link, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import SignUp from "./components/Auth/Auth";
import LogoutButton from "./components/LogoutButton/LogoutButton";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidenav() {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {location.pathname !== "/" && ( 
        <AppBar position="fixed" elevation={4} sx={{ backgroundColor: "#ffffff", color: "#2f2f2f" }}>
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" onClick={() => setOpen(!open)} edge="start">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              <img src="./youtube.png" height={40} alt="YouTube Logo" />
            </Typography>
            <LogoutButton/>
          </Toolbar>
        </AppBar>
      )}
      {location.pathname !== "/" && ( 
        <Drawer variant="permanent" open={open}>
          <Divider />
          <List sx={{ marginTop: "4rem" }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AiFillHome />
                </ListItemIcon>
                <Link to="/Home" style={{ color: 'black', textDecoration: 'none' }}>Home</Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                <AiFillVideoCamera />
              </ListItemIcon>
              <Link to="/Shorts" style={{ color: 'black', textDecoration: 'none' }}>Shorts</Link>
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SiSimpleanalytics />
              </ListItemIcon>
              <Link to="/Analytics" style={{ color: 'black', textDecoration: 'none' }}>Analytics</Link>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    )}
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Shorts" element={<Shorts />} />
        <Route path="/Analytics" element={<Analytics />} />
      </Routes>
    </Box>
  </Box>
);
}
