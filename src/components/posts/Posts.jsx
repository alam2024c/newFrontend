import { useSelector } from "react-redux";
import { CreatePost, SinglePost } from "../";
import { getDataPost } from "./getDataPost";
import InfiniteScroll from "react-infinite-scroll-component";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useState } from "react";
import Loading from "../Loading/Loading";
import { useTranslation } from "react-i18next";
import ShowPost from "../../pages/ShowPost/ShowPost";

export default function Posts({ data }) {
  const { token, deletePost_id, update, user } = useSelector(
    (state) => state.auth
  );
  const [showPost, setShowPost] = useState(false);
  const [t, i18n] = useTranslation("");
  const uploads = useSelector((state) => state.progress.uploads);
  const [filter, setFilter] = useState("");
  const { items, hasMore, loadMore } = getDataPost(
    1,
    token,
    deletePost_id,
    update,
    "post/post",
    filter,
    i18n.language
  );
  return (
    <>
      {showPost ? (
        <ShowPost />
      ) : (
        <InfiniteScroll
          dataLength={items.length}
          next={loadMore}
          hasMore={hasMore}
          loader={<Loading />}
        >
          <div className="flex items-center flex-col gap-4">
            {user && <CreatePost setFilter={setFilter} uploads={uploads} />}

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
      )}
    </>
  );
}
