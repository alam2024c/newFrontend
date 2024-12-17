import { useDispatch, useSelector } from "react-redux";
import Cartfriend from "../components/cartfriend";
import {
  getDataFollowers,
  getDataFriends,
} from "../../../components/posts/getDataPost";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import { t } from "i18next";

function Followers() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, hasMore, loadMore } = getDataFollowers(
    1,
    token,
    "current-follower",
    "",
    navigate,
    dispatch
  );

  return (
    <>
      <InfiniteScroll
        dataLength={items.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<Loading />}
      >
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
          {items.length > 0
            ? items.map((post, i) => (
                <Cartfriend
                  key={i}
                  user={post}
                  name={"Rod ghone"}
                  job={"Digital / Design Consultant"}
                  details={
                    "Aliqua id fugiat nostrud irure ex duis ea quis id quisad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim."
                  }
                  button="View Profile"
                />
              ))
            : ""}
        </div>
      </InfiniteScroll>
      {items.length == 0 && (
        <div className="d-center h-full">
          <div className="d-flex d-center algin-items-center text-lg  gap-1 w-full  py-5 rounded">
            {t("Not Found")}
          </div>
        </div>
      )}
    </>
  );
}

export default Followers;
