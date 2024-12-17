import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { t } from "i18next";
import { useState } from "react";
import { getDataPostTag } from "../../components/posts/getDataPost";
import { useParams } from "react-router-dom";
import {
  Aside,
  ComplementaryAside,
  Navbar,
  SinglePost,
} from "../../components";

export default function ShowPostTag({ data,setCount,count }) {
  const { token } = useSelector((state) => state.auth);
  const uploads = useSelector((state) => state.progress.uploads);
  const tag = useParams().tag;
  const [filter, setFilter] = useState("");
  const { items, hasMore, loadMore } = getDataPostTag(
    1,
    token,

    "post/tag",
    tag
  );
  return (
    <div className="max-w-[1920px] m-auto">
      <Navbar setCount={setCount} count={count} />
      <section className="flex justify-between gap-2 lg:mx-4 p-1">
        <div className="hidden md:block">
          <Aside />
        </div>
        <main className="w-full">
          <div className="flex items-center flex-col gap-4"></div>
          <InfiniteScroll
            dataLength={items.length}
            next={loadMore}
            hasMore={hasMore}
            loader={<div className="lds-default  m-auto d-flex"></div>}
          >
            {/* <div className="flex items-center flex-col gap-4">
              <div
                className={`bg-blue-50 text-black rounded-2xl px-4 shadow w-100`}
              >
                <div className="w-00">sdf</div>
              </div>
            </div> */}
            <div className="flex items-center flex-col gap-4">
              {items[0]?.id
                ? items.map((post) => <SinglePost key={post.id} data={post} />)
                : ""}
            </div>
          </InfiniteScroll>
        </main>
        <div className="hidden  b2-5xl">
          <ComplementaryAside />
        </div>
      </section>
    </div>

    // <div className="flex items-center flex-col gap-4">
    //   <CreatePost />
    //   {data
    //     ? data.map((post) => <SinglePost key={post.post_id} data={post} />)
    //     : ""}
    // </div>
  );
}
