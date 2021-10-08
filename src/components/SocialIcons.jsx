import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "./../features/posts/postSlice";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      "&:hover": {
        color: "black",
      },
    },
  };
});

const SocialIcons = ({ post, marked, handleFavourite }) => {
  const classses = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.users.user);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  // Delete post
  const deleteHandler = () => {
    dispatch(deletePost(post.id));
    history.goBack();
  };
  //Edit post
  const editHandler = () => {
    console.info("You clicked the delete icon.");
  };

  return (
    <Box>
      <IconButton className={classses.root} size="small">
        <TwitterIcon />
      </IconButton>
      <IconButton size="small" className={classses.root}>
        <FacebookIcon />
      </IconButton>
      <IconButton size="small" className={classses.root}>
        <LinkedInIcon />
      </IconButton>
      <IconButton size="small" className={classses.root}>
        <LinkOutlinedIcon />
      </IconButton>

      <IconButton onClick={handleFavourite}>
        {marked ? <BookmarkIcon /> : <BookmarkAddOutlinedIcon />}
      </IconButton>
      <IconButton size="small" className={classses.root} onClick={handleClick}>
        {currentUser?.id === post?.user && <MoreHorizOutlinedIcon />}

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Stack direction="column" spacing={2}>
            <Button
              variant="contained"
              onClick={deleteHandler}
              endIcon={<DeleteIcon />}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              onClick={editHandler}
              endIcon={<SendIcon />}
              component={Link}
              to={`/editPost/${post.id}`}
            >
              Edit
            </Button>
          </Stack>
        </Popover>
      </IconButton>
    </Box>
  );
};

export default SocialIcons;
