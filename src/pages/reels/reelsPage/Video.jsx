import React, { useEffect, useRef, useState } from "react";
import "./Video.css";
import VideoFooter from "./VideoFooter";
import VideoSidebar from "./VideoSidebar";
import useElementOnScreen from "./useElementOnScreen";
import VideoPlayButton from "./VideoPlayButton";
import { Dropdown } from "../../../components/ui";
import { dots } from "../../../assets/icons";
import { edit, flags, trash } from "../../../assets/images/icons";
import { useSelector } from "react-redux";
const Video = ({
  url,
  channel,
  description,
  song,
  likes,
  messages,
  videos,
  shares,
  notPar,
}) => {
    const { user } = useSelector((state) => state.auth);

  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const dropdownData = [{ name: "report post", image: flags, value: "report" }];
  const dropdownDataMe = [
    { name: "delete post", image: trash, value: "delete" },
    { name: "edit post", image: edit, value: "edit" },
  ];
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };
  const isVisibile = useElementOnScreen(options, videoRef);
  const onVideoClick = () => {
    if (playing) {
      videoRef.current.pause();
      setPlaying(!playing);
    } else {
      videoRef.current.play();
      setPlaying(!playing);
    }
  };
  useEffect(() => {
    if (isVisibile) {
      if (!playing) {
        videoRef.current.play();
        setPlaying(true);
      }
    } else {
      if (playing) {
        videoRef.current.pause();
        setPlaying(false);
      }
    }
  }, [isVisibile]);
  const [liked, setLiked] = useState(false);
  return (
    <div className="video">
      <div className="" style={{left:"20px",position:"absolute",zIndex:"1000"}}>
        {!notPar && (
          <Dropdown
            buttonData={<img className="w-5" src={dots} alt="" />}
            data={user?.id == videos?.user?.id ? dropdownDataMe : dropdownData}
            post={videos}
          />
        )}
      </div>
      <video
        className="video_player"
        loop
        preload="true"
        ref={videoRef}
        onClick={onVideoClick}
        onDoubleClick={() => setLiked(true)}
        src={`${URL}/storage/videos/${videos?.video}`}
      ></video>
  
      {/* <ReelsHeader /> */}
      <VideoSidebar
        likes={likes}
        messages={messages}
        shares={shares}
        liked={liked}
        videos={videos}
        setLiked={setLiked}
      />
      {/* {!playing && <VideoPlayButton onVideoClick={onVideoClick} />} */}
    </div>
  );
};
export default Video;
