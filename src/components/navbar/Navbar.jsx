import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <ul className="">
        <li className="nav-item">
          <Link to="/">Home </Link>
        </li>
        <li className="nav-item">Contact</li>
        <li className="nav-item">About</li>
      </ul>
    </div>
  );
};

export default Navbar;
