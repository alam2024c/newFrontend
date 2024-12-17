import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { t } from "i18next";
import { deletPost, deleteComment } from "../../../rtk/Api/Api";
import { useDispatch, useSelector } from "react-redux";

export default function DropdownComment({
  buttonData = "open",
  subComment,
  post,
  labels = [],
  post_id,
  top,
  position,
  setEdit,
  handleButtons = (label) => {
    console.log(label);
  },
}) {
  const [isArabic, setIsArabic] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsArabic(localStorage.getItem("i18nextLng") === "ar");
    // console.log(localStorage.getItem("i18nextLng") === "ar");
    // console.log(isArabic);
  }, [localStorage.getItem("i18nextLng")]);
  const handleButtonClick = (label) => {
    if (label == "Delete") {
      deleteComment(token, post.id, dispatch, subComment);
    } else if (label == "Edit") {
      setEdit(true);
      // setIsOpen(true);
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className=" ">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button as="button">{buttonData}</Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`absolute z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none ${
              isArabic ? "left-0" : "right-0"
            } ${top} ${position}`}
          >
            <div className="px-1 py-1 ">
              {labels &&
                labels.map((label, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          handleButtonClick(label);
                          handleButtons(label);
                        }}
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center text-center rounded-md px-3 py-2`}
                      >
                        {t(label)}
                      </button>
                    )}
                  </Menu.Item>
                ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
