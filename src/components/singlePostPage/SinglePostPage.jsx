import { useParams, useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PostAuthor from "../postAuthor/PostAuthor";
import ReactionButtons from "../reactionButtons/ReactionButtons";
import { selectPostById } from "../../features/posts/postSlice";
import { deletePost } from "./../../features/posts/postSlice";
import "./singlePostPage.css";

const Post = () => {
  const { postId } = useParams();
  //   console.log("post id", postId);
  const post = useSelector((state) => selectPostById(state, postId));
  const currentUser = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const history = useHistory();
  if (!post) {
    return <div> Post not found </div>;
  }
  const { title, genre, user, content } = post;

  const deletePostHandler = () => {
    if (currentUser) {
      dispatch(deletePost(postId));
      // history.push("/");
      history.goBack();
    }
  };

  return (
    <div className="post">
      <div className="post__header">
        <span className="post__title">{title}</span>
        <span>{genre}</span>
        <PostAuthor userId={user} />
        <small>{post.date}</small>
      </div>
      <div className="post__main">
        <p>{content}</p>
      </div>
      <div className="post__footer">
        {currentUser && (
          <button className="editBtn">
            <Link to={`/editPost/${postId}`}> Edit Post </Link>
          </button>
        )}
        {currentUser && <button onClick={deletePostHandler}>Delete</button>}
      </div>
      <ReactionButtons post={post} />
    </div>
  );
};

export default Post;
