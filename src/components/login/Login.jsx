import { useState, useEffect } from "react";

import "./login.css";
import { login } from "../../features/users/authMethods";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Copyright from "../Copyright";
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
  //   palette: {
  //     // mode: "dark",
  //     primary: {
  //       light: "#757ce8",
  //       main: "#3f50b5",
  //       dark: "#002884",
  //       contrastText: "#fff",
  //     },
  //     secondary: {
  //       light: "#ff7961",
  //       main: "#f44336",
  //       dark: "#ba000d",
  //       contrastText: "#000",
  //     },
  //   },
});

const Login = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const user = useSelector((state) => state.users.user);

  useEffect(() => {
    if (user) {
      setLoading(false);
      history.replace("/");
    }
  }, [user]);

  //   const loginHandler = (event) => {
  //     event.preventDefault();

  //     if (email && password) {
  //       login(email, password);
  //       setLoading(true);
  //     }
  //   };

  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
    if (email && password) {
      login(email, password);
      setLoading(true);
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome Back {loading ? <CircularProgress /> : null}
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
              id="email"
              label="Email Address"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              //   autoComplete="email"
              autoFocus
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
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  className={classes.link}
                  color="text.secondary"
                  href="#"
                  variant="body2"
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  className={classes.link}
                  color="text.secondary"
                  href="#"
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );

  //   return (
  //     <div className="login">
  //       <h4>Login</h4>
  //       {loading && <ClipLoader loading={true} />}

  //       <form onSubmit={loginHandler}>
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
  //         <button className="btn">Login</button>
  //       </form>
  //     </div>
  //   );
};

export default Login;
