import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import CoverUser from "./components/CoverUser";
import { AiOutlineEdit } from "react-icons/ai";
import "./Portfolio.scss";

import { FaPause, FaExpand, FaVolumeMute } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import VideoPlayer from "../../components/ui/videoPlayer/VideoPlayer";
import { Aside, ComplementaryAside, Navbar } from "../../components";
import ProfileHeader from "../../components/profileHeader/ProfileHeader";
import { useDispatch, useSelector } from "react-redux";
import UploadVideo from "./components/UploadVideo/UploadVideo";
import UploadSkilles from "./components/UploadSkilles/UploadSkilles";
import { getDataProfile } from "../../components/posts/getDataPost";
import UploadCv from "./components/UploadCv/UploadCv";
import UploadRecearch from "./components/UploadRecearch/UploadRecearch";
import UploadAwards from "./components/UploadAwards/UploadAwards";
import UploadExperinse from "./components/UploadExperinse/UploadExperinse";
import PostsProfile from "../../components/posts/PostsProfile";
import Loading from "../../components/Loading/Loading";
import FollowingProfile from "./FollowingProfile";
import FollowersProfile from "./FollowersProfile";
import UploadCity from "./components/UploadCity/UploadCity";
import { getUser } from "../../rtk/Api/Api";
import { IoLockClosed } from "react-icons/io5";
import AcceptFollow from "../FriendsPage/FriendRequest/AcceptFollow";

