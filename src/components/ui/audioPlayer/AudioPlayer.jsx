import { useRef, useState, useEffect } from "react";
import Button from "../button/Button";
import { circle } from "../../../assets/images";
import {
  pause,
  play2,
  profile1,
  volume_down,
  volume_off,
  volume_up,
} from "../../../assets/images/icons";
import "./AudioPlayer.scss";
import { t } from "i18next";

export default function AudioPlayer({ data, user }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const divRef = useRef(null);
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;

  const playAudio = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value));
    audioRef.current.volume = parseFloat(event.target.value);
  };

  const add0toLiftFormat = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
  });

  const formatTime = (time) => {
    if (time == "Infinity") {
      return "";
    } else {
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
    }
  };

  // useEffect(() => {
  //   // Add event listener to handle audio end
  //   audioRef.current.addEventListener("ended", () => {
  //     setIsPlaying(false);
  //   });

  //   // Add event listener to update current time
  //   audioRef.current.addEventListener("timeupdate", () => {
  //     setCurrentTime(audioRef.current.currentTime);
  //   });

  //   return () => {
  //     // Clean up the event listeners when the component unmounts
  //     audioRef.current.removeEventListener("ended", () => {
  //       setIsPlaying(false);
  //     });
  //     audioRef.current.removeEventListener("timeupdate", () => {
  //       setCurrentTime(audioRef.current.currentTime);
  //     });
  //   };
  // }, []);

  useEffect(() => {
    // Define event listener functions
    const handleAudioEnd = () => {
      setIsPlaying(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    // Add event listeners if audioRef is available
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleAudioEnd);
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    }

    // Clean up the event listeners when the component unmounts
    return () => {
      // Check if audioRef is still available
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleAudioEnd);
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [audioRef]); // Add audioRef as a dependency to make sure the effect is re-run if audioRef changes

  const maxTime = isNaN(audioRef.current?.duration)
    ? 0
    : audioRef.current.duration;
  useEffect(() => {
    const handleScroll = () => {
      const videoBoundingBox = divRef.current.getBoundingClientRect();
      const isVideoInViewport =
        videoBoundingBox.top >= 0 &&
        videoBoundingBox.bottom <= window.innerHeight;
      // console.log(isVideoInViewport, "isVideoInViewport");
      if (isPlaying && !isVideoInViewport) {
        pauseAudio();
        console.log("trs");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isPlaying]);
  return (
    <div ref={divRef}>
      <audio src={data} ref={audioRef} />
      <div className="w-full pt-4 lg:px-4">
        <Button
          dir="rtl"
          className="relative h-48 w-full sm:m-auto rounded-xl flex justify-center items-center cursor-auto"
          children={
            <>
              <img
                className={`w-32 absolute ${isPlaying && "playAnimation"}`}
                src={circle}
                alt=""
              />

              <img
                className="w-24 rounded-full "
                src={
                  user?.user?.profile.image
                    ? `${URL}/storage/${user?.user?.profile.image}`
                    : profile1
                }
                alt=""
              />

              <img
                className="absolute"
                src={isPlaying ? pause : play2}
                alt=""
                onClick={() => {
                  setIsPlaying(!isPlaying);
                  togglePlay();
                }}
              />

              <div className="absolute bottom-0 w-full flex justify-between p-2">
                <p>{t("voice")}</p>

                <div className="flex items-center volumeControlsContainer">
                  <img
                    src={
                      volume === 0
                        ? volume_off
                        : volume > 0.4
                        ? volume_up
                        : volume_down
                    }
                    alt=""
                  />

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="any"
                    defaultValue="1"
                    onChange={handleVolumeChange}
                  />

                  <span>
                    {maxTime ? formatTime(maxTime - currentTime) : ""}
                  </span>
                </div>
              </div>
            </>
          }
        />
      </div>
    </div>
  );
}
