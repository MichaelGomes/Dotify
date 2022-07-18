import React, { useState } from "react";

const MusicControls = () => {
  //Local State
  const [repeat, setRepeat] = useState("off");

  //Functions
  const repeatClick = () => {
    if (repeat === "off") {
      setRepeat("playlist");
    }
    if (repeat === "playlist") {
      setRepeat("song");
    }
    if (repeat === "song") {
      setRepeat("off");
    }
  };

  return (
    <>
      <div className="bottom-bar">
        <div className="current-song">
          <>
            <div className="btm-images">
              <img className="btm-img-sm" alt="Album Artwork"></img>
              <div className="img-bg-container">
                <img className="btm-img-bg" alt="Album Artwork"></img>
              </div>
            </div>
            <div>
              <h5>Test Song Name</h5>
              <h6>Test Song Artist</h6>
            </div>
          </>
        </div>

        <div className="music-controls">
          <i
            class="fa-solid fa-backward-step btm-icon grey prev pointer"
            id="prev"
          ></i>
          <i class="fa-solid fa-circle-play pointer" id="play"></i>
          <i
            class="fa-solid fa-forward-step btm-icon grey next pointer"
            id="next"
          ></i>
          {repeat === "off" && (
            <>
              <i
                class="fa-solid fa-repeat btm-icon grey pointer inline"
                id="repeat"
                onClick={repeatClick}
              ></i>
            </>
          )}
          {repeat === "playlist" && (
            <i
              class="fa-solid fa-repeat btm-icon purple pointer"
              id="repeat"
              onClick={repeatClick}
            ></i>
          )}
          {repeat === "song" && (
            <>
              <i
                class="fa-solid fa-repeat btm-icon purple pointer"
                id="repeat"
                onClick={repeatClick}
              ></i>
              <span className="purple repeat-badge">1</span>
            </>
          )}
          <div id="progress-container" className="progress-container pointer">
            <div className="progress-bar" id="progress-bar"></div>
          </div>
          <audio id="audio" src=""></audio>
        </div>

        <div className="sound-controls">
          <i id="vol-max" class="fa-solid fa-volume-high pointer"></i>
          <div id="sound-container" className="sound-container inline pointer ">
            <div
              id="sound-control"
              className="sound-control"
              style={{ width: "100%" }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicControls;
