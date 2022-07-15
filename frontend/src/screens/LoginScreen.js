import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginAction } from "../actions/userActions";
import Loader from "../components/Loader";
import Alert from "../components/Alert";

const LoginScreen = () => {
  const dispatch = useDispatch();

  //Local State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [forgot, setForgot] = useState(false);

  //Global State
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  //Functions
  const checkClick = (e) => {
    if (remember === false) {
      setRemember(true);
    } else {
      setRemember(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginAction(email, password, remember));
  };

  return (
    <div className="login-screen">
      {loading && <Loader />}
      {error && <Alert>{error}</Alert>}
      <div className="login-box">
        <div className="login-brand">
          <img
            className="lg-logo"
            src={require("../logo.svg").default}
            alt="logo"
          />
          <h2 className="lg-brand-text">Dotify</h2>
        </div>
        <hr />

        {/* If Forgot Password Is True */}
        {forgot ? (
          <form>
            <p>
              <b>Email Address</b>
            </p>
            <input
              className="input-field"
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
            <p className="pointer" onClick={() => setForgot(false)}>
              Remember your password?
            </p>
            <button className="login-btn pointer">Reset Password</button>
          </form>
        ) : (
          <>
            <form onSubmit={submitHandler}>
              <p>
                <b>Email Address</b>
              </p>
              <input
                className="input-field"
                type="email"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></input>
              <p>
                <b>Password</b>
              </p>
              <input
                className="input-field"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              ></input>
              <p className="pointer" onClick={() => setForgot(true)}>
                Forgot your password?
              </p>

              <input
                className="pointer"
                type="checkbox"
                checked={remember}
                onChange={checkClick}
              ></input>
              <p className="inline">Remember me for 30 days</p>

              <button className="login-btn pointer">Submit</button>
            </form>

            <hr />

            <p>
              <b>Don't have an account?</b>
              <Link to="/register">
                <button className="sign-up-btn pointer">
                  Sign Up For Dotify
                </button>
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
