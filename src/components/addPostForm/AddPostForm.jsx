import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "../../features/posts/postSlice";
import { ClipLoader } from "react-spinners";
import "./addPostForm.css";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("1");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const dispatch = useDispatch();
  const addPostStatus = useSelector((state) => state.posts.addPostStatus);
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onGenreChanged = (e) => setGenre(e.target.value);
  const currentUser = useSelector((state) => state.users.user);

  //   const userOptions = users.map((user) => (
  //     <option key={user.id} value={user.id}>
  //       {user.name}
  //     </option>
  //   ));

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = async () => {
    if (canSave && currentUser) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, genre, content, user: currentUser.id }));

        setTitle("");
        setContent("");
        setGenre("");
      } catch (err) {
        console.error("Failed to save the post: ", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };
  return (
    <div className="addPost">
      <h2>
        Add a New Post
        {addPostStatus === "loading" ? <ClipLoader loading={true} /> : ""}
      </h2>
      <form>
        <label htmlFor="postTitle">Post Title :</label>
        <div className="form__group">
          <input
            id="postTitle"
            type="text"
            name="postTitle"
            value={title}
            placeholder="title"
            onChange={onTitleChanged}
          />
        </div>
        <label htmlFor="postUser">Genre:</label>
        {/* <select id="postUser" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {userOptions}
        </select> */}
        <div className="form__group">
          <input
            type="text"
            name="genre"
            value={genre}
            placeholder="Genre"
            onChange={onGenreChanged}
          />
        </div>
        <label htmlFor="postContent">Post Content:</label>
        <div className="form__group">
          <textarea
            id="postContent"
            type="text"
            name="postContent"
            value={content}
            placeholder="Write content here..."
            onChange={onContentChanged}
          />
        </div>
      </form>
      <button
        className="saveBtn"
        onClick={onSavePostClicked}
        disabled={!canSave}
      >
        Save
      </button>
    </div>
  );
};

export default AddPost;
