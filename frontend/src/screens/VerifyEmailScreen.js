import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { emailVerifyAction } from "../actions/userActions";
import Loader from "../components/Loader";
import Alert from "../components/Alert";

const VerifyEmailScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { emailtoken } = useParams();

  //Global State
  const userVerify = useSelector((state) => state.userVerify);
  const { loading, error, success } = userVerify;

  //Functions
  const verifyEmailClick = () => {
    dispatch(emailVerifyAction(emailtoken));
    document.getElementById("alert").focus();
  };

  const loginClick = () => {
    navigate("/login");
  };

  return (
    <div className="email-screen">
      <div className="email-box">
        <div className="account-brand">
          <img
            className="lg-logo"
            src={require("../logo.svg").default}
            alt="logo"
          />
          <h2 className="lg-brand-text-account">Dotify</h2>
        </div>

        {loading && <Loader />}
        <div id="alert" tabIndex={0}>
          {error && <Alert>{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
        </div>

        <div>
          {!success && (
            <button className="verify-btn pointer" onClick={verifyEmailClick}>
              Verify Email
            </button>
          )}
          {success && loginClick()}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailScreen;
