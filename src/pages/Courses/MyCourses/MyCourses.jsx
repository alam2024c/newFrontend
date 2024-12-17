import { useTranslation } from "react-i18next";
import Picture from "../../../assets/images/Picture.png";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "../../../components/ui";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { dots } from "../../../assets/icons";
import { edit, flags, trash } from "../../../assets/images/icons";
import FiltersBarJob from "../../../components/ui/filtersBar/FiltersBarJob";
import Loading from "../../../components/Loading/Loading";
import AddPlayList from "./AddPlayList/AddPlayList";
import { getDataPostMyCourses } from "../../../components/posts/getDataPost";
import PlayListBox from "../../../components/PlayListBox/PlayListBox";
function MyCourses() {
  const { user } = useSelector((state) => state.auth);

  const URL = import.meta.env.VITE_REACT_APP_API_KEY;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, deleteCourse_id, updateMyCourse } = useSelector(
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
  const { items, hasMore, loadMore } = getDataPostMyCourses(
    1,
    token,
    deleteCourse_id,
    updateMyCourse,
    "playlist",
    filter,
    dispatch,
    navigate
  );
  return (
    <div className="jobSearch">
      <AddPlayList />

      <div className="flex justify-center items-center px-4 pt-6"></div>
      <InfiniteScroll
        dataLength={items.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<Loading />}
      >
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
          {items[0]?.id
            ? items.map((post, index) => (
                <div
                  className="contentRequest w-100"
                  style={{ margin: "5px" }}
                  key={index}
                >
                  <div
                    className="contentRequest"
                    style={{ margin: "10px 5px" }}
                  >
                    <div className="add ">
                      <div className="w-100 add border-0 d-flex justify-content-between align-items-center">
                        <p
                          onClick={() => {
                            navigate(`/profile/${post?.user?.user_name}`);
                          }}
                          style={{
                            color: "#25324B",
                            fontSize: "20px",
                            fontWeight: "600",
                          }}
                        >
                          <img
                            className="w-full h-full"
                            src={
                              post?.user?.profile?.image
                                ? `${URL}/storage/${post?.user?.profile?.image}`
                                : Picture
                            }
                            alt=""
                          />
                          {/* <img src={Picture} alt="" /> */}
                          {post?.user?.first_name} {post?.user?.last_name}
                          {/* {t("Brand Designer")} */}
                        </p>
                        <Dropdown
                          buttonData={<img className="w-5" src={dots} alt="" />}
                          data={
                            user?.id == post?.user_id
                              ? dropdownDataMe
                              : dropdownData
                          }
                          type="my-courses"
                          post={post}
                        />
                      </div>
                      <PlayListBox playlist={post} />
                    </div>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </InfiniteScroll>

      <style>
        {`
                 @media (max-width: 644px) {
                  .singlePost{
                    display: block;

                  }              
                 `}
      </style>
    </div>
  );
}

export default MyCourses;
