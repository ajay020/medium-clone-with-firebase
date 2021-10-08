import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { fetchPosts, selectAllPosts } from "../../features/posts/postSlice";

import { ClipLoader } from "react-spinners";
import "./postList.css";
import PostExcerpt from "./../PostExcerpt";
import moment from "moment";

//mui
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import CardHeader from "@mui/material/CardHeader";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import { CssBaseline } from "@mui/material";
import PostAuthor from "../postAuthor/PostAuthor";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles((theme) => {
  return {
    sidebar: {
      padding: "16px",
      //   background: "red",
      overflow: "auto",
      [theme.breakpoints.between("xs", "md")]: {
        display: "none",
      },
    },
  };
});

const PostList = () => {
  const classes = useStyles();
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const favouritePostIds = useSelector((state) => state.users.favoritePosts);
  const currentUser = useSelector((state) => state.users.user);

  const favPosts = posts.filter((post) => {
    if (favouritePostIds?.find((item) => item.postId === post.id)) {
      return true;
    }
    return false;
  });

  let content;

  if (postStatus === "loading") {
    content = <CircularProgress />;
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

  console.log("post list Render");

  return (
    <Box sx={{ marginTop: "10px" }}>
      <CssBaseline />
      <Grid container>
        <Grid item xs={12} md={8}>
          {posts.length !== 0 ? content : "No post available"}
        </Grid>
        <Grid container item md={4}>
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

            {/* Favourite Posts */}
            {currentUser ? (
              <Box>
                <Typography variant="h6" sx={{ margin: "16px 0" }}>
                  Reading list
                </Typography>
                <Grid container direction="column">
                  {favPosts.map((p) => (
                    <Box key={p.id} item sx={{ marginBottom: "4px" }}>
                      <Card
                        key={p.id}
                        sx={{ marginBottom: "2px", padding: "4px" }}
                      >
                        <CardHeader
                          sx={{ padding: 0, marginTop: "12px" }}
                          avatar={
                            <Avatar
                              sx={{
                                width: "20px",
                                height: "20px",
                                padding: "3px",
                                fontSize: "12px",
                              }}
                            >
                              <PostAuthor userId={p.user} singleLetter={true} />
                            </Avatar>
                          }
                          title={<PostAuthor userId={p.user} />}
                        />
                        <CardContent
                          sx={{
                            cursor: "pointer",
                            padding: "0",
                            marginTop: "4px",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ color: "text.primary" }}
                          >
                            {p.title}
                          </Typography>
                        </CardContent>
                        <CardActions
                          sx={{
                            padding: "0",
                            marginTop: "1px",
                            display: "flex",
                          }}
                        >
                          <Typography variant="caption">
                            {moment(p.date).format("dddd, MMMM Do")}{" "}
                          </Typography>
                          <Typography
                            variant="caption"
                            className={classes.genreBtn}
                          >
                            {p.genre}
                          </Typography>
                        </CardActions>
                      </Card>
                    </Box>
                  ))}
                  <Grid item>
                    <Typography
                      variant="p"
                      sx={{ marginTop: "8px", color: "green" }}
                    >
                      See all(12)
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ) : null}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PostList;
