import { useHistory, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { postUpdated } from "../../features/posts/postSlice";
import { useState } from "react";
import "./editPostForm.css";

const EditPostForm = () => {
  const { postId } = useParams();
  //   console.log(postId);

  const post = useSelector((state) =>
    state.posts.posts.find((post) => post.id === postId)
  );
  //   console.log(post);

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const dispatch = useDispatch();
  const history = useHistory();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }));
      history.push(`/posts/${postId}`);
    }
  };

  return (
    <div className="editPostForm">
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
      <button onClick={onSavePostClicked}>Update Post</button>
    </div>
  );
};

export default EditPostForm;
