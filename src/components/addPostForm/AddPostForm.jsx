import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "../../features/posts/postSlice";
import "./addPostForm.css";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postAdded(title, content, userId));
    }
    setTitle("");
    setContent("");
  };

  return (
    <div className="addPost">
      <h2>Add a New Post</h2>
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
        <label htmlFor="postUser">Users:</label>
        <select id="postUser" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {userOptions}
        </select>
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
