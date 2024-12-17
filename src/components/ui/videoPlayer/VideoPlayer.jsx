import { useState, useRef, useEffect } from "react";

import {
  expand,
  full,
  pause,
  pause1,
  settings1,
  valueUp,
  volume_down,
  volume_off,
  volume_up,
} from "../../../assets/images/icons";
import "./VideoPlayer.scss";
import { play } from "../../../assets/icons";
import { BsFullscreen, BsVolumeUp } from "react-icons/bs";
import {
  MdOutlineSlowMotionVideo,
  MdRestartAlt,
  MdUpdateDisabled,
} from "react-icons/md";
import { FaPlay } from "react-icons/fa6";

export default function VideoPlayer({ data, play = false }) {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(play);
  const [volume, setVolume] = useState(1);
  const [timeLine, setTimeLine] = useState(0);

  const playVideo = () => {
    videoRef.current.play();
    setIsPlaying(true);
  };

  const pauseVideo = () => {
    console.log("stop");
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseVideo();
    } else {
      playVideo();
    }
  };

  // useEffect(() => {
  //   const handleTimeUpdate = () => {
  //     setTimeLine(videoRef.current.currentTime);
  //   };

  //   videoRef.current.addEventListener("timeupdate", handleTimeUpdate);

  //   return () => {
  //     videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);
  //   };
  // }, []);

  useEffect(() => {
    const handleTimeUpdate = () => {
      setTimeLine(videoRef.current.currentTime);
    };

    const currentVideoRef = videoRef.current;

    if (currentVideoRef) {
      currentVideoRef.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (currentVideoRef) {
        currentVideoRef.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, []);

  const handleTimeLine = (event) => {
    setTimeLine(parseFloat(event.target.value));
    videoRef.current.currentTime = parseFloat(event.target.value);
  };

  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value));
    videoRef.current.volume = parseFloat(event.target.value);
  };

  const handleFullScreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.mozRequestFullScreen) {
      videoRef.current.mozRequestFullScreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.msRequestFullscreen) {
      videoRef.current.msRequestFullscreen();
    }
  };

  const add0toLiftFormat = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
  });

  const formatTime = (time) => {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);

    if (hours === 0) {
      return `${add0toLiftFormat.format(minutes)}:${add0toLiftFormat.format(
        seconds
      )}`;
    } else {
      return `${hours}:${add0toLiftFormat.format(
        minutes
      )}:${add0toLiftFormat.format(seconds)}`;
    }
  };

  const maxTime = isNaN(videoRef.current?.duration)
    ? 0
    : videoRef.current.duration;

  useEffect(() => {
    const handleScroll = () => {
      const videoBoundingBox = videoRef?.current?.getBoundingClientRect();
      const isVideoInViewport =
        videoBoundingBox?.top >= 0 &&
        videoBoundingBox?.bottom <= window?.innerHeight;

      if (isPlaying && !isVideoInViewport) {
        pauseVideo();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isPlaying]);

  return (
    <div
      className={`videoPlayer ${isPlaying}`}
      style={{ position: "relative" }}
    >
      <video
        className="video"
        style={{ maxHeight: "400px" }}
        src={`${URL}/storage/videos/${data}`}
        ref={videoRef}
        onClick={togglePlay}
        autoPlay={isPlaying}
        // muted
        // loop
      />
      <div className="controlsContainer">
        <div className="controlsTimeLine">
          <input
            type="range"
            min="0"
            step="any"
            value={timeLine}
            onChange={handleTimeLine}
            max={maxTime}
          />
        </div>
        <div className="controlsButtons">
          {timeLine === maxTime ? (
            <MdRestartAlt className="text-lg" onClick={togglePlay} />
          ) : (
            <>
              {isPlaying ? (
                <img
                  src={
                    isPlaying
                      ? timeLine === maxTime
                        ? MdRestartAlt
                        : pause
                      : play
                  }
                  alt=""
                  role="button"
                  onClick={togglePlay}
                />
              ) : (
                <FaPlay className="text-2xl" />
              )}
            </>
          )}
          {/* <img
            src={
              isPlaying ? (timeLine === maxTime ? MdRestartAlt : pause) : play
            }
            alt=""
            role="button"
            onClick={togglePlay}
          /> */}
          <img
            src={
              volume === 0
                ? MdUpdateDisabled
                : volume > 0.4
                ? valueUp
                : volume_down
            }
            alt=""
            className="volumeIcon"
          />
          
          <input
            type="range"
            min="0"
            max="1"
            step="any"
            defaultValue="1"
            onChange={handleVolumeChange}
            className="volumeControls"
          />
          <p className="duration">
            <span>{formatTime(timeLine)}</span>/
            <span>{formatTime(maxTime)}</span>
          </p>
          <img src={full} alt="" role="button" onClick={handleFullScreen} />
        </div>
      </div>
    </div>
  );
}
