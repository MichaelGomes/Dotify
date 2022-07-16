import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserDetails } from "../actions/userActions";
import { USER_UPDATE_DETAILS_RESET } from "../constants/userConstants";
import Alert from "../components/Alert";
import Loader from "../components/Loader";

const AccountScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Local State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  //Global State
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateDetails = useSelector((state) => state.userUpdateDetails);
  const {
    loading: updateLoading,
    error: updateError,
    success,
  } = userUpdateDetails;

  //useEffect
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else if (userInfo.verified === false) {
      navigate("/verify");
    } else {
      if (!user?.name || success) {
        dispatch({ type: USER_UPDATE_DETAILS_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        setName(user?.name);
        setEmail(user?.email);
      }
    }
  }, [dispatch, navigate, userInfo, user, success]);

  //Functions
  const alertClose = () => {
    setMessage(null);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserDetails({ _id: user._id, name, email, password }));
    }
  };

  return (
    <>
      <div className="account-screen">
        {message && <Alert closeFunction={alertClose}>{message}</Alert>}
        {loading && <Loader />}
        {updateLoading && <Loader />}
        {error && <Alert>{error}</Alert>}
        {updateError && <Alert>{error}</Alert>}
        <Link to="/">
          <button className="back-btn pointer">BACK</button>
        </Link>

        <div className="account-box">
          <div className="account-brand">
            <img
              className="lg-logo"
              src={require("../logo.svg").default}
              alt="logo"
            />
            <h2 className="lg-brand-text-account">Dotify</h2>
          </div>
          <hr />
          <h2>Update Account Info</h2>
          <form>
            <p>Name</p>
            <input
              className="input-field"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <p>Email</p>
            <input
              className="input-field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
            <p>Password</p>
            <input
              className="input-field"
              type="password"
              placeholder="Enter a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <p>Confirm Password</p>
            <input
              className="input-field"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
            <button className="account-submit pointer" onClick={submitHandler}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AccountScreen;
