import BoxReelComponents from "../../components/boxReelComponents/boxReelComponents";
import FiltersBar from "../../components/ui/filtersBar/FiltersBar";
import { useSelector } from "react-redux";
import { getDataPostReels } from "../../components/posts/getDataPost";
import InfiniteScroll from "react-infinite-scroll-component";

const Reels = () => {
  const { token, deletePost_id, update } = useSelector((state) => state.auth);

  const { items, hasMore, loadMore } = getDataPostReels(
    1,
    token,
    deletePost_id,
    update,
    "post/get_post_reel"
  );

  // مراجعة سطر 225

  return (
    <>
      <div className="grid gap-3">
        <div className="bg-white rounded-xl">
          {/* <FiltersBar /> */}
          <InfiniteScroll
            dataLength={items.length}
            next={loadMore}
            hasMore={hasMore}
            loader={<div className="lds-default  m-auto d-flex"></div>}
          >
            <div className="reelsComponents gap-4">
              {/* sidebar */}
              {items.map((video, index) => (
                <BoxReelComponents video={video} index={index} />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

export default Reels;
