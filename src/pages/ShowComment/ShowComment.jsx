import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import SingleComment from "../../components/ui/singleComment/SingleComment";
import { IoStorefrontOutline } from "react-icons/io5";
import { RxVideo } from "react-icons/rx";
import { BsCameraReels } from "react-icons/bs";
import { LuUsers2 } from "react-icons/lu";
import { MdOutlineScreenSearchDesktop } from "react-icons/md";
import { Aside, ComplementaryAside, Navbar, SinglePost } from "../../components";
function ShowComment({ setCount, count }) {
  const { token, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const post_id = useParams().post_id;
  const comment_id = useParams().comment_id;
  const { t } = useTranslation();
  const direction = localStorage.getItem("direction");
  const [item, setItem] = useState();
  const [comment, setComment] = useState();

  const mainMenuLabels = [
    {
      name: t("Search"),
      icon: <MdOutlineScreenSearchDesktop />,
      link: "search",
    },
    {
      name: t("Store"),
      icon: <IoStorefrontOutline />,
      link: "store",
    },
    {
      name: t("video"),
      icon: <BsCameraReels />,
      link: "video",
    },
    {
      name: t("Reel"),
      icon: <RxVideo />,
      link: "reels-page",
    },
    {
      name: t("Friends"),
      icon: <LuUsers2 />,
      link: "friends",
    },
    // { name: t("Store"), icon: store, link: "store/buy" },
    // { name: t("Events"), icon: events, link: "event" },
    // { name: t("video"), icon: video, link: "video" },
    // { name: t("Reel"), icon: reel, link: "reel" },
    // { name: t("Friends"), icon: friend, link: "friends" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getSinglePost = async () => {
    try {
      const response = await fetch(`${URL}/api/get_Post_Comment_Ntification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({ post_id, comment_id }),
      });
      const data = await response.json();
      setItem(data.data.post);
      setComment(data.data.comment);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getSinglePost();
  }, []);
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
              <SinglePost data={item} />
              <div
                className="bg-white p-2 rounde"
                style={{ borderRadius: "20px" }}
              >
                <SingleComment user={user} data={comment} />
              </div>
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

export default ShowComment;
