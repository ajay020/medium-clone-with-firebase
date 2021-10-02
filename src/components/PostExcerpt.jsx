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
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import moment from "moment";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

import { makeStyles } from "@mui/styles";

import { Link } from "react-router-dom";
import PostAuthor from "./postAuthor/PostAuthor";
import { HorizontalRuleOutlined } from "@mui/icons-material";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      // background: "whitesmoke",
      display: "flex",
      justifyContent: "center",
      // padding: "8px",
      marginTop: "20px",
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
  return (
    <Container className={classes.root}>
      <Card sx={{ width: 600, marginBottom: 2, padding: "8px" }}>
        <CardHeader
          sx={{ padding: "0" }}
          avatar={
            <Avatar
              sx={{ width: "20px", height: "20px", padding: "4px" }}
              square
            >
              {post.title[0].toUpperCase()}
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
            {moment(post.date).format("dddd, MMMM Do")}{" "}
          </Typography>
          <Typography variant="caption" className={classes.genreBtn}>
            {post.genre}
          </Typography>
          <IconButton>
            <BookmarkAddOutlinedIcon />
          </IconButton>
          <IconButton>
            <MoreHorizOutlinedIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Container>
  );
};

// const PostExcerpt = ({ post }) => {
//     return (
//       <article className="postItem">
//         <h4>{post.title}</h4>
//         <small>Genre :{post.genre}</small>
//         <PostAuthor userId={post.user} />
//         <TimeAgo timestamp={post.date} />
//         <p>{post.content.substring(0, 100)}</p>
//         <ReactionButtons post={post} inactive={true} />
//         <Link to={`/posts/${post.id}`}>
//           <button className="btn"> View Post</button>
//         </Link>
//         <button
//           onClick={() => {
//             if (currentUser) {
//               dispatch(deletePost(post.id));
//             }
//           }}
//           className="btn"
//         >
//           Delete
//         </button>
//       </article>
//     );
//   };

export default PostExcerpt;
