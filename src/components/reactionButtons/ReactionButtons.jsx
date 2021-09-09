import { useDispatch } from "react-redux";
import { reactionAdded } from "../../features/posts/postSlice";
import "./reactionButton.css";

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
        key={name}
        type="button"
        className="reaction-button"
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
