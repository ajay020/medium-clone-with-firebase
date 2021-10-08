// material ui
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
// import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import moment from "moment";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import { makeStyles } from "@mui/styles";

import { Link } from "react-router-dom";
import PostAuthor from "./postAuthor/PostAuthor";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { addFavourites } from "./../features/users/userSlice";

const useStyles = makeStyles(() => {
  return {
    root: {
      // background: "whitesmoke",
      display: "flex",
      justifyContent: "center",
      // padding: "8px",
      //   marginTop: "20px",
    },
    genreBtn: {
      background: "#ccc",
      borderRadius: "100px",
      padding: "2px 8px",
      marginRight: "auto",
      cursor: "pointer",
      fontSize: "13px",
      transition: "background 300ms ease 0s",
      //   color: "gray",
      "&:hover": { background: "#aaa" },
    },
  };
});

const PostExcerpt = ({ post }) => {
  const classes = useStyles();
  const currentUser = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const favouritePosts = useSelector((state) => state.users.favoritePosts);
  const [marked, setMarked] = useState(false);

  useEffect(() => {
    if (favouritePosts?.find((item) => item.postId === post.id)) {
      setMarked(true);
    }
  }, [favouritePosts]);

  const handleFavourite = () => {
    setMarked(!marked);
    dispatch(addFavourites({ uid: currentUser.id, postId: post.id, marked }));
  };

  console.log("PostExcerpt render");
  return (
    <Container className={classes.root}>
      <Card sx={{ width: 600, marginBottom: 2, padding: "8px" }}>
        <CardHeader
          sx={{ padding: "0" }}
          avatar={
            <Avatar
              sx={{
                width: "20px",
                height: "20px",
                padding: "4px",
                fontSize: "13px",
                background: "black",
              }}
            >
              <PostAuthor userId={post.user} singleLetter={true} />
            </Avatar>
          }
          title={
            <Box component="div">
              <PostAuthor userId={post.user} />
            </Box>
          }
        />
        <CardContent sx={{ cursor: "pointer", padding: "0", marginTop: "4px" }}>
          <Link to={`/posts/${post.id}`}>
            <Typography variant="h5" color="text.primary">
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.content.substring(0, 200)}
            </Typography>
          </Link>
        </CardContent>

        <CardActions sx={{ padding: "0", marginTop: "4px", display: "flex" }}>
          <Typography variant="caption">
            {moment(post.date).format("dddd, MMMM Do")}
          </Typography>
          <Typography variant="caption" className={classes.genreBtn}>
            {post.genre}
          </Typography>

          <IconButton onClick={handleFavourite}>
            {marked ? <BookmarkIcon /> : <BookmarkAddOutlinedIcon />}
          </IconButton>
          <IconButton>
            <MoreHorizOutlinedIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Container>
  );
};

export default PostExcerpt;
