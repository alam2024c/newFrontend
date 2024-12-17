import { useEffect, useState } from "react";
import { SinglePost } from "..";
import { useSelector } from "react-redux";
import { getDataPostVideos } from "../posts/getDataPost";
import InfiniteScroll from "react-infinite-scroll-component";
import { t } from "i18next";
import { Link } from "react-router-dom";

export default function Videos({ data }) {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { token, deletePost_id, update } = useSelector((state) => state.auth);

  const { items, hasMore, loadMore } = getDataPostVideos(
    1,
    token,
    deletePost_id,
    update,
    "post/get_post_video"
  );

  function handleFiltration() {
    const pipe = data.filter((post) => post.post_data.post_video !== "");
    setFilteredPosts(pipe);
  }

  useEffect(() => {
    handleFiltration();
  }, [data]);
  const [showNotFound, setShowNotFound] = useState(false);

  useEffect(() => {
    // إعداد المؤقت لمدة 5 ثوانٍ
    const timer = setTimeout(() => {
      if (items.length === 0) {
        setShowNotFound(true);
      }
    }, 5000);

    // تنظيف المؤقت عند إلغاء المكون أو تغيير القائمة
    return () => clearTimeout(timer);
  }, [items]);
  return (
    <div className="max-w-4xl m-auto grid gap-4 ">
      <InfiniteScroll
        dataLength={items.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<div className="lds-default  m-auto d-flex"></div>}
      >
        <div className="videos__page">
          {items[0]?.id
            ? items.map((post) => <SinglePost key={post.id} data={post} />)
            : ""}
        </div>
      </InfiniteScroll>
      {showNotFound && (
        <div className="d-center h-full">
          <div className="d-flex d-center algin-items-center text-lg  gap-1 w-full  py-5 rounded">
            {t("Not Found")}
          </div>
        </div>
      )}
      {/* {filteredPosts &&
        filteredPosts.map((post) => (
          <SinglePost key={post.post_id} data={post} />
        ))} */}
    </div>
  );
}
