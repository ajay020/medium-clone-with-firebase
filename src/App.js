import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import SinglePostPage from "./components/singlePostPage/SinglePostPage"
import EditPostForm from './components/editPostForm/EditPostForm';
import PostList from "./components/postList/PostList";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import { auth } from "./api/firebaseAPI";
import { useDispatch } from 'react-redux';
import { fetchFavouritePosts, logInUser, logOutUser } from "./features/users/userSlice";
import { createTheme,ThemeProvider } from "@mui/material/styles";
import Layout from "./components/Layout";
import AddPostForm from './components/addPostForm/AddPostForm';
import OurStory from './components/OurStory';
import Test from "./components/Test";
import { red, grey } from "@mui/material/colors";

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} })


const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // palette values for light mode
            primary: {main:"#fff",light:"", dark:"", contrastText:"#000"},
            divider: grey[400],
            text: {
              primary: "#292929",
              secondary: "#757575",
            },
          }
        : {
            // palette values for dark mode
            primary: {main :red[500],light:red[200], dark:red[900]},
            divider: red[900],
            background: {
              default: "#010101",
              paper: '#0A0D12',
            },
            text: {
              primary: "#EDEDED",
              secondary: grey[200],
            },
          }),
    },
  });

function App() {
    const dispatch = useDispatch()
    const [mode, setMode] = useState("light")

    const colorMode = useMemo(
        () =>({
            toggleColorMode: () =>{
                    setMode( prevMode => (prevMode === "light"? "dark" : "light"))
                }
    }),[])

    const theme = useMemo(
        ()=>
         createTheme(
             getDesignTokens(mode)
            ),
            [mode]
        )

    useEffect(() =>{
        auth.onAuthStateChanged(user =>{
            if(user){
                // user is signed in
                dispatch(logInUser({ uid: user.uid}))

                //fetch user's favourite posts list
                dispatch(fetchFavouritePosts({uid: user.uid}))
            }else{
                // user is signed out
                dispatch(logOutUser())
            }
        })
    },[])

    console.log("App render")
  return (
      <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Router>
            <Layout>
                <Switch>
                    <Route exact path="/test">
                        <Test/>
                    </Route>
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
                    <Route path="/write" component={AddPostForm} />
                    <Route path="/about" component={OurStory} />

                </Switch>
            </Layout>
        </Router>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
