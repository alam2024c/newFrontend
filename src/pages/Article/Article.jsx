import { useNavigate, useParams } from "react-router-dom";
import { SinglePost } from "../../components";
import { FiltersBar } from "../../components/ui";
import { filters } from "/public/filters";
import { useEffect, useState } from "react";
import { t } from "i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { getDataPostArticle } from "../../components/posts/getDataPost";

export default function Article({ data }) {
  const { token, deletePost_id, update } = useSelector((state) => state.auth);
  const uploads = useSelector((state) => state.progress.uploads);
  const page = window.location.pathname.split("/")[1];

  const [filter, setFilter] = useState("");
  const { items, hasMore, loadMore } = getDataPostArticle(
    1,
    token,
    deletePost_id,
    update,
    "post/getArticle",
    filter
  );
  const buttons = ["articles", "news", "summaries"];
  const navigate = useNavigate();
  return (
    <>
      <ul className="flex text-center justify-evenly mb-4">
        {buttons.map((button, i) => (
          <li
            key={i}
            className={`pb-2 border-b-4 ${
              page === button ? "border-[#0099AB]" : "border-white"
            }`}
          >
            <button
              className="text-black capitalize font-black"
              onClick={() => {
                navigate(`/${button}`);
                // setSelected(button);
                handleFiltration(button);
              }}
            >
              {t(button)}
            </button>
          </li>
        ))}
      </ul>
      <InfiniteScroll
        dataLength={items.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<div className="lds-default  m-auto d-flex"></div>}
      >
        <div className="flex items-center flex-col gap-4">
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
            ? items.map((post) => <SinglePost key={post.id} data={post} />)
            : ""}
        </div>
      </InfiniteScroll>
    </>
  );
}
