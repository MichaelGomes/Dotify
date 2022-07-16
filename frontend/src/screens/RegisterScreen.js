import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerAction } from "../actions/userActions";
import Alert from "../components/Alert";
import Loader from "../components/Loader";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Local State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(null);

  //Global State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;

  //useEffect
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  //Functions
  const alertClose = () => {
    setMessage(null);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords Do Not Match");
    } else {
      dispatch(registerAction(name, email, password));
    }
  };

  return (
    <div className="login-screen">
      {loading && <Loader />}
      {error && <Alert>{error}</Alert>}
      {message && <Alert closeFunction={alertClose}>{message}</Alert>}
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
        <form>
          <h3 className="sign-up-text">
            <b>Sign up with your email address</b>
          </h3>
          <p>
            <b>What should we call you?</b>
          </p>
          <input
            className="input-field"
            type="text"
            placeholder="Enter a profile name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
          <p>
            <b>What is your email address?</b>
          </p>
          <input
            className="input-field"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
          <p>
            <b>Create a password</b>
          </p>
          <input
            className="input-field"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          <p>
            <b>Confirm your password</b>
          </p>
          <input
            className="input-field"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          ></input>
          <button className="register-btn pointer" onClick={submitHandler}>
            Register
          </button>
          <p className="inline pl-10">
            Have an Account? <a href="/login">Log In</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
