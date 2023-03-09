import React, { useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
export default function PlayerControls() {
  const audiotagRef = useRef(null);
  const [playerState, setPlayerState] = useState("pause");

  const changeState = () => {
    if (playerState === "pause") {
      audiotagRef.current.play();
      setPlayerState("play");
    } else {
      audiotagRef.current.pause();
      setPlayerState("pause");
    }
  };

  const changeTrack = async (type) => {};

  const getAudio = async () => {
    try {
      const result = await axios.get("http://localhost:3001/play-audio");
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getAudio();
  }, []);

  const handleAudioRepeat = () => {
    audiotagRef.current.loop = !audiotagRef.current.loop;
  };

  const HandleAudioVolume = (volumeValue) => {
    audiotagRef.current.volume = (volumeValue * 10) / 1000;
  };

  return (
    <Container>
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
          <audio
            hidden
            ref={audiotagRef}
            src="http://localhost:3001/playlist"
          />
        </div>
      </div>
      <div className="next">
        <CgPlayTrackNext onClick={() => changeTrack("next")} />
      </div>
      <div className="repeat">
        <FiRepeat onClick={handleAudioRepeat} />
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
  align-items: center;
  justify-content: center;
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
