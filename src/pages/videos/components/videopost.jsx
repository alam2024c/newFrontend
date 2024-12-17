import { useRef, useState } from "react";
import play from "../../../assets/images/bigplay.png";
import full from "../../../assets/images/full.png";
import volumeup from "../../../assets/images/volumeup.png";
import setting from "../../../assets/images/setting.png";
import share from "../../../assets/images/share.png";
import comment from "../../../assets/images/comment.png";
import redheart from "../../../assets/images/redheart.png";
// import video from "../../../assets/videos/BigBuckBunny.mp4";
import { FaPause, FaExpand, FaVolumeMute } from "react-icons/fa";
import character from "../../../assets/images/user.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Videopost() {
  const [t] = useTranslation();

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);

  const handleFullScreen = () => {
    if (!isFullScreen) {
      videoContainerRef.current.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };
  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    videoRef.current.volume = event.target.value;
  };
  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <div
        className="card  shadow-xss rounded-xxl p-1 p-md-4  mb-3"
        style={{ border: "none" }}
      >
        <div className="card-body d-flex">
          <Link to="#" className=" ms-3" style={{ width: "85px" }}>
            <img
              src={character}
              alt=""
              style={{ width: "85px" }}
              className="rounded-circle"
            />
          </Link>
          <Link
            to="#"
            className="name fw-700 text-grey-900 font-lg mt-4 ms-3 d-flex"
          >
            User Name
            <span
              className="name d-block font-lg fw-500 ms-3 lh-3 text-grey-500"
              dir="ltr"
            >
              {t("@johndue 23s")}
            </span>
          </Link>
        </div>

        <div className="card-body d-block p-0 mb-3 " style={{ margin: "auto" }}>
          <div className="card-body d-block p-0 mb-3">
            <div className="row pe-2 ps-2">
              <div className="col-sm-12 p-1">
                {/* myvideo */}
                <div className="singlePost__body--video">
                  <div className="video-player" ref={videoContainerRef}>
                    <video
                      ref={videoRef}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    >
                      <source
                        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        type="video/mp4"
                      />
                    </video>

                    <div className="controls">
                      <button onClick={handlePlayPause}>
                        {isPlaying ? <FaPause /> : <img src={play} alt="" />}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                      />
                      <button
                        onClick={() =>
                          handleVolumeChange({
                            target: { value: volume > 0 ? 0 : 1 },
                          })
                        }
                      >
                        {volume > 0 ? (
                          <img src={volumeup} alt="" />
                        ) : (
                          <FaVolumeMute />
                        )}
                      </button>
                      <button>
                        <img src={setting} alt="" />
                      </button>
                      <button onClick={handleFullScreen}>
                        {isFullScreen ? (
                          <FaExpand />
                        ) : (
                          <img src={full} alt="" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-body d-flex gap-4 pt-3 mt-3 border-top-xs border-bottom-xs justify-content-xxl-around">
          <div
            className="emoji-bttn d-flex align-items-center fw-400 lh-26 font-lg ms-2"
            style={{ color: "#5B7083" }}
          >
            <img
              src={comment}
              alt=""
              style={{ width: "34px", marginRight: "5px" }}
            />{" "}
            61
          </div>
          <div
            className="emoji-bttn d-flex align-items-center fw-400 lh-26 font-lg ms-2"
            style={{ color: "#F4245E" }}
          >
            <img
              src={redheart}
              alt=""
              style={{ width: "34px", marginRight: "5px" }}
            />{" "}
            6.2K
          </div>{" "}
          <div
            className="emoji-bttn d-flex align-items-center fw-400 lh-26 font-lg ms-2"
            style={{ color: "#5B7083" }}
          >
            <img
              src={share}
              alt=""
              style={{ width: "34px", marginRight: "5px" }}
            />{" "}
            61
          </div>
        </div>
      </div>

      {/* 499 */}
      <style>
        {`
               
                @media (max-width:  499px) {
                    .avatar {
                       
                    }
.name{
    font-size: 15px  !important;
    margin-top: 1rem !important;
    flex-wrap: wrap;

}
                }
               
               
                 `}
      </style>
    </>
  );
}
export default Videopost;
