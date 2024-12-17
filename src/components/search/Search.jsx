import { useState } from "react";
import { Input } from "../ui";
import { person } from "../../assets/images/icons";

import { useNavigate } from "react-router-dom";

import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { getDataSearch } from "../posts/getDataPost";
import SinglePost from "../singlePost/SinglePost";

export default function Search({ isFullScreen = false }) {
  const [selected, setSelected] = useState("all");
  const headersTitles = ["all", "user", "post", "videos", "research", "tag"];

  const URL = import.meta.env.VITE_REACT_APP_API_KEY;

  const { token } = useSelector((state) => state.auth);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { items, setPage, setItems, hasMore } = getDataSearch(
    1,
    token,
    "search-general",
    text,
    selected,
    navigate,
    dispatch
  );
  // console.log(items);
  return (
    <div className="resume flex items-center flex-col gap-4">
      <div className="bg-[#F7F9FA] resume rounded-2xl sm:px-4 pt-4 shadow w-full max-w-4xl">
        <Input
          hasIcon={true}
          inputClassName="p-16"
          placeholder={t("search")}
          type={"search"}
          handleChange={(e) => setText(e.target.value)}
        />

        <ul className="flex justify-around sm:justify-start sm:gap-8 sm:ps-10">
          {headersTitles.map((header, index) => (
            <li
              className={`border-black ${
                selected === header ? "border-b-2 text-black" : "text-[#969696]"
              }`}
              key={index}
            >
              <button
                className="capitalize sm:px-6 pt-8 pb-2 "
                onClick={() => setSelected(header)}
              >
                {t(header)}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {items &&
        items.map((s, index) => (
          <>
            {s.category_id ? (
              <SinglePost key={s.id} data={s} />
            ) : s.posts_count ? (
              <div
                className="d-flex  p-2 align-items-center gap-3 cursor-pointer w-100"
                key={index}
                onClick={() => navigate(`/singlePostTag/${s.tag}`)}
              >
                <div className=" mx-5 bg-blue-50 bg-blue-50 text-black rounded-2xl px-4 shadow w-full d-flex p-2 align-items-center w-100 justify-content-between">
                  <h3>#{s.tag}</h3>
                  <span>{s.posts_count}</span>
                </div>
              </div>
            ) : (
              <div
                className=" bg-blue-50 text-black  rounded-2xl px-4 shadow w-full  max-w-4xl    d-flex p-2 align-items-center gap-3 cursor-pointer "
                key={index}
                onClick={() => navigate(`/profile/${s.user_name}`)}
              >
                {s?.profile?.image ? (
                  <img
                    src={`${URL}/storage/${s.profile.image}`}
                    alt=""
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <img
                    style={{ width: "40px" }}
                    className="rounded-full"
                    src={person}
                    alt="PFP"
                  />
                )}
                <h3 className="m-0 p-0">
                  {s.first_name} {s.last_name}
                </h3>
              </div>
            )}
          </>
        ))}
      {text ? (
        <>
          {selected == "all" && (
            <div className="cursor-pointer" onClick={() => setSelected("user")}>
              {t("Show All")}
            </div>
          )}
        </>
      ) : (
        <>
          {selected == "all" && (
            <div className="cursor-pointer" onClick={() => setSelected("user")}>
              {t("Not Found")}
            </div>
          )}
        </>
      )}
    </div>
  );
}