function Portfolio({ setCount, count }) {
  const navigate = useNavigate();

  const GeneralInformationComponent = () => {
    // Render the general information component
    return (
      <div style={{ color: "#303030" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ornare
        odio. Curabitur vitae velit ultricies, lobortis tellus quis, tempus
        ante.
      </div>
    );
  };

  const PostsComponent = () => {
    // Render the posts component
    return (
      <div style={{ color: "#303030" }}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ornare
          odio. Curabitur vitae velit ultricies, lobortis tellus quis, tempus
          ante.
        </p>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/Posts");
          }}
        >
          <span> &rarr; </span>
          {t("Show all")} {t("Posts")}
        </div>
      </div>
    );
  };

  const SkillsComponent = () => {
    // Render the skills component
    return (
      <div style={{ color: "#303030" }}>
        <ul>
          {[...Array(3)].map((_, index) => (
            <>
              <li className="my-3" key={index}>
                Lorem ipsum dolor sit
              </li>
              <hr />
            </>
          ))}
        </ul>
        <div
          className="Skills"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/skillesInfo");
            localStorage.setItem("currentPage", "Skilles");
          }}
        >
          <span> &rarr; </span>
          {t("Show all")} {t("Skills")}
        </div>
      </div>
    );
  };

  const ResearchesComponent = () => {
    // Render the researches component
    return (
      <div>
        ResearchesComponent
        <div
          className="Skills"
          style={{ cursor: "pointer" }}
          onClick={() => {
            localStorage.setItem("currentPage", "Researches");
            localStorage.setItem("back", true);
            navigate("/researches");
          }}
        >
          <span> &rarr; </span>
          {t("Show all")} {t("Researches")}
        </div>
      </div>
    );
  };

  const AwardsComponent = () => {
    // Render the awards component
    return <div>AwardsComponent</div>;
  };

  const MoreInformationComponent = () => {
    // Render the more information component
    return <div>MoreInformationComponent</div>;
  };

  const sections = {
    resume: "C.V",
    introductoryVideo: "Introductory Video",
    generalInformation: "General information",
    posts: "Posts",
    skills: "Skills",
    researches: "Researches",
    awards: "Awards",
    moreInformation: "More Information",
  };

  const renderSections = (sections) => {
    return Object.entries(sections).map(([sectionKey, sectionLabel]) => {
      // const isEditable = params == user?.user_id;

      return (
        <div className={sectionKey} key={sectionKey}>
          <p className="d-flex justify-content-xxl-between">
            {t(sectionLabel)}
            <AiOutlineEdit
              style={{ color: "#7CC9D1" }}
              className="font-xxl"
              onClick={() => {
                localStorage.setItem("currentPage", "CV");
                navigate("/userCV");
              }}
            />{" "}
          </p>
          {renderSectionComponent(sectionLabel)}
        </div>
      );
    });
  };

  const renderSectionComponent = (sectionLabel) => {
    switch (sectionLabel) {
      case "General information":
        return <GeneralInformationComponent />;
      case "Posts":
        return <PostsComponent />;
      case "Skills":
        return <SkillsComponent />;
      case "Researches":
        return <ResearchesComponent />;
      case "Awards":
        return <AwardsComponent />;
      case "More Information":
        return <MoreInformationComponent />;
      default:
        return null;
    }
  };
  const { token, user } = useSelector((state) => state.auth);
  const page = window.location.pathname.split("/")[2];
  const params = useParams().id;
  const [loading, setLoading] = useState(false);
  const [t, i18n] = useTranslation();
  const [change, setChange] = useState(true);
  const { items, loadingProfile } = getDataProfile(
    token,

    `profile/${params}`,
    change,
    params,
    i18n.language
  );

  const [mainMenu, setMainMenu] = useState();

  const direction = localStorage.getItem("direction");
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  let [isOpen2, setIsOpen2] = useState(false);

  function closeModal2() {
    setIsOpen2(false);
  }

  function openModal2() {
    if (user.user_name == params) {
      setIsOpen2(true);
    }
  }
  const dispatch = useDispatch();

  useEffect(() => {
    getUser(token, dispatch);
  }, []);
  return (
    <>
      <div className="max-w-[1920px] m-auto">
        <Navbar setCount={setCount} count={count} />
        <section className="flex justify-between gap-2 lg:mx-4 p-1">
          <div className="hidden xl:block">
            <Aside />
          </div>
          <main className="w-full">
            <div className="portfolio max-w-4xl m-auto">
              {items?.waiting_request == 1 && (
                <div className="flex items-center justify-content-center flex-col gap-3 pt-3 w-full">
                  <>
                    <AcceptFollow
                      e={items}
                      setChange={setChange}
                      change={change}
                    />
                  </>
                </div>
              )}
              <div className="">
                <ProfileHeader
                  setLoading_2={setLoading}
                  openModal={openModal}
                  setMainMenu={setMainMenu}
                />
                {/* <CoverUser /> */}
              </div>
              {loadingProfile ? (
                <Loading />
              ) : (
                <>
                  {items?.user_id == user?.id ? (
                    <>
                      {" "}
                      <>
                        {page == "posts" ? (
                          <PostsProfile></PostsProfile>
                        ) : page == "following" ? (
                          <FollowingProfile />
                        ) : page == "followers" ? (
                          <FollowersProfile />
                        ) : page == "skills" ? (
                          <UploadSkilles
                            setChange={setChange}
                            change={change}
                            items={items}
                            all={true}
                          ></UploadSkilles>
                        ) : page == "research" ? (
                          <UploadRecearch
                            setChange={setChange}
                            change={change}
                            items={items}
                            all={true}
                          ></UploadRecearch>
                        ) : page == "awards" ? (
                          <UploadAwards
                            setChange={setChange}
                            change={change}
                            items={items}
                            all={true}
                          ></UploadAwards>
                        ) : page == "experinse" ? (
                          <UploadExperinse
                            setChange={setChange}
                            change={change}
                            items={items}
                            all={true}
                          ></UploadExperinse>
                        ) : (
                          <>
                            {" "}
                            <UploadCity
                              setChange={setChange}
                              change={change}
                              items={items}
                            />
                            <UploadCv
                              setChange={setChange}
                              change={change}
                              items={items}
                            />{" "}
                            <UploadVideo
                              setChange={setChange}
                              change={change}
                              items={items}
                            />
                            <UploadSkilles
                              setChange={setChange}
                              change={change}
                              items={items}
                            />
                            <UploadAwards
                              setChange={setChange}
                              change={change}
                              items={items}
                            />
                            <UploadExperinse
                              setChange={setChange}
                              change={change}
                              items={items}
                            />
                            <UploadRecearch
                              setChange={setChange}
                              change={change}
                              items={items}
                            />
                            <div className="resume">
                              <p className="d-flex justify-content-xxl-between my-4">
                                {t("Posts")}
                              </p>
                              <div style={{ color: "#303030" }}>
                                <div
                                  className="Skills"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    navigate(
                                      `/profile/posts/${items?.user_name}`
                                    );
                                    localStorage.setItem(
                                      "currentPage",
                                      "Profile"
                                    );
                                  }}
                                >
                                  <span> &rarr; </span>
                                  {t("Show all")} {t("Posts")}
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    </>
                  ) : (
                    <>
                      {" "}
                      {items?.follow != "friend" &&
                      items?.privacy == "private" ? (
                        <div className="flex items-center flex-col gap-3 w-full">
                          <IoLockClosed
                            className="fs-1"
                            style={{ fontSize: "40px" }}
                          />

                          {t("Account Is Closed")}
                        </div>
                      ) : (
                        <>
                          {page == "posts" ? (
                            <PostsProfile></PostsProfile>
                          ) : page == "following" ? (
                            <FollowingProfile />
                          ) : page == "followers" ? (
                            <FollowersProfile />
                          ) : page == "skills" ? (
                            <UploadSkilles
                              setChange={setChange}
                              change={change}
                              items={items}
                              all={true}
                            ></UploadSkilles>
                          ) : page == "research" ? (
                            <UploadRecearch
                              setChange={setChange}
                              change={change}
                              items={items}
                              all={true}
                            ></UploadRecearch>
                          ) : page == "awards" ? (
                            <UploadAwards
                              setChange={setChange}
                              change={change}
                              items={items}
                              all={true}
                            ></UploadAwards>
                          ) : page == "experinse" ? (
                            <UploadExperinse
                              setChange={setChange}
                              change={change}
                              items={items}
                              all={true}
                            ></UploadExperinse>
                          ) : (
                            <>
                              {" "}
                              <UploadCity
                                setChange={setChange}
                                change={change}
                                items={items}
                              />
                              <UploadCv
                                setChange={setChange}
                                change={change}
                                items={items}
                              />{" "}
                              <UploadVideo
                                setChange={setChange}
                                change={change}
                                items={items}
                              />
                              <UploadSkilles
                                setChange={setChange}
                                change={change}
                                items={items}
                              />
                              <UploadAwards
                                setChange={setChange}
                                change={change}
                                items={items}
                              />
                              <UploadExperinse
                                setChange={setChange}
                                change={change}
                                items={items}
                              />
                              <UploadRecearch
                                setChange={setChange}
                                change={change}
                                items={items}
                              />
                              <div className="resume">
                                <p className="d-flex justify-content-xxl-between my-4">
                                  {t("Posts")}
                                </p>
                                <div style={{ color: "#303030" }}>
                                  <div
                                    className="Skills"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      navigate(
                                        `/profile/posts/${items?.user_name}`
                                      );
                                      localStorage.setItem(
                                        "currentPage",
                                        "Profile"
                                      );
                                    }}
                                  >
                                    <span> &rarr; </span>
                                    {t("Show all")} {t("Posts")}
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
              {/* <>{renderSections(sections)}</> */}
            </div>
          </main>

          <div className="hidden 2xl:block">
            <ComplementaryAside />
          </div>
        </section>
      </div>

      <style>
        {`
                
                 @media (max-width: 900px) {
                  .portfolio .introductoryVideo > div {
                  padding-inline: 0rem!important;
                  margin-block: 0rem!important;
                    } 
                 }
                 @media (max-width: 500px) {
                  .profile-pic {
                    top: -66px !important;
                    max-width: 100px !important;
                    } 
                    .profile-pic2 {
                      left: 102px;
                      max-width: 27px;

                    }
                 }

                  `}
      </style>
    </>
  );
}

export default Portfolio;
