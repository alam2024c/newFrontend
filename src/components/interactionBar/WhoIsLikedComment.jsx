import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
// import e from "../../profileComponents/e/e";
import Rectangle from "../../assets/images/Rectangle.png";
import { useSelector } from "react-redux";
import { t } from "i18next";
import axios from "axios";

import InfiniteScroll from "react-infinite-scroll-component";
import { close } from "../../assets/images/icons";
import { getDataWhoLikeComment } from "../posts/getDataPost";
import BoxFirendsProfile from "../boxFirendsProfile/BoxFirendsProfile";
function WhoIsLikedComment({ setIsOpen, isOpen, data }) {
  const { token, deletePost_id, update } = useSelector((state) => state.auth);
  const { items, hasMore, loadMore } = getDataWhoLikeComment(
    1,
    token,
    `post/getwhoLikedComment/${data.id}`
  );
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const direction = localStorage.getItem("direction");

  return (
    <Transition
      direction={direction}
      appear
      show={isOpen}
      as={Fragment}
      style={{ zIndex: "1000000" }}
    >
      <Dialog
        as="div"
        className="position-relative z-10 "
        style={{ direction: "rtl" }}
        onClose={() => setIsOpen(false)}
        direction={direction}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto  pt-28	">
          <div
            className="flex items-center justify-center p-4 text-end pt-28	"
            //   style={{ minHeight: "72rem", paddingLeft: "6rem!important" }}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="w-full transform  rounded-2xl bg-white p-6 text-end align-middle shadow-xl transition-all "
                style={{
                  maxWidth: "44rem",
                  maxHeight: "27rem",
                  overflow: "auto",
                  direction: direction,
                }}
              >
                <Dialog.Title
                  as="h3"
                  style={{ fontWeight: "700" }}
                  className="text-lg leading-6 text-gray-900"
                >
                  <h1
                    className="mb-0 pb-0"
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#2F2F31",
                    }}
                  >
                    {" "}
                    {items?.length} {t("likes")}
                  </h1>

                  <img className="pic2" src={Rectangle} alt="" />

                  <a className="" onClick={() => setIsOpen(false)}>
                    <img
                      className="profile-pic3"
                      style={{ top: "19px" }}
                      src={close}
                      alt=""
                    />{" "}
                  </a>
                </Dialog.Title>

                <InfiniteScroll
                  dataLength={items.length}
                  next={loadMore}
                  hasMore={hasMore}
                  className="mx-2"
                  loader={<div className="lds-default m-auto d-flex"></div>}
                >
                  {items.length > 0 && items[0]?.id
                    ? items.map((post, index) => (
                        <BoxFirendsProfile key={index} post={post} />
                      ))
                    : ""}
                </InfiniteScroll>
                {hasMore && (
                  <>
                    {items?.length > 10 && (
                      <span
                        className="text-center m-auto w-100 d-block"
                        onClick={loadMore}
                      >
                        {t("Show More")}
                      </span>
                    )}
                  </>
                )}
                {/* <div className="mt-2">
                  {likesArray.map((index) => (
                    <e key={index} />
                  ))}
                </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default WhoIsLikedComment;
