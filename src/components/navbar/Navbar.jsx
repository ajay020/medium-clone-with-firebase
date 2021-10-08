import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../features/users/authMethods";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { AppBar, Avatar, IconButton, Toolbar, Typography } from "@mui/material";
import Popover from "@mui/material/Popover";
import "./navbar.css";
import BlackButton from "./../BlackButton";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { ColorModeContext } from "./../../App";
import { useTheme } from "@mui/material/styles";
const useStyles = makeStyles((theme) => {
  return {
    light: {
      display: "flex",
      alignItems: "center",
    },
    nav_right: {
      flexGrow: 1,
      marginLeft: "auto",
      color: theme.palette.text.primary,
      //   background: theme.palette.text.primary,
    },
    nav_item: {
      padding: "8px",
      borderRadius: "50px",
      color: theme.palette.text.primary,
      "&:hover": {
        color: "black",
        cursor: "pointer",
      },
    },
    themeBtn: {
      [theme.breakpoints.between("xs", "sm")]: {
        display: "none",
      },
    },
    bioItem: {
      padding: "2px",
      margin: "2px",
    },
  };
});

const Navbar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const currentUser = useSelector((state) => state.users.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.light}>
        <IconButton>
          <Link to="/" underline="none">
            <Avatar src="/logo2.png" variant="square" />
          </Link>
        </IconButton>
        <Typography
          className={classes.nav_right}
          component={Link}
          to="/"
          variant="h4"
        >
          {/* <Link className={classes.nav_item} to="/"> */}
          Medium
          {/* </Link> */}
        </Typography>

        <Typography variant="subtitle1" className={classes.themeBtn}>
          {theme.palette.mode} mode{" "}
        </Typography>
        <Typography variant="subtitle1">
          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Typography>

        {currentUser && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              className={classes.nav_item}
              variant="subtitle1"
              component={Link}
              to="/write"
              ml={2}
            >
              Write
            </Typography>

            <Box sx={{ marginRight: "40px", marginLeft: "22px" }}>
              <Avatar
                aria-describedby={id}
                onClick={handleClick}
                sx={{ width: 24, height: 24 }}
                src=""
              />
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                sx={{ padding: "10px", overflow: "scroll" }}
              >
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar></Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={currentUser?.name}
                      secondary={currentUser?.email}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <ListItemText secondary=" Write a story." />
                  </ListItem>
                  <ListItem button>
                    <ListItemText secondary="Stories" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText secondary="Stats" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText secondary=" Design your profile" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText secondary="Settings" />
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <ListItemText secondary="Lists" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText secondary="Publications" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText secondary="Control your recommendations" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText secondary="Medium partner program" />
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <ListItemText secondary="Become a member" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText secondary="Help" />
                  </ListItem>
                  <ListItem button onClick={() => logout()}>
                    <ListItemText secondary="Sign Out" />
                  </ListItem>
                </List>
              </Popover>
            </Box>
          </Box>
        )}

        {!currentUser && (
          <Box>
            <Typography
              className={classes.nav_item}
              variant="subtitle1"
              component={Link}
              to="/about"
              ml={2}
            >
              Our Story
            </Typography>
            <Typography
              className={classes.nav_item}
              variant="subtitle1"
              to="/login"
              component={Link}
              ml={2}
              mr={2}
            >
              SignIn
            </Typography>
            <BlackButton text="Get Started" />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
