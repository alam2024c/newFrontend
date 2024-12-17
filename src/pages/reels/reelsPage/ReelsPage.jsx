// App.js
import React, { useState, useRef, useEffect } from "react";
// import "./App.css";
import Video from "./Video";
// import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
import useElementOnScreen from "./useElementOnScreen";
import "./ReelsPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../../../assets/images/icons";
import { IoMdClose } from "react-icons/io";
import { stateCurrent } from "../../../rtk/slices/authSlice";

function ReelsPage() {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const { token, deletePost_id, update } = useSelector((state) => state.auth);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState([]);
  const [item, setItem] = useState([]);
  const lastVideoRef = useRef(null);
  const navigate = useNavigate();
  const isLastVideoVisible = useElementOnScreen(
    { root: null, rootMargin: "0px", threshold: 0.3 },
    lastVideoRef
  );

  const params = useParams().id;
  const fetchData = async () => {
    if (params) {
      try {
        const response = await fetch(`${URL}/api/post/get_post_id/${params}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setItems([data?.data]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, [params]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${URL}/api/post/get_post_reel?page=${page}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        if (data.data.length === 0) {
          setHasMore(false);
        } else {
          if (params) {
            const filteredData = data.data.filter((e) => e.id != params);
            setItems((prevItems) => [...prevItems, ...filteredData]);
          } else {
            setItems((prevItems) => [...prevItems, ...data.data]);
          }
          setPage(page + 1);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (hasMore && isLastVideoVisible) {
      fetchData();
    }
  }, [page, hasMore, isLastVideoVisible]);
  useEffect(() => {}, [items]);
  const dispatch = useDispatch("");
  return (
    <div className="reelsPage">
      <div
        className="icons-reels cursor-pointer font-xl text-white d-md-block d-none"
        style={{
          position: "absolute",
          top: "35px",
          left: "35px",
          zIndex: "10000000",
          background: "#fff",
          padding: "10px",
          borderRadius: "50%",
        }}
        onClick={() => {
          // dispatch(stateCurrent(""));
          navigate(-1);
        }}
      >
        <IoMdClose style={{ color: "#000" }} />

        {/* <img
          src={close}
          className="cursor-pointer font-xl text-white"
          style={{ width: "15px" }}
        /> */}
      </div>
      <div className="app_videos cursor-pointer lg:w-3/12 sm:w-5/12">
        {item.length > 0 && (
          <Video key={item?.id} videos={item} likes={34} url={item.src} />
        )}
        {items.length > 0 &&
          items.map((videos, index) => (
            <Video
              key={videos?.id}
              videos={videos}
              likes={34}
              url={videos.src}
            />
          ))}
        {/* Attach a ref to the last video */}
        <div ref={lastVideoRef}></div>
      </div>
    </div>
  );
}

export default ReelsPage;
