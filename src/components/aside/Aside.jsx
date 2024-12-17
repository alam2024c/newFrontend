import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import customer from "../../assets/images/customer.png";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logout, stateCurrent } from "../../rtk/slices/authSlice";
import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { MdContentPasteSearch, MdOutlineOndemandVideo } from "react-icons/md";
import { RxVideo } from "react-icons/rx";
import { FaUserFriends } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { FaFileSignature } from "react-icons/fa";
import { IoBagSharp } from "react-icons/io5";
import { RiArticleFill } from "react-icons/ri";
import { TbNews } from "react-icons/tb";
import { MdOutlineSummarize } from "react-icons/md";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { BiLogOutCircle, BiSolidVideos } from "react-icons/bi";
import { BsFillPersonLinesFill } from "react-icons/bs";

export default function Aside({ isOpen, close = () => {} }) {
  // the menu data is fixed don't miss with it
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [t] = useTranslation();

  const [activeLabel, setActiveLabel] = useState("home");
  const menuData = [
    {
      header: "Personal Information",
      items: [
        {
          label: "home",
          icon: <IoMdHome style={{ fontSize: "25px" }} />,
          path: "/home",
        },

        {
          label: "videos",
          icon: <MdOutlineOndemandVideo style={{ fontSize: "25px" }} />,
          path: "/videos",
        },
        {
          label: "reals",
          icon: <RxVideo style={{ fontSize: "25px" }} />,
          path: "/reals",
        },
      ],
    },
  ];
  const menuDataUser = [
    {
      header: "Personal Information",
      items: [
        {
          label: "home",
          icon: <IoMdHome style={{ fontSize: "25px" }} />,
          path: "/",
        },
        {
          label: "search",
          icon: <FaSearch style={{ fontSize: "25px" }} />,
          path: "/search",
        },
        {
          label: "videos",
          icon: <MdOutlineOndemandVideo style={{ fontSize: "25px" }} />,
          path: "/videos",
        },
        {
          label: "reals",
          icon: <RxVideo style={{ fontSize: "25px" }} />,
          path: "/reals",
        },
        {
          label: "friends",
          icon: <FaUserFriends style={{ fontSize: "25px" }} />,
          path: "/Following",
        },
        {
          label: "profile",
          icon: <CiUser style={{ fontSize: "25px" }} />,
          path: `/profile/${user?.user_name}`,
        },
        {
          label: "My Posts",
          icon: <BsFillPersonLinesFill style={{ fontSize: "25px" }} />,
          path: `/profile/posts/${user?.user_name}`,
        },
        {
          label: "courses",
          icon: <BiSolidVideos style={{ fontSize: "25px" }} />,
          path: "/courses-all",
        },
      ],
    },
    {
      header: "Articles, News, and Research Summary ",
      items: [
        {
          label: "articles",
          icon: <RiArticleFill style={{ fontSize: "25px" }} />,
          path: "/articles",
        },
        {
          label: "news",
          icon: <TbNews style={{ fontSize: "25px" }} />,
          path: "/news",
        },
        {
          label: "summaries",
          icon: <MdOutlineSummarize style={{ fontSize: "25px" }} />,
          path: "/summaries",
        },
      ],
    },
    {
      header: "Paid Services",
      items: [
        {
          label: "Request Service as individual",
          icon: <FaFileSignature style={{ fontSize: "25px" }} />,
          path: "/content-request",
        },
        {
          label: "Request Service as company",
          icon: <MdContentPasteSearch style={{ fontSize: "25px" }} />,
          path: "/job-advertisement",
        },
        {
          label: "Short Biography",
          icon: <IoBagSharp style={{ fontSize: "25px" }} />,
          path: "/job",
        },
      ],
    },
    {
      header: "Account",
      items: [
        {
          label: "Settings",
          icon: <IoSettingsOutline style={{ fontSize: "25px" }} />,
          path: "/settings",
        },
        // { label: t("chat"), icon: chat, path: "/chat" },
      ],
    },
  ];
  const { current__page } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(current__page, "+", activeLabel);
  }, [current__page]);

  return (
    <>
      {user ? (
        <aside
          role="navigation"
          // className="bg-white sticky top-24 overflow-y-scroll no-scrollbar aside-left max-h-[100dvh] lg:max-h-[85dvh]"
          // className="bg-white sticky top-24 overflow-y-scroll  aside-left max-h-[100dvh] lg:max-h-[85dvh]"
          className= "bg-white sticky top-24 overflow-y-scroll aside-left  lg:max-h-[85dvh]  h-full max-h-full w-full lg:w-[300px]"

        >
          {menuDataUser.map((menu) => (
            <dl
              key={menu.header}
              className="md:bg-blue-50 p-4 rounded-2xl sm:mb-2"
            >
              <dt className=" teal pt-4 pb-6 truncate">{t(menu.header)}</dt>
              {menu.items.map((item) => (
                <dd
                  className="pb-4"
                  key={item.label}
                  onClick={() => {
                    setActiveLabel(item.label);

                    navigate(`${item.path}`);
                    close();
                    localStorage.setItem("currentPage", item.label);
                    if (item.label != "reals") {
                      dispatch(stateCurrent(item.label));
                    }
                  }}
                >
                  <button
                    className={`flex justify-start items-center gap-3 capitalize truncate w-fit pe-8 font-black ${
                      current__page === item.label ? "active" : "text-black"
                    }`}
                  >
                    {item.icon}
                    {/* <img className="w-6 h-6" src={item.icon} alt={item.label} /> */}
                    {t(item.label)}{" "}
                  </button>
                </dd>
              ))}{" "}
              {menu.header == "Account" && (
                <dd
                  className="pb-4"
                  onClick={() => {
                    Swal.fire({
                      title: t("Do you want to log out?"),
                      // text: "You won't be able to revert this!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: t("Yes"),
                      cancelButtonText: t("No"),
                    }).then((result) => {
                      if (result.isConfirmed) {
                        dispatch(logout());
                        navigate("/");
                      }
                    });
                  }}
                >
                  <button
                    className={`flex justify-start items-center gap-3 capitalize truncate w-fit pe-8 font-black ${
                      activeLabel === "logout" ? "active" : "text-black"
                    }`}
                  >
                    <BiLogOutCircle
                      className="fs-1"
                      style={{ fontSize: "25px" }}
                    />

                    <p>{t("Logout")}</p>
                  </button>
                </dd>
              )}
            </dl>
          ))}
        </aside>
      ) : (
        <aside
          role="navigation"
          // className="bg-white sticky top-24 overflow-y-scroll no-scrollbar aside-left max-h-[100dvh] lg:max-h-[85dvh]"
          className="bg-white sticky top-24 overflow-y-scroll  aside-left max-h-[100dvh] lg:max-h-[85dvh]"

        >
          {menuData.map((menu) => (
            <dl
              key={menu.header}
              className="md:bg-blue-50 p-4 rounded-2xl sm:mb-2"
            >
              <dt className="text-gray-300 pt-4 pb-6 truncate">
                {t(menu.header)}
              </dt>
              {menu.items.map((item) => (
                <dd
                  className="pb-4"
                  key={item.label}
                  onClick={() => {
                    setActiveLabel(item.label);
                    navigate(`${item.path}`);
                    close();
                    localStorage.setItem("currentPage", item.label);
                    // dispatch(stateCurrent(item.label));
                    if (item.label != "reals") {
                      dispatch(stateCurrent(item.label));
                    }
                  }}
                >
                  {/* <button
                    className={`flex justify-start items-center gap-3 capitalize truncate w-fit pe-8 font-black ${
                      activeLabel === item.label ? "active" : "text-black"
                    }`}
                  >
                    {item.icon}
                    {/* <img className="w-6 h-6" src={item.icon} alt={item.label} /> */}
                    {/* {t(item.label)} */}
                    {/* {" "} */}
                  {/* </button> */}

                  <a href={item.path} className={`flex justify-start items-center gap-3 capitalize truncate w-fit pe-8 font-black ${current__page === item.label ? "active" : "text-black"}`}>
  {item.icon}
  {t(item.label)}
</a>


                </dd>
              ))}
            </dl>
          ))}
        </aside>
      )}
    </>
  );
}
