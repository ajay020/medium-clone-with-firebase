import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./singlePostPage.css";
import PostAuthor from "../postAuthor/PostAuthor";
import ReactionButtons from "../reactionButtons/ReactionButtons";

const Post = () => {
  const { postId } = useParams();

  const post = useSelector((state) =>
    state.posts.posts.find((post) => post.id === postId)
  );

  const { title, user, content } = post;

  if (!post) {
    return <div> Post not found </div>;
  }

  return (
    <div className="post">
      <div className="post__header">
        <span className="post__title">{title}</span>
        <PostAuthor userId={user} />
        <small>timestamp</small>
      </div>
      <div className="post__main">
        <p>{content.substring(0, 100)}</p>
      </div>
      <div className="post__footer">
        <button className="editBtn">
          <Link to={`/editPost/${postId}`}> Edit Post </Link>
        </button>
      </div>
      <ReactionButtons post={post} />
    </div>
  );
};

export default Post;
