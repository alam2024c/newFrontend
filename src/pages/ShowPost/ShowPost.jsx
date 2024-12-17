import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Aside,
  ComplementaryAside,
  Navbar,
  SinglePost,
} from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BsBack } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";

function ShowPost({ setCount, count }) {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const id = useParams().id;
  const [t, i18n] = useTranslation();
  const direction = localStorage.getItem("direction");
  const [item, setItem] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getSinglePost = async () => {
    try {
      const response = await fetch(`${URL}/api/post/get_post_id/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Accept-Language": i18n.language,
        },
      });
      const data = await response.json();
      console.log("dataaa",data)
      console.log("ffff",data.data.skills); // Check if the skills field is fetched
      setItem(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getSinglePost();
  }, []);
  
  const navigate = useNavigate();
  return (
    <div className="max-w-[1920px] m-auto">
      <Navbar setCount={setCount} count={count} />
      <section className="flex justify-between gap-2 lg:mx-4 p-1">
        <div className="hidden md:block">
          <Aside />
        </div>
        <main className="w-full">
          {item && (
            <div className="m-auto max-w-4xl w-full">
              <IoIosArrowBack className="font-xxl mb-4 cursor-pointer" onClick={() => navigate(-1)} />
              <SinglePost data={item} />
            </div>
          )}
        </main>
        <div className="hidden  b2-5xl">
          <ComplementaryAside />
        </div>
      </section>
    </div>
  );
}

export default ShowPost;
