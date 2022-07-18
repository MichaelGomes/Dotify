import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { resetPasswordAction } from "../actions/userActions";
import Alert from "../components/Alert";
import Loader from "../components/Loader";

const ResetScreen = () => {
  const dispatch = useDispatch();
  const { token } = useParams();

  //Local State
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState(null);

  //Global State
  const userResetPassword = useSelector((state) => state.userResetPassword);
  const { loading, error, success } = userResetPassword;

  //Functions
  const alertClose = () => {
    setAlert(null);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert("Passwords do not match");
    } else {
      dispatch(resetPasswordAction(token, password));
    }
  };

  return (
    <div className="reset-screen">
      {loading && <Loader />}
      {error && <Alert>{error}</Alert>}
      {success && (
        <Alert>
          Password has been reset.{" "}
          <Link to="/login" className="white">
            Return to Login
          </Link>
        </Alert>
      )}
      <div className="reset-box">
        <div className="login-brand">
          <img
            className="lg-logo"
            src={require("../logo.svg").default}
            alt="logo"
          />
          <h2 className="lg-brand-text">Dotify</h2>
        </div>
        <hr />

        <form onSubmit={submitHandler}>
          {alert && <Alert closeFunction={alertClose}>{alert}</Alert>}
          <h1>Reset Password</h1>
          <p>
            <b>New Password</b>
          </p>
          <input
            className="input-field"
            type="password"
            placeholder="Enter New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          <p>
            <b>Confirm Password</b>
          </p>
          <input
            className="input-field"
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          ></input>
          <button className="reset-btn pointer">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetScreen;
