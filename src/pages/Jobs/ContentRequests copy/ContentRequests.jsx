import AddContents from "./AddContents/AddContents";
import { useTranslation } from "react-i18next";
import Picture from "../../../assets/images/Picture.png";
import { useNavigate } from "react-router-dom";
import { Dropdown, FiltersBar } from "../../../components/ui";
import { filters } from "/public/filters";

import "./ContentRequests.scss";
import { useDispatch, useSelector } from "react-redux";
import { getDataPostJobs } from "../../../components/posts/getDataPost";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { dots } from "../../../assets/icons";
import {
  close1,
  edit,
  flags,
  person,
  pin,
  storage,
  trash,
} from "../../../assets/images/icons";
import FiltersBarJob from "../../../components/ui/filtersBar/FiltersBarJob";
import Loading from "../../../components/Loading/Loading";
function ContentRequests() {
  const { user } = useSelector((state) => state.auth);
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, deletePost_id, updateContact } = useSelector(
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
  const { items, hasMore, loadMore } = getDataPostJobs(
    1,
    token,
    deletePost_id,
    updateContact,
    "content-show",
    filter,
    dispatch,
    navigate,
    i18n.language
  );
  return (
    <div className="jobSearch">
      <AddContents />

      <div className="flex justify-center items-center px-4 pt-6">
        <FiltersBarJob
          width="md:max-w-6xl"
          filters={filters}
          setFilterCategory={setFilter}
        />
      </div>
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
                            navigate(`/profile/${post.user_name}`);
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
                              post?.user_img
                                ? `${URL}/storage/${post?.user_img}`
                                : Picture
                            }
                            alt=""
                          />
                          {/* <img src={Picture} alt="" /> */}
                          {post?.first_name} {post?.last_name}
                          {/* {t("Brand Designer")} */}
                        </p>
                        <Dropdown
                          buttonData={<img className="w-5" src={dots} alt="" />}
                          data={
                            user?.id == post?.user_id
                              ? dropdownDataMe
                              : dropdownData
                          }
                          type="job"
                          post={post}
                        />
                      </div>
                      
                      <p
                        className="sm:px-14"
                        style={{
                          color: "#7C8493",
                          marginTop: "-14",
                        }}
                      >
                        {post?.title}
                      </p>
                      <div className="singlePost py-4 d-flex align-items-end flex-wrap gap-3">
                        <div className="  sm:pb-0">
                          {post?.skills.length > 0 &&
                          post?.skills.length > 3 ? (
                            <>
                              {post?.skills.slice(0, 2)?.map((s, index) => (
                                <button
                                  className={
                                    index + 1 > 2
                                      ? `btn${Math.floor(index + 1 / 2)}`
                                      : `btn${index + 1} `
                                  }
                                  key={index}
                                >
                                  {t(s?.label)}
                                </button>
                              ))}
                              <button className="btn4" key={index}>
                                ......
                              </button>
                            </>
                          ) : (
                            <>
                              {post?.skills.slice(0, 3)?.map((s, index) => (
                                <button
                                  className={
                                    index + 1 > 2
                                      ? `btn${Math.floor(index + 1 / 2)}  `
                                      : `btn${index + 1} `
                                  }
                                  key={index}
                                >
                                  {t(s?.label)}
                                </button>
                              ))}
                            </>
                          )}
                        </div>

                        <button
                          className="btn4 me-0 me-auto"
                          style={{ marginLeft: "0px", marginRight: "auto" }}
                          onClick={() => {
                            navigate(`/contect/${post.id}`);
                          }}
                        >
                          {t("Details")}
                        </button>
                      </div>
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

export default ContentRequests;