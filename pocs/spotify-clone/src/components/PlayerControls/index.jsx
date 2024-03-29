import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
  BsTypeH2,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
export default function PlayerControls() {
  const audiotagRef = useRef(null);
  const progressBarRef = useRef(null);
  const [playerState, setPlayerState] = useState("play");
  const [musicCurrentTime, setMusicCurrentTime] = useState(null);
  const [musicDuration, setMusicDuration] = useState(null);
  const [duratioInSeconds, setDuratioInSeconds] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [position, setPosition] = useState(0);

  const [state, setSlide] = useState(0);

  const calculateMusicLevel = (event) => {
    const result = (event.target.value / 100) * duratioInSeconds;
    audiotagRef.current.currentTime = result;
    calculateTime(result, "currentTime");
  };

  const handleChange = (e) => {
    if (e.target.value === "100") {
      setPlayerState("play");
      setMusicCurrentTime(null);
      setMusicDuration(null);
      setSlide(0);
    }
    if (e.target.value === 0) {
      setPlayerState("pause");
    }
    calculateMusicLevel(e);
  };

  const handleProgressBar = (currentTime, duration) => {
    const result = (currentTime / duration) * 100;
    if (result === 100) {
      setPlayerState("play");
      audiotagRef.current.currentTime = 0;
      progressBarRef.current.value = 0;
      setMusicCurrentTime(null);
      setMusicDuration(null);
    }
    if (result) {
      progressBarRef.current.value = result;
    } else {
      progressBarRef.current.value = 0;
    }
  };

  let mouseDownOnSlider = false;

  const changeState = () => {
    if (playerState === "pause") {
      audiotagRef.current.pause();
      setPlayerState("play");
    } else {
      audiotagRef.current.play();
      setPlayerState("pause");
    }
  };

  const getPlaylist = async () => {
    try {
      const result = await axios.get("http://localhost:4001/playlist");
      setPlaylist(result.data);
    } catch (error) {}
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  const changeTrack = async (type) => {
    const size = playlist.length - 1;
    if (type === "next") {
      if (position < size) {
        setSlide(0);
        setPlayerState("pause");
        setPosition((prev) => prev + 1);
        audiotagRef.current.pause();
        audiotagRef.current.play();
      }
    } else {
      if (position > 0) {
        setSlide(0);
        setPlayerState("pause");
        setPosition((prev) => prev - 1);
        audiotagRef.current.pause();
        audiotagRef.current.play();
      }
    }
  };

  const calculateTime = (secs, type) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    if (type === "duration") {
      setMusicDuration(`${minutes}:${returnedSeconds}`);
      setDuratioInSeconds(secs);
    } else {
      setMusicCurrentTime(`${minutes}:${returnedSeconds}`);
    }
  };

  useEffect(() => {
    setSlide(0);
    audiotagRef.current.play();
    if (audiotagRef) {
      audiotagRef.current.addEventListener("timeupdate", (e) => {
        const { duration, currentTime } = e.target;
        if (currentTime === 0) {
          changeTrack("next");
        }
        e.target.onloadedmetadata = function () {
          calculateTime(e.target.duration, "duration");
          calculateTime(e.target.duration, "duration");
          calculateTime(e.target.currentTime, "currentTime");
        };
        handleProgressBar(currentTime, duration);
      });
      return () => {
        audiotagRef.current.removeEventListener("timeupdate", () => {});
      };
    }
  }, [audiotagRef, position]);

  const handleAudioRepeat = () => {
    audiotagRef.current.loop = !audiotagRef.current.loop;
  };

  const HandleAudioVolume = (volumeValue) => {
    audiotagRef.current.volume = (volumeValue * 10) / 1000;
  };

  return (
    <Container>
      {playlist !== null && (
        <CurrentSoundContainer>
          <img height={80} src={playlist[position].image} />
          <div>
            <p className="sound-name">{playlist[position].song}</p>
            <p className="band-name">{playlist[position].artist}</p>
          </div>
        </CurrentSoundContainer>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "cemter",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div className="shuffle">
            <BsShuffle />
          </div>
          <div className="previous">
            <CgPlayTrackPrev onClick={() => changeTrack("previous")} />
          </div>
          <div className="state">
            <div>
              {playerState === "pause" ? (
                <BsFillPauseCircleFill onClick={changeState} />
              ) : (
                <BsFillPlayCircleFill onClick={changeState} />
              )}
            </div>
          </div>
          <div className="next">
            <CgPlayTrackNext onClick={() => changeTrack("next")} />
          </div>
          <div className="repeat">
            <FiRepeat onClick={handleAudioRepeat} />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {playlist !== null && (
            <p
              style={{ color: "white", marginRight: "10px", fontSize: "11px" }}
            >
              {musicCurrentTime}
            </p>
          )}

          <audio
            style={{ margin: "0 10px" }}
            hidden
            controls
            controlsList="nodownload noplaybackrate"
            ref={audiotagRef}
            preload="metadata"
            src={
              playlist !== null
                ? `http://localhost:4001/song/${playlist[position].id}`
                : ""
            }
          />
          <input
            ref={progressBarRef}
            style={{ width: "400px" }}
            type="range"
            id="threshold"
            min={0}
            max={100}
            step={0.5}
            defaultValue={state}
            onMouseUp={handleChange}
          />
          {playlist !== null && musicDuration !== null && (
            <p style={{ color: "white", marginLeft: "10px", fontSize: "11px" }}>
              {musicDuration}
            </p>
          )}
        </div>
      </div>
      <VolumeContainer>
        <input
          type="range"
          onMouseUp={(e) => {
            HandleAudioVolume(e.currentTarget.value);
          }}
          min={0}
          max={100}
        />
      </VolumeContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100vw;
  align-items: center;
  justify-content: space-around;
  gap: 2rem;
  svg {
    color: #b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
    }
  }
  .state {
    svg {
      color: white;
    }
  }
  .previous,
  .next,
  .state {
    font-size: 2rem;
  }
`;

const CurrentSoundContainer = styled.div`
  display: flex;
  align-items: center;
  img {
    height: 56px;
    margin-right: 15px;
  }
  div {
    display: flex;
    flex-direction: column;
    .sound-name {
      font-size: 14px;
      margin: 0;
      color: white;
    }
    .band-name {
      font-size: 11px;
      margin: 0;
      color: white;
    }
  }
`;

const VolumeContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-content: center;
  input {
    width: 15rem;
    border-radius: 2rem;
    height: 0.5rem;
    margin-right: 2.3rem;
  }
`;
