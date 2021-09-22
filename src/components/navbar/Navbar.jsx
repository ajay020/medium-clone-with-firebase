import "./navbar.css";
import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../features/users/authMethods";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

const ColorButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  backgroundColor: "#000",
  borderRadius: "20px",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "black",
  },
}));

const useStyles = makeStyles((theme) => {
  return {
    light: {
      display: "flex",
      alignItems: "center",
    },
    nav_right: {
      flexGrow: 1,
      marginLeft: "auto",
    },
    nav_item: {
      padding: "8px",
      borderRadius: "50px",
      color: "black",
      "&:hover": {
        //   background: "lightGray",
        color: "gray",
      },
    },
    btn: {
      borderRadius: "50px",
      background: "#000",
      color: "secondary",
      border: "1px solid black",
      "&:hover": {
        background: "black",
        color: "white",
      },
    },
  };
});

const Navbar = () => {
  const classes = useStyles();
  //   const currentUser = auth.currentUser;
  const currentUser = useSelector((state) => state.users.user);

  return (
    <AppBar position="static">
      <Toolbar className={classes.light}>
        <IconButton>
          <Link href="/" underline="none">
            <Avatar src="/logo2.png" variant="square" />{" "}
          </Link>
        </IconButton>
        <Typography className={classes.nav_right} variant="h4">
          <Link className={classes.nav_item} to="/">
            Medium
          </Link>
        </Typography>

        <Typography
          className={classes.nav_item}
          variant="subtitle1"
          component={Link}
          to="#"
          ml={2}
        >
          Our Story
        </Typography>
        <Typography
          className={classes.nav_item}
          variant="subtitle1"
          component={Link}
          to="/#"
          ml={2}
        >
          Write
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
        <ColorButton component={Link} to="/register" variant="contained">
          Get Started
        </ColorButton>
        {currentUser && (
          <Button
            className={classes.btn}
            component={Link}
            to="/login"
            onClick={() => logout()}
          >
            LogOut
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );

  //   return (
  //     <div className="navbar">
  //       <ul className="">
  //         <li className="nav-item">
  //           <Link to="/">Home </Link>
  //         </li>
  //         <li className="nav-item">Contact</li>
  //         <li className="nav-item">About</li>
  //       </ul>
  //       <ul>
  //         {currentUser ? (
  //           <li className="nav-item">
  //             <Link to="/login" onClick={() => logout()}>
  //               Hi, {currentUser.name} Logout
  //             </Link>
  //           </li>
  //         ) : (
  //           <div>
  //             <li className="nav-item">
  //               <Link to="/register"> Register </Link>
  //             </li>
  //             <li className="nav-item">
  //               <Link to="/login"> Login </Link>
  //             </li>
  //           </div>
  //         )}
  //       </ul>
  //     </div>
  //   );
};

export default Navbar;
