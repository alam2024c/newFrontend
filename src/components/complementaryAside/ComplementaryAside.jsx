import { Link } from "react-router-dom";
import { person, verify } from "../../assets/images/icons";
import { recommendedUsers, friends } from "/public/fakeData";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Actions from "../../pages/FriendsPage/components/Actions";
import { logout } from "../../rtk/slices/authSlice";
import { useTranslation } from "react-i18next";
import Online from "./Online";
import logotekpart from "../../assets/images/logo.png";
export default function ComplementaryAside() {
  const chosenRecommendedUsers = recommendedUsers.slice(0, 2);
  const [data, setData] = useState([]);
  const [dataPerson, setDataPerson] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [t] = useTranslation();

  /////////////////////////developing only////////////////////////////
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const { token } = useSelector((state) => state.auth);
  const getDataSuggest = async () => {
    try {
      const results = await axios.get(
        `${URL}/api/may-know`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // get all the comments
      setData(results.data.data);
    } catch (error) {
      if (data?.status == 401) {
        dispatch(logout());
      }
    }
  };
  const getPerson = async () => {
    try {
      const results = await axios.get(
        `${URL}/api/getWeeklyPersonality`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // get all the comments
      setDataPerson(results.data.data);
    } catch (error) {
      if (data?.status == 401) {
        dispatch(logout());
      }
    }
  };
  useEffect(() => {
    getDataSuggest();
    getPerson();
  }, []);
  const currentDate = new Date();

  return (
    <div
      // className="sticky top-24 overflow-y-scroll no-scrollbar max-h-screen xl:w-fit asideRight max-h-[100dvh] lg:max-h-[85dvh]"
      className="sticky top-24 overflow-y-scroll  max-h-screen xl:w-fit asideRight max-h-[100dvh] lg:max-h-[85dvh] mx-auto "

      style={{ zIndex: "1" }}
    >
      <div className="gap-1 w-fit " style={{ zIndex: "1" }}>
        {/* chosen user of the week */}
        {dataPerson?.user_name && (
          <div className="mb-4">
            <div className="flex justify-between p-5 bg-yellow-600 rounded-t-2xl text-white border-b border-white pb-3 font-black">
              <p>
                {user?.id == dataPerson?.id
                  ? t("Congratulations, you have become our Person of the Week")
                  : t("Week Person")}
              </p>

              <img src={verify} alt="" />
            </div>

            <dl className="flex w-100   bg-blue-50 justify-between items-center p-2 py-4">
              <Link
                to={`/profile/${dataPerson?.user_name}`}
                key={chosenRecommendedUsers[0].user_id}
                className="flex gap-3 text-black"
              >
                <img
                  className="w-12 h-12 rounded-full"
                  src={
                    dataPerson?.profile?.image
                      ? `${URL}/storage/${dataPerson?.profile?.image}`
                      : person
                  }
                  alt=""
                />

                <div>
                  <p className="capitalize font-black">
                    {dataPerson?.first_name?.length > 12
                      ? `${dataPerson?.first_name?.slice(0, 12)} ...`
                      : `${dataPerson?.first_name} ${" "} ${
                          dataPerson?.last_name
                        } `}
                    {/* {dataPerson?.first_name + " " + dataPerson?.last_name} */}
                  </p>
                  <p className="text-gray-400 text-xs">
                    @
                    {dataPerson?.user_name?.length > 8
                      ? `${dataPerson?.user_name?.slice(0, 8)} ...`
                      : dataPerson?.user_name}
                  </p>
                </div>
              </Link>
              {dataPerson?.follow && (
                <>
                  {user?.id != dataPerson?.id && (
                    <Actions
                      user={dataPerson}
                      margin={true}
                      action={
                        dataPerson?.follow == "friend"
                          ? false
                          : dataPerson?.follow == "request_sended"
                          ? "request_sended"
                          : true
                      }
                    />
                  )}
                </>
              )}

              {/* <button
              className="w-fit h-fit px-4 py-1 bg-white border border-current font-bold rounded-full capitalize"
              children={t("Follow")}
            /> */}
            </dl>
          </div>
        )}
        {/* recommended Users*/}
        {/* {user && ( */}
        <dl className="bg-blue-50 py-4 px-2 rounded-2xl">
          <h4 className="px-2 text-black border-b border-white pb-3 font-black">
            {t("Suggestions")}
          </h4>
          {data?.slice(0, 4).map((user, key) => (
            <div
              key={key}
              className="flex w-80 justify-between items-center ps-2 border-b border-white py-4"
            >
              <Link
                to={`/profile/${user?.user_name}`}
                className="flex gap-1 text-black"
              >
                <img
                  className="w-12 h-12 rounded-full"
                  src={
                    user?.profile?.image
                      ? `${URL}/storage/${user?.profile?.image}`
                      : person
                  }
                  alt=""
                />
                <div>
                  <p className="capitalize font-black">
                    {user.first_name.length > 12
                      ? `${user.first_name.slice(0, 12)} ...`
                      : `${user?.first_name} ${" "} ${user?.last_name} `}
                    {/* {user.first_name + " " + user.last_name} */}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {/* {"@" + user.user_name} */}@
                    {user.user_name.length > 8
                      ? `${user.user_name.slice(0, 8)} ...`
                      : user.user_name}
                  </p>
                </div>
              </Link>
              {/* <button
                className="w-fit h-fit px-4 py-1 bg-white border border-current font-bold rounded-full capitalize"
                children={t("Follow")}
              /> */}
              <Actions user={user} margin={true} />
            </div>
          ))}
          <Link to={"/all-friends"}>
            {" "}
            <div
              className="w-full align-items-center text-center flex justify-center pt-3 px-2 border-t border-white h-fit font-black capitalize"
              onClick={() => {}}
            >
              {t("Show more")}
            </div>
          </Link>
        </dl>
        {/* )} */}

        {/* active friends */}
        <Online />

        {/* Terms and conditions */}
        {/*  Removed by Rajaa as a request from Ashraf */}
        {/* <a
          href="http://tek-part.com"
          className="w-[130px] m-auto"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logotekpart} alt="" />
        </a>
        <p className="text-gray-400 text-sm pb-2 mt-[-15px]">
          {t("All rights reserved to")}
          <a
            className="mx-2 text-blue-700"
            href="http://tek-part.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tek Part
          </a>
          {t("Programming and Development Solutions")} @{" "}
          {currentDate.getFullYear()}
        </p> */}
      </div>
    </div>
  );
}
