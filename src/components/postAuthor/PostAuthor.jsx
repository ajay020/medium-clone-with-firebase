import { useSelector } from "react-redux";
import "./postAuthor.css";

const PostAuthor = ({ userId }) => {
  const author = useSelector((state) =>
    state.users.find((user) => user.id === userId)
  );

  return <span> {author ? author.name : "Unknown author"}</span>;
};

export default PostAuthor;
