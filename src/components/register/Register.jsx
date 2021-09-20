import { useState, useEffect } from "react";
import { register } from "../../features/users/authMethods";
import { useHistory } from "react-router";
import "./register.css";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.users.user);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      setLoading(false);
      history.replace("/");
    }
  }, [user]);

  const registerHandler = (event) => {
    event.preventDefault();
    if (username && email && password) {
      setLoading(true);
      register(username, email, password);
    }
  };
  return (
    <div className="register">
      <h4>Register</h4>
      {loading && <ClipLoader loading={true} />}
      <form onSubmit={registerHandler}>
        <div className="form__group">
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name="name"
            placeholder="Username"
          />
        </div>
        <div className="form__group">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Email"
          />
        </div>
        <div className="form__group">
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            name="password"
            placeholder="Password"
          />
        </div>
        <button className="btn">Register</button>
      </form>
    </div>
  );
};

export default Register;
