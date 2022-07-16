import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logoutAction, sendEmailAction } from "../actions/userActions";
import Alert from "../components/Alert";
import Loader from "../components/Loader";

const VerifyScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Global State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userEmail = useSelector((state) => state.userEmail);
  const { loading, success, error } = userEmail;

  //useEffect
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (userInfo?.verified === true) {
      navigate("/");
    }
  });

  //Functions
  const goBackClick = () => {
    dispatch(logoutAction());
  };

  const sendEmailClick = () => {
    dispatch(sendEmailAction(userInfo.email, userInfo._id));
    document.getElementById("alert").focus();
  };

  return (
    <>
      <div className="verify-screen">
        <Link to="/" aria-label="go back button" onClick={goBackClick}>
          <button className="back-btn pointer">Go Back</button>
        </Link>

        <div className="verify-box">
          <div className="account-brand">
            <img
              className="lg-logo"
              src={require("../logo.svg").default}
              alt="logo"
            />
            <h2 className="lg-brand-text-account">Dotify</h2>
          </div>
          <hr />
          {loading && <Loader />}
          <div id="alert" tabIndex={0}>
            {error && <Alert>{error}</Alert>}
            {success && <Alert>{success}</Alert>}
          </div>

          <div>
            <h1>Verify your Email to Login!</h1>
            <h3>
              <b>Email:</b> {userInfo?.email}
            </h3>
            <button className="send-email-btn pointer" onClick={sendEmailClick}>
              Send Verification Email
            </button>
            <h3>
              <b>Make sure to check your junk folder</b>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyScreen;
