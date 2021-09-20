import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deletePost,
  fetchPosts,
  selectAllPosts,
} from "../../features/posts/postSlice";

import AddPostForm from "../addPostForm/AddPostForm";
import PostAuthor from "../postAuthor/PostAuthor";
import ReactionButtons from "../reactionButtons/ReactionButtons";
import { TimeAgo } from "../timeAgo/TimeAgo";
import { ClipLoader } from "react-spinners";
import "./postList.css";

const PostList = () => {
  const posts = useSelector(selectAllPosts);
  //   console.log("POsts", posts);
  const dispatch = useDispatch();
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const currentUser = useSelector((state) => state.users.user);
  //fetch posts from firestore
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;

  const PostExcerpt = ({ post }) => {
    return (
      <article className="postItem">
        <h4>{post.title}</h4>
        <small>Genre :{post.genre}</small>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
        <p>{post.content.substring(0, 100)}</p>
        <ReactionButtons post={post} inactive={true} />
        <Link to={`/posts/${post.id}`}>
          <button className="btn"> View Post</button>
        </Link>
        <button
          onClick={() => {
            if (currentUser) {
              dispatch(deletePost(post.id));
            }
          }}
          className="btn"
        >
          Delete
        </button>
      </article>
    );
  };

  if (postStatus === "loading") {
    content = <ClipLoader loading={true} />;
  } else if (postStatus === "successed") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ));
  } else if (postStatus === "rejected") {
    content = <div>Error :{error}</div>;
  }

  return (
    <div className="postList">
      {currentUser ? <AddPostForm /> : ""}
      {posts.length !== 0 ? content : "No post available"}
    </div>
  );
};

export default PostList;
