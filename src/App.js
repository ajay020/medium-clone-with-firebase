import React from "react";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Blog from "./components/blog/Blog";
import Navbar from "./components/navbar/Navbar";
import SinglePostPage from "./components/singlePostPage/SinglePostPage"
import EditPostForm from './components/editPostForm/EditPostForm';

function App() {
  return (
    <Router>
        <Navbar/>
      <Switch>
        <Route exact path="/">
          <Blog />
        </Route>
        <Route path="/posts/:postId">
          <SinglePostPage/>
        </Route>
        <Route path="/editPost/:postId">
          <EditPostForm/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
