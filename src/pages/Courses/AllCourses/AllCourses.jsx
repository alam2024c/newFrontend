import { useTranslation } from "react-i18next";
import Picture from "../../../assets/images/Picture.png";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "../../../components/ui";
import { filters } from "/public/filters";

import "./ContentRequests.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { dots } from "../../../assets/icons";
import { edit, flags, trash } from "../../../assets/images/icons";
import Loading from "../../../components/Loading/Loading";
import { getDataPostMyCourses } from "../../../components/posts/getDataPost";
import PlayListBox from "../../../components/PlayListBox/PlayListBox";
function AllCourses() {
  const { user } = useSelector((state) => state.auth);

  const URL = import.meta.env.VITE_REACT_APP_API_KEY;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, deleteCourse_id, updateMyCourse } = useSelector(
    (state) => state.auth
  );
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
    "courses",
    filter,
    dispatch,
    navigate
  );
  return (
    <div className="jobSearch">
      <input
        type="text"
        // value={query}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full md:w-2/2 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
        placeholder={`${t("Search")}...`}
      />
      <InfiniteScroll
        dataLength={items.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<Loading />}
      >
        <div className="flex items-center flex-col gap-4">
          {/* <CreatePost setFilter={setFilter} /> */}

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

export default AllCourses;
