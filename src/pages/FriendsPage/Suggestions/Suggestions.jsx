/* eslint-disable no-undef */
import AddFollow from "./AddFollow";
import Cartfriend from "../components/cartfriend";
import { useDispatch, useSelector } from "react-redux";
import { getDataSuggest } from "../../../components/posts/getDataPost";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

function Suggestions() {
  const { user, token, refrech } = useSelector((state) => state.auth);
  // const { items, hasMore, loadMore } = getDataPost(1, token, refrech, type);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, hasMore, loadMore } = getDataSuggest(
    1,
    token,
    "may-know",
    navigate,
    dispatch
  );
  // useEffect(() => {}, [name]);

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={loadMore}
      hasMore={hasMore}
      className="w-100"
      loader={<div className="lds-default m-auto d-flex"></div>}
    >
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
        {items.length > 0
          ? items.map((post, i) => (
              <Cartfriend
                type={"suggest"}
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

    // <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
    //   {[...Array(6)].map((_, index) => (
    //     <Cartfriend
    //       key={index}
    //       name={"Rod ghone"}
    //       job={"Digital / Design Consultant"}
    //       details={
    //         "Aliqua id fugiat nostrud irure ex duis ea quis id quisad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim."
    //       }
    //       // button={<AddFollow e={e} />}
    //       button="Follow"
    //     />
    //   ))}
    // </div>
  );
}

export default Suggestions;
