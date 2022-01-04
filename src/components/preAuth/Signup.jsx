import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate, Navigate } from "react-router-dom";
import "../styles/Signup.css";
import MessageBox from "../helpers/MessageBox";
import { useSelector } from "react-redux";

export default function Signup() {
  const { userSignup, currentUser } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [rePass, setRePass] = React.useState(null);
  const [passError, setPassError] = React.useState(null);
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

  const onRePassChange = (e) => {
    e.preventDefault();
    setRePass(e.target.value);
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (password === rePass) {
      setPassError(null);
      setLoading(true);
      await userSignup(userName, password);
      userSignup.then(() => {
        navigate("/dashboard");
      });
    } else {
      setPassError("Password mismatch");
    }
    setLoading(false);
  }

  return (
    <div className="loginContainer">
      <div className="center">
        <h3>Sign up</h3>
      </div>
      <div>
        <form onSubmit={onSubmit} className="loginForm">
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
          <input
            className="formField"
            type="password"
            id="repass"
            placeholder="Re-enter password"
            autoComplete="off"
            onChange={onRePassChange}
          />
          <button className="button" type="submit" disabled={loading}>
            Submit
          </button>
          {(passError || error) && (
            <MessageBox message={passError || error} state="error" />
          )}
        </form>
        <div className="center">
          <h4>Already have an account?&nbsp;</h4>
          <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
