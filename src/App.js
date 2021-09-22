import React, { useEffect } from "react";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import SinglePostPage from "./components/singlePostPage/SinglePostPage"
import EditPostForm from './components/editPostForm/EditPostForm';
import PostList from "./components/postList/PostList";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import { auth } from "./api/firebaseAPI";
import { useDispatch } from 'react-redux';
import { logInUser, logOutUser } from "./features/users/userSlice";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { purple } from '@mui/material/colors';

const theme = createTheme({
    palette:{
        primary: {
            main: '#fff',
          },
        secondary: {
            main:"#000"
        }  
    }
})


function App() {
    const dispatch = useDispatch()

    useEffect(() =>{
        auth.onAuthStateChanged(user =>{
            if(user){
                // user is signed in
                dispatch(logInUser(user.uid))
            }else{
                // user is signed out
                dispatch(logOutUser())
            }
        })
    },[])

  return (
      <ThemeProvider theme={theme}>
        <Router>
        <Navbar/>
        <Switch>
            <Route exact path="/">
            <PostList />
            </Route>
            <Route exact path="/register">
            <Register />
            </Route>
            <Route exact path="/login">
            <Login />
            </Route>
            <Route exact path="/posts/:postId">
            <SinglePostPage/>
            </Route>
            <Route path="/editPost/:postId">
            <EditPostForm/>
            </Route>
        </Switch>
        </Router>
    </ThemeProvider>
  );
}

export default App;
