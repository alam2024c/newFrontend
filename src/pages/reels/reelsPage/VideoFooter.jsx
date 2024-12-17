import React from "react";
import "./VideoFooter.css";
import { Link } from "react-router-dom";
// import Avatar from "react-avatar";
// import MusicNoteicon from '@material-ui/icons/MusicNote'
// import Ticker from 'react-ticker'
// import disk from './img/disk.png'
// const PF = process.env.REACT_APP_PUBLIC_FOLDER;

const VideoFooter = ({ channel, description, song, videos }) => {
  return (
    <div className="d-flex gap-3 videoFooter w-100 align-items-center">
      <Link
        to={"/portfolio/" + videos.user_id}
        className="text-white font-xss mt-1 "
      >
        <h2
          style={{ fontSize: "20px", fontWeight: "bold" }}
          className="my-0 text-white"
        >
          {videos?.user?.first_name} {videos?.user?.last_name}
        </h2>
      </Link>
      <Link to={"/portfolio/" + videos.user_id} className=" ms-3">
        {videos?.user?.profile?.user_img ? (
          <img
            src={PF + videos.user.profile.user_img}
            alt=""
            className="shadow-sm rounded-circle w50 h50"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <Avatar facebookId="100008343750912" size="60" round={true} />
        )}
      </Link>
      {/* <img
        src={PF + videos.image}
        alt=""
        className="shadow-sm rounded-circle w50 h50"
      /> */}
    </div>
  );
};

export default VideoFooter;
