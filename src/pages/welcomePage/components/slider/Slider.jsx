import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Slider.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import VideoPlayer from "../../../../components/ui/videoPlayer/VideoPlayer";
import { useNavigate } from "react-router-dom";

export default function Slider({}) {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const [data, setData] = useState([]);
  const getData = async () => {
    debugger
    try {
      const res = await axios.get(`${URL}/api/post/get_reel_rondom`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setData(res?.data?.data);
    } catch (err) {}
  };
  useEffect(() => {
    getData();
  }, []);
  const navigate = useNavigate();
  return (
    <div className="welcomeSwiperWrapper" style={{ minHeight: "40vh" }}>
      <Swiper
        slidesPerView={3}
        spaceBetween={23}
        // centeredSlides={true}
        centeredSlides={false}
        pagination={{
          type: "fraction",
          clickable: true,
        }}
        // navigation={true}
        loop={true}
        // modules={[Pagination, Navigation]}
        className="welcomeSwiper"
      >
        {data.map((item, index) => (
          <SwiperSlide
            key={index}
            onClick={() => navigate(`/reals/${item?.id}`)}
          >
            <video
              className="video"
              style={{ height: "250px" }}
              src={`${URL}/storage/videos/${item.video}`}
            ></video>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
