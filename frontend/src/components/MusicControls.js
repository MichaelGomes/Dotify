import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const MusicControls = () => {
  //Local State
  const [repeat, setRepeat] = useState("off");
  const [mute, setMute] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  const [songPlay, setSongPlay] = useState(false);
  const [currentSong, setCurrentSong] = useState("");
  const [userPlaylist, setUserPlaylist] = useState("");

  //Global State
  const playlistCurrent = useSelector((state) => state.playlistCurrent);
  const { currentPlaylist } = playlistCurrent;

  const songCurrentIndex = useSelector((state) => state.songCurrentIndex);
  const { currentSongIndex } = songCurrentIndex;

  //useEffect
  useEffect(() => {
    if (currentPlaylist) {
      getCurrentSong();
    }
  }, [currentPlaylist, currentSongIndex]);

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

  //Functions for Playing Song
  const getCurrentSong = () => {
    if (currentPlaylist) {
      setSongPlay(false);
      setSongIndex(currentSongIndex);
      setUserPlaylist(currentPlaylist);
      let songs = userPlaylist?.songs;
      if (songs?.length !== undefined) {
        let song = songs[Object.keys(songs)[songIndex]];
        setCurrentSong(song);
      }
    }
    play();
  };

  const play = () => {
    //Play Song
    let playAudio = document.getElementById("audio").play();

    if (playAudio !== undefined) {
      playAudio
        .then((_) => {
          setSongPlay(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const pause = () => {
    //Pause Song
    document.getElementById("audio").pause();
    setSongPlay(false);
  };

  const progressBarUpdate = () => {
    // Convert duration into Number
    let duration = currentSong?.duration;

    //Convert String of minutes into seconds
    duration = duration?.replace(/:/g, "");

    if (duration[0] === "2") {
      duration = duration.slice(1);
      duration = Number(duration);
      duration = duration + 120;
    }

    if (duration[0] === "1") {
      duration = duration.slice(1);
      duration = Number(duration);
      duration = duration + 60;
    }

    // Get Audio
    let audio = document.getElementById("audio");
    let currentTime = audio.currentTime;

    // Percent on progress bar
    const progressPercent = (currentTime / duration) * 100;

    // Set progress bar width
    let bar = document.getElementById("progress-bar");
    bar.style.width = progressPercent + "%";
  };

  const setProgress = (e) => {
    // Convert duration into Number
    let duration = currentSong?.duration;
    duration = duration?.replace(/:/g, "");

    //Convert String of minutes into seconds
    if (duration[0] === "2") {
      duration = duration.slice(1);
      duration = Number(duration);
      duration = duration + 120;
    }

    if (duration[0] === "1") {
      duration = duration.slice(1);
      duration = Number(duration);
      duration = duration + 60;
    }

    //Progress Bar Container
    let container = document.getElementById("progress-container");

    //Width of Entire Bar
    const width = container.clientWidth;

    //Where user clicked on bar
    const clickX = e.nativeEvent.offsetX;

    //Set Audio to where clicked
    let audio = document.getElementById("audio");
    audio.currentTime = (clickX / width) * duration;
  };

  return (
    <>
      <div className="bottom-bar">
        <div className="current-song">
          {currentSong && (
            <>
              <div className="btm-images">
                <img
                  className="btm-img-sm"
                  src={`/api/files/image/${currentSong?.image}`}
                  alt="Album Artwork"
                ></img>
                <div className="img-bg-container">
                  <img
                    className="btm-img-bg"
                    src={`/api/files/image/${currentSong?.image}`}
                    alt="Album Artwork"
                  ></img>
                </div>
              </div>
              <div>
                <h5>{currentSong?.name}</h5>
                <h6>{currentSong?.artists}</h6>
              </div>
            </>
          )}
        </div>

        <div className="music-controls">
          <i
            class="fa-solid fa-backward-step btm-icon grey prev pointer"
            id="prev"
          ></i>
          {songPlay ? (
            <i
              class="fa-solid fa-circle-pause pointer"
              id="pause"
              onClick={pause}
            ></i>
          ) : (
            <i
              class="fa-solid fa-circle-play pointer"
              id="play"
              onClick={play}
            ></i>
          )}
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
          <div
            id="progress-container"
            className="progress-container pointer"
            onClick={setProgress}
          >
            <div className="progress-bar" id="progress-bar"></div>
          </div>
          {currentSong?.length !== 0 ? (
            <audio
              id="audio"
              src={`/api/files/audio/${currentSong?.music}`}
              onTimeUpdate={progressBarUpdate}
            ></audio>
          ) : (
            <audio id="audio" src=""></audio>
          )}
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
