import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate, Navigate } from "react-router-dom";
import MessageBox from "../helpers/MessageBox";
import { useSelector } from "react-redux";
import "../styles/Signup.css";

export default function Signup() {
  const { userLogin, currentUser } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const { error } = useSelector((state) => state.auth);

  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }

  const onEmailChange = (e) => {
    e.preventDefault();
    setUserName(e.target.value);
  };

  const onPasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  async function onSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await userLogin(userName, password);
      navigate("/dashboard");
    } catch {
      setLoading(false);
    }
  }

  return (
    <div className="loginContainer">
      <div className="center">
        <h3>Sign in</h3>
      </div>
      <div>
        <form className="loginForm" onSubmit={onSubmit}>
          <input
            className="formField"
            type="email"
            id="email"
            placeholder="Your email"
            autoComplete="off"
            onChange={onEmailChange}
          />
          <input
            className="formField"
            type="password"
            id="password"
            placeholder="Your password"
            autoComplete="off"
            onChange={onPasswordChange}
          />
          <button type="submit" className="button" disabled={loading}>
            Submit
          </button>
          {error && <MessageBox message={error} state="error" />}
        </form>
        <div className="center">
          <h4>Need an account?&nbsp;</h4> <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
