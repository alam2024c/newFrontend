// App.js
import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Video from "./Video";
import useElementOnScreen from "./hooks/useElementOnScreen";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";

function ReelsFinsh() {
  // const { token } = useSelector((state) => state.auth);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const lastVideoRef = useRef(null);
  const navigate = useNavigate();
  const isLastVideoVisible = useElementOnScreen(
    { root: null, rootMargin: "0px", threshold: 0.3 },
    lastVideoRef
  );

  const params = useParams().id;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://3lm.wearher-from-mimi.com/api/post/get_post_reel?page=${page}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       const data = await response.json();
  //       console.log(data);

  //       if (data.posts_type_reels.data.length === 0) {
  //         setHasMore(false);
  //       } else {
  //         if (params) {
  //           const filteredData = data.posts_type_reels.data.filter(
  //             (e) => e.id != params
  //           );
  //           setItems((prevItems) => [...prevItems, ...filteredData]);
  //         } else {
  //           setItems((prevItems) => [
  //             ...prevItems,
  //             ...data.posts_type_reels.data,
  //           ]);
  //         }
  //         setPage(page + 1);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   if (hasMore && isLastVideoVisible) {
  //     fetchData();
  //   }
  // }, [page, hasMore, isLastVideoVisible]);
  // const fetchData = async () => {
  //   if (params) {
  //     try {
  //       const response = await fetch(
  //         `https://3lm.wearher-from-mimi.com/api/post/get_post_reel/${params}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       const data = await response.json();
  //       console.log(data);
  //       setItems((prevItems) => [...prevItems, data.data.post]);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }
  // };
  // useEffect(() => {
  //   fetchData();
  // }, [params]);
  return (
    <div className="reelsPage">
      <BiArrowBack
        className="cursor-pointer font-xl text-white"
        style={{
          position: "absolute",
          top: "35px",
          left: "35px",
          zIndex: "10000000",
        }}
        onClick={() => {
          navigate(-1);
        }}
      />
      <div className="app_videos">
        {items.map((videos, index) => (
          <Video
            key={videos.id}
            videos={videos}
            likes={34}
            url={"https://wearher-from-mimi.com/storage/videos/" + videos.video}
          />
        ))}
        {/* Attach a ref to the last video */}
        <div ref={lastVideoRef}></div>
      </div>
    </div>
  );
}

export default ReelsFinsh;
