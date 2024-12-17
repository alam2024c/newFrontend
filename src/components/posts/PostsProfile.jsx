import axios from "axios";
import SinglePost from "../singlePost/SinglePost";
import { useDispatch, useSelector } from "react-redux";

import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import { getDataPostProfile } from "./getDataPost";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
// import getDataPost from "./getDataPost";

export default function PostsProfile({ profile }) {
  const { token, user, deletePost_id, update } = useSelector(
    (state) => state.auth
  );
  const params = useParams().id;
  const [t, i18n] = useTranslation("");

  const { items, hasMore, loadMore } = getDataPostProfile(
    1,
    token,
    `post/get_post_user/${params}`,
    params,
    user,
    deletePost_id,
    update,
    i18n.language
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<div className="lds-default  m-auto d-flex"></div>}
    >
      <div className="flex items-center flex-col gap-3 w-full">
        {items
          ? items.map((post) => <SinglePost key={post.id} data={post} />)
          : ""}
      </div>
    </InfiniteScroll>
  );
}
