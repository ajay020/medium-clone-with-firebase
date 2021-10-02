import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "../../features/posts/postSlice";
import { ClipLoader } from "react-spinners";
import "./addPostForm.css";

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
import { useHistory } from "react-router";

const useStyles = makeStyles({
  root: {
    // background: "whitesmoke",
    padding: "0 2px ",
    marginTop: "8px",
  },
  link: {
    color: "text.secondary",
    // background: "#000",
  },
});

// const theme = createTheme({
//   palette: {
//     primary: {
//       light: "#757ce8",
//       main: "#3f50b5",
//       dark: "#002884",
//       contrastText: "#fff",
//     },
//     secondary: {
//       light: "#ff7961",
//       main: "#f44336",
//       dark: "#ba000d",
//       contrastText: "#000",
//     },
//   },
// });

const AddPost = () => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [content, setContent] = useState("");
  //   const [userId, setUserId] = useState("1");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const history = useHistory();
  const dispatch = useDispatch();
  const addPostStatus = useSelector((state) => state.posts.addPostStatus);
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onGenreChanged = (e) => setGenre(e.target.value);
  const currentUser = useSelector((state) => state.users.user);

  const canSave =
    [title, content].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = async (e) => {
    e.preventDefault();

    if (canSave && currentUser) {
      try {
        setAddRequestStatus("pending");
        await dispatch(
          addNewPost({ title, genre, content, user: currentUser.id })
        );
        // setTitle("");
        // setContent("");
        // setGenre("");
        history.push("/");
      } catch (err) {
        console.error("Failed to save the post: ", err);
      } finally {
        setAddRequestStatus("idle");
      }
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
            Write your ideas{" "}
            {addPostStatus === "loading" ? <CircularProgress /> : null}
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              onChange={onTitleChanged}
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              id="genre"
              label="Genre"
              name="genre"
              onChange={onGenreChanged}
              //   autoComplete="email"
              //   autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              multiline
              rowsMax={Infinity}
              name="content"
              label="Write here..."
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
  //     <div className="addPost">
  //       <h2>
  //         Add a New Post
  //         {addPostStatus === "loading" ? <ClipLoader loading={true} /> : ""}
  //       </h2>
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
  //         <label htmlFor="postUser">Genre:</label>
  //         {/* <select id="postUser" value={userId} onChange={onAuthorChanged}>
  //           <option value=""></option>
  //           {userOptions}
  //         </select> */}
  //         <div className="form__group">
  //           <input
  //             type="text"
  //             name="genre"
  //             value={genre}
  //             placeholder="Genre"
  //             onChange={onGenreChanged}
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
  //       <button
  //         className="saveBtn"
  //         onClick={onSavePostClicked}
  //         disabled={!canSave}
  //       >
  //         Save
  //       </button>
  //     </div>
  //   );
};

export default AddPost;
