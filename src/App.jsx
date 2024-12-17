/* eslint-disable no-undef */
import { Routes, Route, useNavigate } from "react-router-dom";
import { WelcomePage } from "./pages";
import { useEffect, useState } from "react";
import Settings from "./components/Settings/Settings";
import Chat from "./pages/Chat/Chat";
import Portfolio from "./pages/Portfolio/Portfolio";
import toast, { Toaster } from "react-hot-toast";
import Pusher from "pusher-js";

import HomePage from "./pages/homePage/HomePage";
import "./App.scss";
import ReelsPage from "./pages/reels/reelsPage/ReelsPage";
import sound from "./assets/images/system-notification-199277.mp3";
import {
  ChooseColor,
  ChooseLanguage,
  LoginForm,
  RegisterForm,
} from "./pages/welcomePage/components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import CheckYourEmail from "./pages/welcomePage/components/CheckYourEmail";
import {
  loginStart,
  refrechPosts,
  refrechPostsContact,
  refrechPostsJob,
  refrechPostsJobAdvertisement,
} from "./rtk/slices/authSlice";
import ShowPost from "./pages/ShowPost/ShowPost";
import ShowPostTag from "./pages/ShowPostTag/ShowPostTag";
import ResetYourPassword from "./pages/welcomePage/components/ResetYourPassword";
import EnterEmail from "./pages/welcomePage/components/EnterEmail";
import CheckReset from "./pages/welcomePage/components/CheckReset";
import Researches from "./pages/Portfolio/components/researches";
import { getUser } from "./rtk/Api/Api";
import ShowComment from "./pages/ShowComment/ShowComment";
import Avatar from "./components/ChatComponents/ChatList/Avatar";
import { IoCloseSharp } from "react-icons/io5";

