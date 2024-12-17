/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";

function AddFollow({ e }) {
  // const { token } = useSelector((state) => state.auth);
  const [t] = useTranslation();
  const [follow, setFollow] = useState(false);

  const createFollow = async (e) => {
    setFollow(!follow)
    //   try {
    //     const res = await axios.post(
    //       "https://3lm.wearher-from-mimi.com/api/follow-create",
    //       { following_id: e.id },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     );
    //     console.log(res);

    //     // dispatch(refrechPosts());
    //     //  toast.success(t("The post has been deleted"));
    //   } catch (err) {
    //     console.log(err);
    //     //  toast.error(t("A network error occurred"));
    //   }
  };

  return (
    <>
      {" "}
      {follow ? (
        <div className="card-body pt-0 pe-4 ps-4 pb-4 gap-2 ">
          <button onClick={() => {
            setFollow(false);
            createFollow(e);
          }}
            className={" font-xss bg-primary-gradiant ms-2 text-white text-center font-xssss align-items-center "}
            style={{ padding: " 7px 80px", borderRadius: "0.5rem", backgroundColor: "#0099AB" }} >
            <span> {t("Exist")}</span>
          </button>
        </div>
      ) : (

        <div className="card-body pt-0 pe-4 ps-4 pb-4 gap-2 ">
          <button onClick={() => {
            setFollow(true);
            createFollow(e);
          }}
            className={" font-xss bg-primary-gradiant ms-2 text-white text-center font-xssss align-items-center "}
            style={{ padding: " 7px 80px", borderRadius: "0.5rem", backgroundColor: "#0099AB" }} >
            <span> {t("Add")}</span>
          </button>
        </div>
      )}
    </>
  );
}

export default AddFollow;
