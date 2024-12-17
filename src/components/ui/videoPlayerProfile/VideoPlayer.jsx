import React, { useEffect, useRef, useState } from "react";
import {
  expand,
  pause1,
  settings1,
  volume_off,
  volume_up,
} from "../../../assets/images/icons";
import { play } from "../../../assets/icons";

// Import necessary dependencies and icons

export default function VideoPlayerProfile({ data }) {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  console.log(data);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [timeLine, setTimeLine] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const videoContainerRef = useRef(null);

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

  const handleTimeLine = (event) => {
    setTimeLine(parseFloat(event.target.value));
    videoRef.current.currentTime = parseFloat(event.target.value);
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

 useEffect(() => {
   const handleScroll = () => {
     const videoBoundingBox = videoRef.current.getBoundingClientRect();
     const isVideoInViewport =
       videoBoundingBox.top >= 0 &&
       videoBoundingBox.bottom <= window.innerHeight;

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
    <div className="relative ">
      <div className="" ref={videoContainerRef}>
        <video
          style={{ maxHeight: "70vh" }}
          className="rounded-3xl mt-3 w-full "
          ref={videoRef}
          onClick={handlePlayPause}
        >
          <source src={`${URL}/storage/${data}`} type="video/mp4" />
        </video>

        <div className="absolute rounded-3xl bg-[#2D2D2DA6] bottom-0 w-full flex p-5 gap-4 backdrop-blur-sm">
          <button onClick={handlePlayPause}>
            <img className="w-10" src={isPlaying ? pause1 : play} alt="" />
          </button>

          <input
            className="w-full"
            type="range"
            min="0"
            max={videoRef.current ? String(videoRef.current.duration) : "0"}
            step="0.01"
            value={timeLine}
            onChange={handleTimeLine}
          />

          {/* Adjust volume control */}
          {/* <input
            className="w-full"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          /> */}

          <button onClick={() => {}}>
            <img className="w-10" src={settings1} alt="" />
          </button>

          <button onClick={handleFullScreen}>
            <img className="w-10" src={expand} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

// export default function VideoPlayerProfile({ data }) {
//     const URL = import.meta.env.VITE_REACT_APP_API_KEY;

//   const videoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [volume, setVolume] = useState(1);
//   const [timeLine, setTimeLine] = useState(0);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const videoContainerRef = useRef(null);

//   const handleFullScreen = () => {
//     if (!isFullScreen) {
//       videoContainerRef.current.requestFullscreen();
//       setIsFullScreen(true);
//     } else {
//       document.exitFullscreen();
//       setIsFullScreen(false);
//     }
//   };

//   const handleVolumeChange = (event) => {
//     setVolume(event.target.value);
//     videoRef.current.volume = event.target.value;
//   };

//   const handleTimeLine = (event) => {
//     setTimeLine(parseFloat(event.target.value));
//     videoRef.current.currentTime = parseFloat(event.target.value);
//   };

//   const handlePlayPause = () => {
//     if (isPlaying) {
//       videoRef.current.pause();
//       setIsPlaying(false);
//     } else {
//       videoRef.current.play();
//       setIsPlaying(true);
//     }
//   };

//   useEffect(() => {
//     const handleTimeUpdate = () => {
//       setTimeLine(videoRef.current.currentTime);
//     };

//     const currentVideoRef = videoRef.current;

//     if (currentVideoRef) {
//       currentVideoRef.addEventListener("timeupdate", handleTimeUpdate);
//     }
//     return () => {
//       if (currentVideoRef) {
//         currentVideoRef.removeEventListener("timeupdate", handleTimeUpdate);
//       }
//     };
//   }, []);
//   return (
//     <div className="relative ">
//       <div className="" ref={videoContainerRef}>
//         {/* <video
//           className="video"
//           style={{ maxHeight: "400px" }}
//           src={`${URL}/storage/videos/${data}`}
//           onPlay={() => setIsPlaying(true)}
//           onPause={() => setIsPlaying(false)}
//           ref={videoRef}
//           onClick={handlePlayPause}
//         /> */}
//         <video
//           style={{ maxHeight: "70vh" }}
//           className="rounded-3xl mt-3 w-full "
//           ref={videoRef}
//           onClick={handlePlayPause}
//         >
//           <source src={`${URL}/storage/videos/${data}`} type="video/mp4" />
//         </video>
//         {/* <video
//           style={{ maxHeight: "70vh" }}
//           className="rounded-3xl mt-3 w-full "
//           ref={videoRef}
//           onPlay={() => setIsPlaying(true)}
//           onPause={() => setIsPlaying(false)}
//           onClick={handlePlayPause}
//         >
//           <source src={`${URL}/storage/videos/${data}`} type="video/mp4" />
//         </video> */}
//         {/* <img
//           className="absolute w-16 top-56 left-80  pointer-events-none"
//           src={isPlaying ? "" : play}
//           alt=""
//         /> */}

//         <div className="absolute rounded-3xl bg-[#2D2D2DA6] bottom-0 w-full flex p-5 gap-4 backdrop-blur-sm">
//           <button onClick={handlePlayPause}>
//             <img className="w-10" src={isPlaying ? pause1 : play} alt="" />
//           </button>

//           <input
//             className="w-full"
//             type="range"
//             min="0"
//             max={videoRef.current ? String(videoRef.current.duration) : "0"}
//             step="0.01"
//             value={timeLine}
//             onChange={handleTimeLine}
//           />

//           <div className="group relative flex justify-center items-center">
//             <input
//               className="absolute -rotate-90 bottom-16 hidden group-hover:block group-focus:block w-0 group-hover:w-20 group-focus:w-20 transition-all duration-300"
//               type="range"
//               min="0"
//               max="1"
//               step="0.01"
//               value={volume}
//               onChange={handleVolumeChange}
//             />
//             <button
//               onClick={() =>
//                 handleVolumeChange({
//                   target: { value: volume > 0 ? 0 : 1 },
//                 })
//               }
//             >
//               <img
//                 className="w-10"
//                 src={volume > 0 ? volume_up : volume_off}
//                 alt=""
//               />
//             </button>
//           </div>

//           <button onClick={() => {}}>
//             <img className="w-10" src={settings1} alt="" />
//           </button>

//           <button onClick={handleFullScreen}>
//             <img className="w-10" src={expand} alt="" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
