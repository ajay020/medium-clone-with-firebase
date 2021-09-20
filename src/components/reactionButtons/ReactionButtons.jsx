import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReaction, reactionSaved } from "../../features/posts/postSlice";
import { updateUserReaction } from "../../features/users/userSlice";
import "./reactionButton.css";

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

const ReactionButtons = ({ post, inactive }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.user);

  //   console.log("currentUser", currentUser);
  useEffect(() => {
    // console.log(post.likedBy[currentUser?.id]);
  }, [post]);

  const onAddReaction = (name) => {
    if (currentUser) {
      const count = currentUser?.likedPosts?.[post.id]?.[name] || 0;
      //   console.log("count", count);
      //   save in redux store
      dispatch(updateUserReaction({ postId: post.id, reaction: name }));

      //update post reaction
      dispatch(reactionSaved({ postId: post.id, reaction: name, flag: count }));
      //
      //save in fire store
      dispatch(
        addReaction({ postId: post.id, reaction: name, uid: currentUser.id })
      );
    }
  };

  const isLikedByUser = (name) => {
    if (currentUser?.hasOwnProperty("likedPosts")) {
      let reactionObj = currentUser.likedPosts?.[post.id];
      //   console.log("reactionObj", reactionObj?.hasOwnProperty(name));
      if (reactionObj?.hasOwnProperty(name) && reactionObj?.[name] !== 0) {
        // console.log("reactionObj", reactionObj);
        // console.log("reaction", name, reactionObj?.[name]);
        return true;
      }
    }

    return false;
  };

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        onClick={() => onAddReaction(name)}
        key={name}
        type="button"
        className={
          isLikedByUser(name) ? "reaction-button-selected" : "reaction-button"
        }
        disabled={inactive ? true : false}
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });
  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
