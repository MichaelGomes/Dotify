import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../actions/userActions";

const ProfileButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logoutAction());
  };

  const accountHandler = () => {
    navigate("/account");
  };

  return (
    <div className="profile-dropdown inline">
      <button className="profile-btn pointer">
        {userInfo?.name} <i class="fa-solid fa-sort-down"></i>
      </button>
      <div className="profile-btn-content">
        <p className="pointer" onClick={accountHandler}>
          Account
        </p>
        <p className="pointer" onClick={logoutHandler}>
          Logout
        </p>
      </div>
    </div>
  );
};

export default ProfileButton;
