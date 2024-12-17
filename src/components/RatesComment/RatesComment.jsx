import React, { useState } from "react";
import { getDataPostRate } from "../posts/getDataPost";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { t } from "i18next";
import { Dropdown } from "../ui";
import { dots } from "../../assets/icons";
import { Rate } from "rsuite";

function RatesComment() {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;

  const { token, deletePost_id, update } = useSelector((state) => state.auth);
  const [filter, setFilter] = useState("");
  const paramId = useParams().id;

  const { items, hasMore, loadMore } = getDataPostRate(
    1,
    token,

    "cv-user_rate",

    paramId
  );
  console.log("items,rate", items);
  // const dropdownData = [{ name: "report Comment", image: flags, value: "report" }];
  // const dropdownDataMe = [
  //   { name: "delete Comment", image: trash, value: "delete" },
  //   { name: "edit Comment", image: edit, value: "edit" },

  // ];
  return (
    <InfiniteScroll
      dataLength={items.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<div className="lds-default  m-auto d-flex"></div>}
    >
      {" "}
      {items[0]?.id
        ? items.map((post) => (
            <div className=" contentRequest mb-3">
              <div className="w-100 d-flex justify-content-between">
                <div className="card-body p-0 d-flex">
                  <figure className="avatar ms-3">
                    <img
                      className="shadow-sm rounded-circle w45"
                      src={
                        post?.user_img
                          ? `${URL}/storage/${post?.user_img}`
                          : `${URL}/storage/${post?.user_img}`
                      }
                      alt=""
                    />
                  </figure>
                  <h5 className="fw-700 text-grey-900 font-sm mt-1 mt">
                    {post?.first_name} {post?.last_name}
                    <span className="d-block font-sm fw-500 mt-1 lh-3  text-grey-500">
                      {/* {t("ago")} 2 {t("hour")} */}
                    </span>
                  </h5>
                </div>

                {/* <Dropdown
                  buttonData={<img className="w-5" src={dots} alt="" />}
                  data={
                    user?.id == post?.user_id ? dropdownDataMe : dropdownData
                  }
                  type="offer"
                  post={post}
                /> */}
              </div>{" "}
              <div className="add" style={{ padding: "15px 40px" }}>
                {" "}
                <h4 className="fw-700 text-grey-900 font-xs my-2 mb-4">
                  {t("Statistics")}{" "}
                </h4>{" "}
                <ul className="front">
                  <li
                    style={{ justifyContent: "space-between" }}
                    className="d-flex align-items-center justify-content-between w-100 text-base	 text-grey-600 mb-2"
                  >
                    {t("project_completion_rate ")}
                    <div
                      className="d-flex w-100 align-items-center"
                      style={{ justifyContent: "end" }}
                    >
                      <Rate
                        readOnly
                        allowHalf
                        color="yellow"
                        value={post?.project_completion_rate}
                      />{" "}
                    </div>
                  </li>{" "}
                  <li
                    style={{ justifyContent: "space-between" }}
                    className="d-flex align-items-center justify-content-between w-100 text-base	 text-grey-600 mb-2"
                  >
                    {t("re_employment_rate ")}
                    <div
                      className="d-flex w-100 align-items-center"
                      style={{ justifyContent: "end" }}
                    >
                      <Rate
                        readOnly
                        allowHalf
                        color="yellow"
                        value={post?.re_employment_rate}
                      />{" "}
                    </div>
                  </li>{" "}
                  <li
                    style={{ justifyContent: "space-between" }}
                    className="d-flex align-items-center justify-content-between w-100 text-base	 text-grey-600 mb-2"
                  >
                    {t("response_speed ")}
                    <div
                      className="d-flex w-100 align-items-center"
                      style={{ justifyContent: "end" }}
                    >
                      <Rate
                        readOnly
                        allowHalf
                        color="yellow"
                        value={post?.response_speed}
                      />{" "}
                    </div>
                  </li>{" "}
                  <li
                    style={{ justifyContent: "space-between" }}
                    className="d-flex align-items-center justify-content-between w-100 text-base	 text-grey-600 mb-2"
                  >
                    {t("time_delivery_rate ")}
                    <div
                      className="d-flex w-100 align-items-center"
                      style={{ justifyContent: "end" }}
                    >
                      <Rate
                        readOnly
                        allowHalf
                        color="yellow"
                        value={post?.time_delivery_rate}
                      />{" "}
                    </div>
                  </li>{" "}
                  
                </ul>{" "}
              </div>{" "}
            </div>
          ))
        : ""}
    </InfiniteScroll>
  );
}

export default RatesComment;
