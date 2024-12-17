import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function AllPosts({ data }) {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const navigate = useNavigate();
  const params = useParams();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Months are zero-based
    const year = date.getUTCFullYear();
    return `(${day}/${month}/${year})`;
  };

  const originalDate = data?.created_at;
  const convertedDate = formatDate(originalDate);
  const handelClick = () => {
    navigate(`/singlePost/${target.id}`);
  };
  return (
    <div className="box-allposts">
      <div>
        {" "}
        <div className={`gallery with1`}>
          <div className={`image imageNo1`} onClick={handelClick}>
            <img
              src={`${URL}/storage/${data?.file}`}
              alt=""
              style={{ maxHeight: "60vh" }}
            />
          </div>
        </div>
      </div>
      <div className="mx-2">
        <div className="title">
          <h3 className="">{data?.news_title}</h3>
          <span>{convertedDate}</span>
        </div>
      </div>
    </div>
  );
}

export default AllPosts;
