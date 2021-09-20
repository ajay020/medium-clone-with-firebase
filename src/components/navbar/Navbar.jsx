import "./navbar.css";
import { Link } from "react-router-dom";
import { logout } from "../../features/users/authMethods";
import { useSelector } from "react-redux";

const Navbar = () => {
  //   const currentUser = auth.currentUser;
  const currentUser = useSelector((state) => state.users.user);
  //   console.log("curr", currentUser);
  return (
    <div className="navbar">
      <ul className="">
        <li className="nav-item">
          <Link to="/">Home </Link>
        </li>
        <li className="nav-item">Contact</li>
        <li className="nav-item">About</li>
      </ul>
      <ul>
        {currentUser ? (
          <li className="nav-item">
            <Link to="/login" onClick={() => logout()}>
              Hi, {currentUser.name} Logout
            </Link>
          </li>
        ) : (
          <div>
            <li className="nav-item">
              <Link to="/register"> Register </Link>
            </li>
            <li className="nav-item">
              <Link to="/login"> Login </Link>
            </li>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
