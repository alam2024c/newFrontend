import { useTranslation } from "react-i18next";
import Picture from "../../../assets/images/Picture.png";
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown } from "../../../components/ui";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { dots } from "../../../assets/icons";
import { edit, flags, trash } from "../../../assets/images/icons";
import Loading from "../../../components/Loading/Loading";
import AddPlayList from "./AddOneCourse/AddAddOneCourse";
import { getDataPostMyCourses } from "../../../components/posts/getDataPost";
import PlayListBox from "../../../components/PlayListBox/PlayListBox";
import axios from "axios";
import CoursesBox from "../../../components/CoursesBox/CoursesBox";
import VideoPlayer from "../../../components/ui/videoPlayer/VideoPlayer";
import TextPost from "../../../components/PostHeader/TextPost";
function OneCourse() {
  const { user } = useSelector((state) => state.auth);

  const URL = import.meta.env.VITE_REACT_APP_API_KEY;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, videoCourse_id, updateMyCourse } = useSelector(
    (state) => state.auth
  );
  const uploads = useSelector((state) => state.progress.uploads);
  const [filter, setFilter] = useState("");
  const dropdownData = [{ name: "report post", image: flags, value: "report" }];
  const dropdownDataMe = [
    { name: "delete post", image: trash, value: "delete" },
    { name: "edit post", image: edit, value: "edit" },
  ];
  const [t, i18n] = useTranslation();
  const params = useParams().id;
  const idCourse = useParams().idCourse;
  const [change, setChange] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getData();
  }, [params, change, videoCourse_id]);
  const [items, setItems] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(`${URL}/api/playlist/${params}/show`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setItems(res?.data);
    } catch (err) {
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [idCourse]);

  return (
    <div className=" max-w-4xl m-auto ">
      {" "}
      <div className="jobSearch">
        {user?.id == items?.user_id && (
          <AddPlayList setChange={setChange} change={change} />
        )}

        <div className="flex justify-center items-center px-4 pt-6"></div>

        <div className="flex items-center flex-col gap-4">
          {/* <CreatePost setFilter={setFilter} /> */}
          {uploads.map((upload) => (
            <div key={upload.fileId} className="w-100">
              {upload.isLoading && (
                <div className="w-full flex justify-between bg-white rounded-2xl items-center max-w-4xl shadow-xss p-3 m-auto">
                  <div className="">{t("uploading")}</div>
                  <div className="w-16">
                    <CircularProgressbar
                      value={upload.percentage}
                      text={`${upload.percentage}%`}
                      styles={buildStyles({
                        textColor: "#333",
                        pathColor: "#007bff",
                        trailColor: "#f0f0f0",
                        textSize: "1.75rem",
                      })}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="container mx-auto p-4">
            <div
              className="mb-5 "
              style={{ overflow: "hidden", position: "relative" }}
            >
              {loading ? (
                <Loading height="30vh" />
              ) : (
                <>
                  {items?.courses?.length > 0 && (
                    <>
                      {items?.id
                        ? items?.courses?.map((post, index) => (
                            <>
                              {post.id == idCourse && (
                                <>
                                  <div className="sm:flex flex-row-reverse w-full justify-between">
                                    <div className="flex justify-end items-cente gap-4 pt-3">
                                      <Dropdown
                                        buttonData={
                                          <img
                                            className="w-5"
                                            src={dots}
                                            alt=""
                                          />
                                        }
                                        data={
                                          user?.id == post?.user_id &&
                                          dropdownDataMe
                                        }
                                        type="videoCourse"
                                        post={post}
                                      />
                                    </div>

                                    <div className="flex align-items-center gap-2 pt-2">
                                      <button
                                        className="w-12 h-12 p-0 rounded-full"
                                        onClick={() =>
                                          navigate(
                                            `/profile/${items?.user?.user_name}`
                                          )
                                        }
                                      >
                                        <img
                                          className="w-full h-full"
                                          style={{
                                            borderRadius: "50%",
                                            width: "50px",
                                            height: "50px",
                                            minWidth: "50px",
                                          }}
                                          src={
                                            items?.user?.profile.image
                                              ? `${URL}/storage/${items?.user?.profile.image}`
                                              : person
                                          }
                                          alt=""
                                        />
                                      </button>
                                      <div>
                                        <p
                                          className="flex gap-1 capitalize font-black align-items-center"
                                          onClick={() =>
                                            navigate(
                                              `/profile/${items?.user?.user_name}`
                                            )
                                          }
                                        >
                                          {`${items?.user?.first_name} ${items?.user?.last_name}`}
                                          {/* {} */}
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  <VideoPlayer
                                    play={true}
                                    data={post?.video}
                                    user={user}
                                  />
                                  <div
                                    className="p-4"
                                    style={{ textAlign: "start" }}
                                  >
                                    <h2 className="text-lg font-semibold">
                                      {post?.title}
                                    </h2>
                                    <p className="text-gray-600">
                                      {/* {post?.desc} */}
                                      <TextPost text={post?.desc} />
                                    </p>
                                  </div>
                                </>
                              )}
                            </>
                          ))
                        : ""}
                    </>
                  )}
                </>
              )}
              <h1 className="text-2xl font-bold mt-4 text-center ">{items?.name}</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items?.id
                ? items?.courses?.map((post, index) => (
                    <CoursesBox post={post} index={index} />
                  ))
                : ""}
            </div>
          </div>
        </div>

        <style>
          {`
                 @media (max-width: 644px) {
                  .singlePost{
                    display: block;

                  }              
                 `}
        </style>
      </div>
    </div>
  );
}

export default OneCourse;