function App() {
  const URL__API = import.meta.env.VITE_REACT_APP_API_KEY;

  const navigate = useNavigate("");
  const [isDark, setIsDark] = useState(
    localStorage.getItem("darkMode") == "true" ? true : false
  );
  let colorTheme = localStorage.getItem("color-helnet");
  const [count, setCount] = useState(0);
  useEffect(() => {
    var element = document.querySelector("body");
    if (isDark) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
    element.classList.add(colorTheme);
  }, []);
  const page = window.location.pathname.split("/")[1];
  useEffect(() => {
    window.scrollTo(0, 0);
    if (user) {
      dispatch(refrechPosts({}));
      dispatch(refrechPostsJob({}));
      dispatch(refrechPostsContact({}));
      dispatch(refrechPostsJobAdvertisement({}));
    }
  }, [page]);
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // this is going to a stor we r just testing
  const [direction, setDirection] = useState("ltr");
  const [color, setColor] = useState("teal");
  localStorage.setItem("direction", direction);
  localStorage.setItem("color", color);
  // this is going to a stor we r just testing
  if (!localStorage.getItem("themeColor")) {
    localStorage.setItem("themeColor", "color-theme-cadetblue");
  }
  const [themeColor, setThemecolor] = useState(
    localStorage.getItem("themeColor") || "color-theme-cadetblue"
  );

  useEffect(() => {
    // استخدم window.location.search للوصول إلى سلسلة الاستعلام
    const searchParams = new URLSearchParams(window.location.search);
    const dataParam = searchParams.get("data");

    if (dataParam) {
      try {
        // قم بتحويل سلسلة الاستعلام إلى كائن JavaScript
        const data = JSON.parse(decodeURIComponent(dataParam));
        if (data?.user) {
          navigate("/");
          dispatch(loginStart(data));
          setUserData(data.user);
          getUser(data.access_token, dispatch);
        }
      } catch (error) {
        console.error("Error parsing data parameter:", error);
      }
    } else {
      getUser(token, dispatch);
    }
  }, []); // فارغة لضمان تشغيلها مرة واحدة عند تحميل الصفحة

  useEffect(() => {
    Pusher.logToConsole = false;
    const pusher = new Pusher("29003cf7a18fad5a715b", {
      cluster: "mt1",
      channelAuthorization: {
        endpoint: `${URL__API}/api/chatify/chat/auth`,
        headers: { Authorization: `Bearer ${token}` },
      },
      encrypted: true,
    });

    const channel = pusher.subscribe(`private-chatify${user?.id}`);

    channel.bind("messaging", function (data) {
      if (data?.message && page != "chat") {
        const audio = new Audio(sound); // Make sure the path is correct and file is in the public directory
        audio
          .play()
          .catch((error) => console.error("Audio playback failed:", error));
        toast.custom((t) => (
          <div
            style={{ cursor: "pointer" }}
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div
              className="flex-1 w-0 p-4"
              onClick={() => {
                toast.dismiss(t.id);
                navigate(`/chat/${data?.user?.user_name}`);
              }}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <Avatar
                    isOnline="active"
                    image={
                      data?.user &&
                      `${URL__API}/storage/${data?.user?.profile?.image}`
                    }
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {data?.user?.first_name + " " + data?.user?.last_name}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {data?.message?.message
                      ? data?.message?.message.length > 50
                        ? `${data?.message?.message.slice(0, 50)} ...`
                        : data?.message?.message
                      : "تم ارسال مرفق"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex align-items-center justify-content-center border-gray-200 px-3">
              <IoCloseSharp
                className="text-red-700 text-2xl"
                onClick={() => toast.dismiss(t.id)}
              />
            </div>
          </div>
        ));
      }
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, []);

  return (
    <div className={`app ${color}`}>
      <ToastContainer position="top-right" />
      <Toaster position="top-left" reverseOrder={false} />
      <Routes>
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/reals" element={<ReelsPage />} />
        <Route path="/reals/:id" element={<ReelsPage />} />
        <Route
          path="/settings"
          element={
            user ? (
              <Settings setCount={setCount} count={count} />
            ) : (
              <WelcomePage />
            )
          }
        />
        <Route path="/language" element={<ChooseLanguage />} />
        <Route
          path="/research/:id"
          element={<Researches setCount={setCount} count={count} />}
        />
        <Route path="/color" element={<ChooseColor />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/enter-email" element={<EnterEmail />} />
        <Route path="/check-code" element={<CheckReset />} />
        <Route path="/reset-pass" element={<ResetYourPassword />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/checkcode" element={<CheckYourEmail />} />
        <Route
          path="/singlePost/:id"
          element={<ShowPost setCount={setCount} count={count} />}
        />
        <Route
          path="/singlePostTag/:tag"
          element={<ShowPostTag setCount={setCount} count={count} />}
        />
        <Route
          path="/chooseColor"
          element={
            <ChooseColor
              setThemecolor={setThemecolor}
              themeColor={themeColor}
            />
          }
        />
        <Route
          path="/profile/following/:id"
          element={
            user ? (
              <Portfolio setCount={setCount} count={count} />
            ) : (
              <LoginForm />
            )
          }
        />
        <Route
          path="/profile/followers/:id"
          element={
            user ? (
              <Portfolio setCount={setCount} count={count} />
            ) : (
              <LoginForm />
            )
          }
        />
        <Route
          path="/singleComment/:post_id/:comment_id"
          element={<ShowComment setCount={setCount} count={count} />}
        />
        <Route
          path="/profile/skills/:id"
          element={<Portfolio setCount={setCount} count={count} />}
        />{" "}
        <Route
          path="/profile/research/:id"
          element={<Portfolio setCount={setCount} count={count} />}
        />
        <Route
          path="/profile/awards/:id"
          element={<Portfolio setCount={setCount} count={count} />}
        />
        <Route
          path="/profile/experinse/:id"
          element={<Portfolio setCount={setCount} count={count} />}
        />
        <Route
          path="/profile/posts/:id"
          element={<Portfolio setCount={setCount} count={count} />}
        />
        <Route
          path="/:name"
          element={<HomePage setCount={setCount} count={count} />}
        />
        <Route
          path="/:name/rate/:id"
          element={<HomePage setCount={setCount} count={count} />}
        />
        {/* <Route path="/userCV/rate" element={<HomePage  setCount={setCount} count={count} />} /> */}
        <Route
          path="/:name/:id"
          element={<HomePage setCount={setCount} count={count} />}
        />
        <Route
          path="/:name/:id/:idCourse"
          element={<HomePage setCount={setCount} count={count} />}
        />
        <Route
          path="/profile/:id"
          element={
            user ? (
              <Portfolio setCount={setCount} count={count} />
            ) : (
              <LoginForm />
            )
          }
        />
        <Route
          path="/"
          element={
            user ? (
              <HomePage setCount={setCount} count={count} />
            ) : (
              <WelcomePage />
            )
          }
        />
        <Route path="/chat/:id" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
