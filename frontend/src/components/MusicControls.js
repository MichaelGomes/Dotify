import React, { useState } from "react";

const MusicControls = () => {
  //Local State
  const [repeat, setRepeat] = useState("off");
  const [mute, setMute] = useState(false);

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

  //Functions for Volume Controls
  const muteClick = () => {
    let audio = document.getElementById("audio");

    if (mute) {
      setMute(false);
      //Change Icons
      document.getElementById("vol-mute").classList.add("hidden");
      document.getElementById("vol-max").classList.remove("hidden");
      //Change Audio Volume & Volume Bar
      document.getElementById("sound-control").style.width = "10%";
      //Set Volume to 10%
      audio.volume = 0.1;
    } else {
      setMute(true);
      //Change Icons
      document.getElementById("vol-mute").classList.remove("hidden");
      document.getElementById("vol-max").classList.add("hidden");
      //Change Audio Volume & Volume Bar
      document.getElementById("sound-control").style.width = "0px";
      //Set Volume to 0
      audio.volume = 0;
    }
  };

  const volumeSliderClick = (e) => {
    let container = document.getElementById("sound-container");
    let control = document.getElementById("sound-control");
    let audio = document.getElementById("audio");

    //Where user clicked on bar
    const clickX = e.nativeEvent.offsetX;

    //Width of bar
    const width = container.clientWidth;

    //Adjust Volume
    audio.volume = clickX / width;

    //Get percentage of bar
    let percent = (clickX / width) * 100;

    percent = String(percent).slice(0, 2) + "%";

    //Set bar width
    control.style.width = percent;

    //Change Icons
    if (audio.volume === 0) {
      setMute(true);
      document.getElementById("vol-max").classList.add("hidden");
      document.getElementById("vol-mute").classList.remove("hidden");
    } else {
      setMute(false);
      document.getElementById("vol-max").classList.remove("hidden");
      document.getElementById("vol-mute").classList.add("hidden");
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
          <audio
            id="audio"
            src={`api/files/audio/26e108bf7e7504a2babb64c531702958.mp3`}
          ></audio>
        </div>

        <div className="sound-controls">
          <i
            id="vol-max"
            class="fa-solid fa-volume-high pointer"
            onClick={muteClick}
          ></i>
          <i
            id="vol-mute"
            class="fa-solid fa-volume-xmark hidden pointer"
            onClick={muteClick}
          ></i>
          <div
            id="sound-container"
            className="sound-container inline pointer"
            onClick={volumeSliderClick}
          >
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
