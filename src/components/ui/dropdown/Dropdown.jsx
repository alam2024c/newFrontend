import { Menu, Transition } from "@headlessui/react";
import { t } from "i18next";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  deletMessage,
  deletPost,
  deletPostApply,
  deletPostCv,
  deletPostJob,
  deletPostJobAdvertisement,
  deletPostOffer,
  deletcourse,
  videoCourse,
} from "../../../rtk/Api/Api";
import { useDispatch, useSelector } from "react-redux";
import ModalMain from "../../createPost/ModalMain";
import Modal from "../modal/Modal";
import CreateReport from "../../PostHeader/CreateReport";
import Form from "../form/Form";
import { filters } from "/public/filters";

import {
  forms,
  formsWithCategory,
  categoriesSorted,
} from "../../createPost/formsData";
import ModalAddoffer from "../../../pages/Jobs/ContentRequests/AddContents/ModalAddoffer";
import ModalContent from "../../../pages/Jobs/ContentRequests copy/AddContents/ModalContent";
import ModalAddJobAdvertisement from "../../../pages/Jobs/JobAdvertisement/AddJobAdvertisement/ModalAddJobAdvertisement";
import ModalAddApplay from "../../../pages/Jobs/JobAdvertisement/AddJobAdvertisement/ModalAddApplay";
import ModalPlayList from "../../../pages/Courses/MyCourses/AddPlayList/ModalPlayList";
import ModalAddOneCourse from "../../../pages/Courses/OneCourse/AddOneCourse/ModalAddOneCourse";
export default function Dropdown({
  buttonData = "open",
  labels,
  data,
  post,
  type,

  normalMenu = true,
  width = "w-56",
  Children = <></>,
  handleButtons = (label) => {},
}) {
  const [isArabic, setIsArabic] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [report, setReport] = useState(false);
  const [hasCategory, setHasCategory] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [modalOpenedPlaylist, setModalOpenedPlaylist] = useState(false);
  const [apply, setApply] = useState(false);
  const [modalOpenedAdvertisement, setModalOpenedAdvertisement] =
    useState(false);
  const [modalOpenedOffer, setModalOpenedOffer] = useState(false);
  const [videoCourseEdit, setvideoCourseEdit] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [change, setchange] = useState(false);
  const [selectedField, setSelectedField] = useState(
    post?.classification_id == 1
      ? "text"
      : post?.classification_id == 2
      ? "video"
      : post?.classification_id == 4
      ? "record"
      : post?.classification_id == 5
      ? "file"
      : post?.classification_id == 3 && "image"
  );

  const menuRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current.contains(e.target)) {
        // inside click
        return;
      } else {
        setIsOpenMenu(false);
      }

      // outside click
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [menuRef]);

  useEffect(() => {
    setIsArabic(localStorage.getItem("i18nextLng") === "ar");
  }, [localStorage.getItem("i18nextLng")]);
  const [isOpenservicw, setIsOpenservicw] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    post?.classification_id == 9
      ? "Add News"
      : post?.classification_id == 12
      ? "Document Check up"
      : post?.classification_id == 22
      ? "Add Science Experiment"
      : post?.classification_id == 6
      ? "Scientific Research Summary"
      : post?.classification_id == 16
      ? "Request for Volunteers or Trainees"
      : post?.classification_id == 27
      ? "Scholarship Announcement"
      : post?.classification_id == 28
      ? "Project Funding"
      : post?.classification_id == 13
      ? "Announcing Course"
      : post?.classification_id == 6
      ? "Scientific Research Summary"
      : post?.classification_id == 26
      ? "Request for a Scientific Service"
      : post?.classification_id == 29
      ? "Donations"
      : post?.classification_id == 15
      ? "Code Inquiry"
      : post?.classification_id == 30
      ? "Add Essay"
      : post?.classification_id == 11
      ? "Add Congratulations"
      : post?.classification_id == 20
      ? "Summary of Book, Novel or Film"
      : post?.classification_id == 10
      ? "Add short story"
      : post?.classification_id == 14
      ? "Offer Commercial Product"
      : post?.classification_id == 24
      ? "Announcing for an Event"
      : post?.classification_id == 31
      ? "Official Announcement"
      : post?.classification_id == 32
      ? "Request for Quotation"
      : post?.classification_id == 17
      ? "Researcher Story"
      : post?.classification_id == 33
      ? "Questionnaire"
      : post?.classification_id == 21 && "Suggest Collaboration"
  );
  const handleButtonClick = (label) => {
    setchange(!change);

    if (label == "delete") {
      if (type == "job") {
        deletPostJob(token, post.id, dispatch, post);
      } else if (type == "offer") {
        deletPostOffer(token, post.id, dispatch, post);
      } else if (type == "apply") {
        deletPostApply(token, post.id, dispatch, post);
      } else if (type == "advertisement") {
        deletPostJobAdvertisement(token, post.id, dispatch, post);
      } else if (type == "cv") {
        deletPostCv(token, post.id, dispatch, post);
      } else if (type == "my-courses") {
        deletcourse(token, post.id, dispatch, post);
      } else if (type == "message") {
        deletMessage(token, post.id, dispatch, post);
      } else if (type == "videoCourse") {
        videoCourse(token, post.id, dispatch, post);
      } else {
        deletPost(token, post.id, dispatch, post);
      }
    } else if (label == "edit") {
      if (
        post?.classification_id == 1 ||
        post?.classification_id == 2 ||
        post?.classification_id == 3 ||
        post?.classification_id == 4 ||
        post?.classification_id == 23 ||
        post?.classification_id == 25 ||
        post?.classification_id == 5 ||
        post?.classification_id == 8
      ) {
        setIsOpen(true);
        setIsFormOpen(true);
      } else if (type == "job") {
        setModalOpened(true);
      } else if (type == "my-courses") {
        setModalOpenedPlaylist(true);
      } else if (type == "advertisement") {
        setModalOpenedAdvertisement(true);
      } else if (type == "apply") {
        setModalOpenedAdvertisement(true);
      } else if (type == "offer") {
        setModalOpenedOffer(true);
      } else if (type == "videoCourse") {
        setvideoCourseEdit(true);
      } else {
        setIsOpenservicw(true);
      }
    } else if (label == "report") {
      setReport(true);
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formType, setformType] = useState("service");
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className=" " ref={menuRef}>
      <Menu as="div" className="relative inline-block text-left ">
        <div>
          <Menu.Button
            onClick={() => setIsOpenMenu(!isOpenMenu)}
            as="button"
            className={"not__bg"}
          >
            {buttonData}
          </Menu.Button>
        </div>
        <Transition
          show={isOpenMenu}
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`absolute z-10 mt-2  origin-top-left right-0 divide-y divide-gray-100 rounded-3xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none ${width} dropdwon`}
          >
            {normalMenu ? (
              <div className="px-1 py-1 ">
                {labels ? (
                  labels.map((label, index) => (
                    <Menu.Item key={index}>
                      {({ active }) => (
                        <button
                          onClick={() => {
                            handleButtonClick(label);
                            setIsOpenMenu(false);
                            handleButtons(label);
                          }}
                          className={`${
                            active
                              ? "bg-violet-500 text-white"
                              : "text-gray-900"
                          } group   not__bg flex w-full items-center capitalize text-center rounded-md px-3 py-2`}
                        >
                          {t(label)}
                        </button>
                      )}
                    </Menu.Item>
                  ))
                ) : (
                  <>
                    {data &&
                      data.map((button, index) => (
                        <Menu.Item key={index}>
                          {({ active }) => (
                            <>
                              <button
                                onClick={() => {
                                  handleButtonClick(button.value);
                                  setIsOpenMenu(false);
                                  handleButtons(button.value);
                                }}
                                className={`${
                                  active ? " text-red-800" : "text-gray-900"
                                } group flex not__bg w-full justify-between items-center capitalize text-center rounded-md px-3 py-2`}
                              >
                                <p>{t(button.name)}</p>
                                <div className="flex w-8 h-8 bg-gray-200 rounded-xl justify-center items-center ">
                                  <img
                                    className="w-4"
                                    src={button.image}
                                    alt=""
                                  />
                                </div>
                              </button>
                              {data?.length != index + 1 && <hr />}
                            </>
                          )}
                        </Menu.Item>
                      ))}
                  </>
                )}
              </div>
            ) : (
              <>{Children}</>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
      <ModalMain
        change={change}
        setchange={setchange}
        isMainOpen={isOpen}
        closeModal={closeModal}
        setIsMainOpen={setIsOpen}
        setIsFormOpen={setIsFormOpen}
        isFormOpen={isFormOpen}
        post={post}
        setSelectedField={setSelectedField}
        selectedField={selectedField}
      />
      <Modal
        isOpen={report}
        // isOpen={modalOpened}
        // closeModal={closeModal}
        title={t("Report")}
        closeModal={() => {
          setReport(false);
        }}
        width="max-w-xl w-full"
      >
        <CreateReport post_id={post?.id} setReport={setReport} />
      </Modal>
      {modalOpened && (
        <ModalContent
          setModalOpened={setModalOpened}
          modalOpened={modalOpened}
          post={post}
        />
      )}
      {modalOpenedPlaylist && (
        <ModalPlayList
          setModalOpened={setModalOpenedPlaylist}
          modalOpened={modalOpenedPlaylist}
          post={post}
        />
      )}
      {apply && (
        <ModalAddApplay
          setModalOpened={setApply}
          modalOpened={apply}
          post={post}
        />
      )}
      {modalOpenedAdvertisement && (
        <ModalAddJobAdvertisement
          setModalOpened={setModalOpenedAdvertisement}
          modalOpened={modalOpenedAdvertisement}
          post={post}
        />
      )}
      {modalOpenedOffer && (
        <ModalAddoffer
          setModalOpened={setModalOpenedOffer}
          modalOpened={modalOpenedOffer}
          post={post}
        />
      )}
      {videoCourseEdit && (
        <ModalAddOneCourse
          setModalOpened={setvideoCourseEdit}
          modalOpened={videoCourseEdit}
          post={post}
        />
      )}

      {isOpenservicw && (
        <Form
          categoriesSorted={categoriesSorted}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          filters={filters}
          setHasCategory={setHasCategory}
          isFormsOpen={isOpenservicw}
          setIsFormsOpen={setIsOpenservicw}
          forms={forms}
          post={post}
        />
      )}
    </div>
  );
}
