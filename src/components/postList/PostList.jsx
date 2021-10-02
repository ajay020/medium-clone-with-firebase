import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deletePost,
  fetchPosts,
  selectAllPosts,
} from "../../features/posts/postSlice";

import AddPostForm from "../addPostForm/AddPostForm";
import PostAuthor from "../postAuthor/PostAuthor";
import ReactionButtons from "../reactionButtons/ReactionButtons";
import { TimeAgo } from "../timeAgo/TimeAgo";
import { ClipLoader } from "react-spinners";
import "./postList.css";
import PostExcerpt from "./../PostExcerpt";

//mui
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import { CssBaseline } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles((theme) => {
  return {
    sidebar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(2),
      //   background: "gray",
      height: "100vh",
      position: "fixed",
    },
  };
});

const PostList = () => {
  const classes = useStyles();
  const posts = useSelector(selectAllPosts);
  //   console.log("POsts", posts);
  const dispatch = useDispatch();
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const currentUser = useSelector((state) => state.users.user);
  //fetch posts from firestore
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;

  if (postStatus === "loading") {
    content = <ClipLoader loading={true} />;
  } else if (postStatus === "successed") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ));
  } else if (postStatus === "rejected") {
    content = <div>Error :{error}</div>;
  }

  return (
    <Box>
      <CssBaseline />
      <Grid container>
        <Grid item xs={12} md={8} sx={{ marginTop: "4px" }}>
          {posts.length !== 0 ? content : "No post available"}
        </Grid>
        <Grid item md={4}>
          <Box className={classes.sidebar}>
            <Grid
              container
              spacing={{ xs: 1, md: 1 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={12} md={12}>
                <Typography variant="h6">
                  Discover more of what matter to you
                </Typography>
              </Grid>
              <Grid item>
                <Item> Technology </Item>
              </Grid>
              <Grid item>
                <Item> Music </Item>
              </Grid>
              <Grid item>
                <Item> Meditation </Item>
              </Grid>
              <Grid item>
                <Item> Finance </Item>
              </Grid>
              <Grid item>
                <Item> Self help </Item>
              </Grid>
              <Grid item>
                <Item> Relationship </Item>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PostList;
