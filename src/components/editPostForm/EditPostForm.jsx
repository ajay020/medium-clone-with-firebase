import { useHistory, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { selectPostById, updatePost } from "../../features/posts/postSlice";
import { useState } from "react";
import "./editPostForm.css";
//mui
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const useStyles = makeStyles({
  root: {
    padding: "0 2px ",
    marginTop: "8px",
  },
  link: {
    color: "text.secondary",
  },
});

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const EditPostForm = () => {
  const classes = useStyles();
  const { postId } = useParams();
  //   console.log(postId);

  const post = useSelector((state) => selectPostById(state, postId));
  //   console.log("post", post);

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const dispatch = useDispatch();
  const history = useHistory();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(updatePost({ id: postId, title, content }));

      history.push(`/posts/${postId}`);
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
          <Typography component="h1" variant="h5">
            Edit Post{" "}
            {/* {addPostStatus === "loading" ? <CircularProgress /> : null} */}
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              value={title}
              onChange={onTitleChanged}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              multiline
              value={content}
              rowsMax={Infinity}
              name="content"
              label="Content"
              type="content"
              id="content"
              onChange={onContentChanged}
            />
            {/* <TextareaAutosize
            maxRows={4}
            placeholder="Maximum 4 rows"
            style={{ width: 200 }}
          /> */}

            <Button
              type="submit"
              fullWidth
              onClick={onSavePostClicked}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );

  //   return (
  //     <div className="editPostForm">
  //       <h2>Add a New Post</h2>
  //       <form>
  //         <label htmlFor="postTitle">Post Title :</label>
  //         <div className="form__group">
  //           <input
  //             id="postTitle"
  //             type="text"
  //             name="postTitle"
  //             value={title}
  //             placeholder="title"
  //             onChange={onTitleChanged}
  //           />
  //         </div>

  //         <label htmlFor="postContent">Post Content:</label>
  //         <div className="form__group">
  //           <textarea
  //             id="postContent"
  //             type="text"
  //             name="postContent"
  //             value={content}
  //             placeholder="Write content here..."
  //             onChange={onContentChanged}
  //           />
  //         </div>
  //       </form>
  //       <button onClick={onSavePostClicked}>Update Post</button>
  //     </div>
  //   );
};

export default EditPostForm;
