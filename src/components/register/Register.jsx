import { useState, useEffect } from "react";
import { register } from "../../features/users/authMethods";
import { useHistory } from "react-router";
import "./register.css";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const useStyles = makeStyles({
  root: {
    // background: "whitesmoke",
    padding: "0 2px ",
    marginTop: "8px",
  },
  link: {
    color: "text.secondary",
    // background: "#000",
  },
});

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const Register = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.users.user);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      setLoading(false);
      history.replace("/");
    }
  }, [user]);

  //   const registerHandler = (event) => {
  //     event.preventDefault();
  //     if (username && email && password) {
  //       setLoading(true);
  //       register(username, email, password);
  //     }
  //   };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (username && email && password) {
      setLoading(true);
      register(username, email, password);
    }
  };
  return (
    <ThemeProvider>
      <Container component="main" className={classes.root} maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            Join Medium. {loading ? <CircularProgress /> : null}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              //   autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              //   autoComplete="email"
              //   autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              //   autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  className={classes.link}
                  color="text.secondary"
                  href="#"
                  variant="body2"
                >
                  {"Already have an account? Log In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );

  //   return (
  //     <div className="register">
  //       <h4>Register</h4>
  //       {loading && <ClipLoader loading={true} />}
  //       <form onSubmit={registerHandler}>
  //         <div className="form__group">
  //           <input
  //             onChange={(e) => setUsername(e.target.value)}
  //             type="text"
  //             name="name"
  //             placeholder="Username"
  //           />
  //         </div>
  //         <div className="form__group">
  //           <input
  //             onChange={(e) => setEmail(e.target.value)}
  //             type="email"
  //             name="email"
  //             placeholder="Email"
  //           />
  //         </div>
  //         <div className="form__group">
  //           <input
  //             onChange={(e) => setPassword(e.target.value)}
  //             type="text"
  //             name="password"
  //             placeholder="Password"
  //           />
  //         </div>
  //         <button className="btn">Register</button>
  //         <Button variant="outlined">Register</Button>
  //       </form>
  //     </div>
  //   );
};

export default Register;
