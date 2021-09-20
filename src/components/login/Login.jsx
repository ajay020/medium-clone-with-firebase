import { useState, useEffect } from "react";

import "./login.css";
import { login } from "../../features/users/authMethods";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const user = useSelector((state) => state.users.user);
  //   const loginStatus = useSelector((state) => state.users.loginStatus);

  useEffect(() => {
    if (user) {
      setLoading(false);
      history.replace("/");
    }
  }, [user]);

  const loginHandler = (event) => {
    event.preventDefault();

    if (email && password) {
      login(email, password);
      setLoading(true);
    }
  };
  return (
    <div className="login">
      <h4>Login</h4>
      {loading && <ClipLoader loading={true} />}

      <form onSubmit={loginHandler}>
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
        <button className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
