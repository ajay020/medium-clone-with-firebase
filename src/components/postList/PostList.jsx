import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import AddPostForm from "../addPostForm/AddPostForm";
import PostAuthor from "../postAuthor/PostAuthor";
import ReactionButtons from "../reactionButtons/ReactionButtons";
import { TimeAgo } from "../timeAgo/TimeAgo";
import "./postList.css";

const PostList = () => {
  const posts = useSelector((state) => state.posts.posts);
  console.log(posts);
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => (
    <article key={post.id} className="postItem">
      <h4>{post.title}</h4>
      <PostAuthor userId={post.user} />
      <TimeAgo timestamp={post.date} />
      <p>{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
      <Link className="btn" to={`/posts/${post.id}`}>
        View Post
      </Link>
    </article>
  ));

  return (
    <div className="postList">
      <AddPostForm />
      <h3>Posts</h3>
      {renderedPosts}
    </div>
  );
};

export default PostList;
