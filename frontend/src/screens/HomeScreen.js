import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileButton from "../components/ProfileButton";

const HomeScreen = () => {
  const navigate = useNavigate();

  //Global State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //useEffect
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (userInfo?.verified === false) {
      navigate("/verify");
    }
  }, [navigate, userInfo]);

  return (
    <div className="main-content">
      <div className="home-screen white">
        <div className="heading">
          <h1 className="inline">Welcome, {userInfo?.name}</h1>
          <ProfileButton />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
