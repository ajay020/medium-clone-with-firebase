import { useSelector } from "react-redux";
import "./postAuthor.css";

const PostAuthor = ({ userId, singleLetter }) => {
  const author = useSelector((state) =>
    state.users.users.find((user) => user.id === userId)
  );

  if (singleLetter) {
    return (
      <span style={{ color: "tomato", padding: "4px" }}>
        {author ? author.name[0] : "U"}
      </span>
    );
  }

  return (
    <span style={{ color: "tomato" }}>
      {author ? author.name : "Unknown author"}
    </span>
  );
};

export default PostAuthor;
