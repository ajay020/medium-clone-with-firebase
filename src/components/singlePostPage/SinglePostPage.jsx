import { useParams, useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import PostAuthor from "../postAuthor/PostAuthor";
import { selectPostById } from "../../features/posts/postSlice";
import "./singlePostPage.css";

// material ui
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import moment from "moment";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { makeStyles } from "@mui/styles";
import SocialIcons from "./../SocialIcons";
import { styled } from "@mui/material/styles";
import { fetchFavouritePosts } from "../../features/users/userSlice";

import { useState, useEffect } from "react";
import { addFavourites } from "./../../features/users/userSlice";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles((theme) => {
  //   console.log("theme>>>>>>>>>>", theme);
  return {
    root: {
      //   background: "red",
      //   display: "flex",
      //   justifyContent: "center",
      //   marginTop: "70px",
      //   alignItems: "flex-start",
      overflow: "auto",
      height: "100vh",
      paddingBottom: "90px",
      //   position: "fixed",
      //   top: 0,
      [theme.breakpoints.down("sm")]: {
        overflow: "hide",
        scrollbarWidth: "0",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      },
    },
    main: {
      //   display: "flex",
      //   alignItems: "start",
      //   overflow: "auto",
      position: "fixed",
      boxSizing: "border-box",
      //   height: "100vh",
      top: "50px",
      //   background: theme.palette.primary[600],
    },
    gridContainer: {
      //   overflow: "auto",
      //   height: "100vh",
      background: theme.palette.background.default,
      //   position: "fixed",
      //   top: 0,
      //   boxSizing: "border-box",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        // background: "black",
        // position: "fixed",
      },
    },
    header: {
      padding: "12px",
      marginBottom: "18px",
    },
    sidebar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(2),
      //   background: theme.palette.primary,
      boxSizing: "border-box",
      //   overflow: "auto",
      height: "100vh",
      //   position: "sticky",
      //   top: "50px",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    btnFollow: {
      //   background: theme.palette.text.secondary,
      margin: "4px",
      borderRadius: "12px",
      border: "1px solid grey",
      padding: "3px 8px",
      color: theme.palette.text.primary,
      fontSize: "12px",
      cursor: "pointer",
      "&:hover": {
        // background: theme.palette.text.secondary,
        borderColor: theme.palette.text.secondary,
      },
    },
  };
});

const SinglePostPage = () => {
  const classes = useStyles();
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, postId));
  const favoritePosts = useSelector((state) => state.users.favoritePosts);
  //   console.log("post id", favoritePosts);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.user);

  const [marked, setMarked] = useState(false);

  //check if current post is marked favourite
  useEffect(() => {
    if (
      favoritePosts &&
      favoritePosts.find((item) => item.postId === post?.id)
    ) {
      setMarked(true);
    }
  }, [favoritePosts]);

  if (!post) {
    return <div> Post not found </div>;
  }
  const { user } = post;

  const handleFavourite = () => {
    setMarked(!marked);
    dispatch(addFavourites({ uid: currentUser.id, postId: post.id, marked }));
  };

  console.log("SinglePostPage Render");

  return (
    <Box className={classes.main}>
      <Grid className={classes.gridContainer} container spacing={1}>
        <Grid item sm={4} md={3}>
          <Box className={classes.sidebar}>
            <Item>
              <Typography variant="h6">
                <PostAuthor userId={user} />
              </Typography>
              <Typography>
                {`Software architect and developer with web and functional JavaScript close to his heart.
               Worked many years with web solutions mainly within the IoT field.`}
              </Typography>
              <Typography className={classes.btnFollow} variant="span">
                Follow
              </Typography>
            </Item>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <Container className={classes.root}>
            <Card>
              <Box className={classes.header}>
                <Typography variant="h3" sx={{ color: "text.primary" }}>
                  {post.title}
                </Typography>
                <CardHeader
                  sx={{ padding: 0, marginTop: "8px" }}
                  avatar={<Avatar sx={{ bgcolor: red[500] }}>R</Avatar>}
                  action={
                    <SocialIcons
                      post={post}
                      marked={marked}
                      handleFavourite={handleFavourite}
                    />
                  }
                  title={
                    <Box>
                      <PostAuthor userId={user} />
                      <Typography className={classes.btnFollow} variant="span">
                        Follow
                      </Typography>
                    </Box>
                  }
                  subheader={moment(post.date).format("dddd, MMMM Do")}
                />
              </Box>
              <CardMedia
                component="img"
                image="/sunset.jpg"
                alt="Paella dish"
                sizes="small"
              />
              <CardContent>
                <Typography
                  variant="p"
                  sx={{ whiteSpace: "pre-line" }}
                  color="text.secondary"
                >
                  {post.content}
                </Typography>
              </CardContent>

              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Container>
        </Grid>

        {/* <Grid item sm={2} md={2}></Grid> */}
      </Grid>
    </Box>
  );
};

export default SinglePostPage;
