import { useEffect, useState } from "react";
import "./Contects.scss";
import { useTranslation } from "react-i18next";
// import Modal from "@mui/material/Modal";
import Picture from "../../assets/images/Picture.png";
import send from "../../assets/images/send.png";
import filter from "../../assets/images/filter.png";
import { Dropdown, Modal } from "../ui";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { dots } from "../../assets/icons";
import {
  close1,
  edit,
  flags,
  person,
  pin,
  storage,
  trash,
} from "../../assets/images/icons";
import ModalAddoffer from "../../pages/Jobs/ContentRequests/AddContents/ModalAddoffer";
import { getDataPostOffer } from "../posts/getDataPost";
import InfiniteScroll from "react-infinite-scroll-component";
import { HiLockClosed } from "react-icons/hi";
import { toast } from "react-toastify";
import ActionsAccept from "../../pages/FriendsPage/components/ActionsAccept";
import ModalAddApplay from "../../pages/Jobs/JobAdvertisement/AddJobAdvertisement/ModalAddApplay";
import FilesAnother from "../Files/FilesAnother";
import TextPost from "../PostHeader/TextPost";
import Loading from "../Loading/Loading";

function Advertisement() {
  const [loading, setLoading] = useState("");

  const [menuPost, setMenuPost] = useState(false);
  const navigate = useNavigate();
  const [t] = useTranslation();
  const [myfile, setmyFile] = useState("");
  const [data, setData] = useState();
  const [refreach, setrefreach] = useState(false);
  const { token, deletePost_id, updateOffer, user } = useSelector(
    (state) => state.auth
  );
  const post_id = useParams().id;
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;

  const dropdownData = [{ name: "report post", image: flags, value: "report" }];
  const dropdownDataMe = [
    { name: "delete post", image: trash, value: "delete" },
    { name: "edit post", image: edit, value: "edit" },
  ];

  const [modalOpened, setModalOpened] = useState(false);

  const getData = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`${URL}/api/apply-show/${post_id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);

      setData(res.data.Job);
    } catch (err) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [refreach]);
  const { items, hasMore, loadMore, setPage } = getDataPostOffer(
    1,
    token,
    deletePost_id,
    updateOffer,
    `get_apply/${post_id}`
  );

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="sectionCenter max-w-4xl m-auto">
          <div className="contents">
            <div className="contentRequest" style={{ margin: "30px 5px" }}>
              <div className="add">
                <div className="w-100 add border-0 d-flex justify-content-between align-items-center">
                  <p
                    onClick={() => {
                      navigate(`/userCV/${data.user_name}`);
                    }}
                    style={{
                      color: "#25324B",
                      fontSize: "20px",
                      fontWeight: "600",
                    }}
                  >
                    <img
                      className="w-full h-full"
                      src={
                        data?.user_img
                          ? `${URL}/storage/${data?.user_img}`
                          : Picture
                      }
                      alt=""
                    />
                    {/* <img src={Picture} alt="" /> */}
                    {data?.first_name} {data?.last_name}
                    {/* {t("Brand Designer")} */}
                  </p>
                  <Dropdown
                    buttonData={<img className="w-5" src={dots} alt="" />}
                    data={
                      user?.id == data?.user_id ? dropdownDataMe : dropdownData
                    }
                    type="job"
                    post={data}
                  />
                </div>
                {/* <p
                style={{
                  color: "#25324B",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                <img src={Picture} alt="" />
                {t("Brand Designer")}
              </p> */}
                <p
                  className="sm:px-14 pb-3"
                  style={{
                    color: "#7C8493",
                    marginTop: "-14",
                  }}
                >
                  <TextPost text={data?.title} />{" "}
                </p>
                {user?.id != data?.user_id && (
                  <div className="singlePost py-4 flex-wrap  d-flex align-items-end justify-content-end w-100">
                    <button
                      className="btn4 ms-auto me-0"
                      style={{ marginRight: "auto" }}
                      onClick={() => setModalOpened(true)}
                    >
                      {t("Add Your Offer")}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="projectCard contentRequest">
              <div className="add" style={{ padding: "15px 40px" }}>
                <h4 className="fw-700 text-grey-900 font-xs mt-1">
                  {t("Project Card")}
                </h4>
                <ul>
                  <li className=" font-sm fw-500 mt-1 lh-3 text-grey-600">
                    {t("Company Name")}
                    <span> {data?.company} </span>
                  </li>

                  <li className=" font-sm fw-500 mt-1 lh-3 text-grey-600">
                    {t("Offers Count")}
                    <span> {data?.ApplyCount}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="projectCard contentRequest">
              <div className="add" style={{ padding: "15px 40px" }}>
                <h4 className="fw-700 text-grey-900 font-xs mt-1">
                  {t("projectDescription")}
                </h4>
                <p className="font-sm fw-500 mt-1 lh-3 text-grey-700">
                  <TextPost text={data?.details} />
                </p>
              </div>
            </div>

            <div className="projectCard contentRequest">
              <div className="add" style={{ padding: "15px 40px" }}>
                <h4 className="fw-700 text-grey-900 font-xs mt-1">
                 {/* Change by Abdallah */}
                  {t("Required Skills")}
                </h4>
                <div className="singlePost m-auto ">
                  <div
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    {data?.skills.length > 0 &&
                      data?.skills?.map((s, index) => (
                        <button
                          className={
                            index + 1 > 2
                              ? `btn${((index + 1) % 3) + 1}  `
                              : `btn${index + 1} `
                          }
                          key={index}
                        >
                          {t(s?.label)}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            {data?.file && (
              <div className="projectCard contentRequest">
                <div className="add" style={{ padding: "15px 40px" }}>
                  <h4 className="fw-700 text-grey-900 font-xs mt-1">
                    {t("Accessories")}
                  </h4>
                  <a
                    target="_blank"
                    href={`${URL}/storage/${data?.file}`}
                    style={{ marginLeft: "auto" }}
                    className="font-sm fw-500 mt-1 lh-3 text-grey-700 ms-auto"
                  >
                    {`${URL}/storage/${data?.file}`}
                  </a>
                </div>
              </div>
            )}

            <div className="projectCard contentRequest">
              <div className="add" style={{ padding: "15px 40px" }}>
                <div
                  className="d-flex top justify-content-between mb-3 flex-wrap"
                  style={{
                    borderBottom: "1px solid rgba(153, 153, 153, 0.5019607843)",
                  }}
                >
                  <h3 className="fw-700 text-grey-900 font-xs mt-1">
                    {t("offersSubmitted")}
                  </h3>
                  <button
                    className="bg-primary-gradiant text-white position-relative"
                    onClick={() => setMenuPost(!menuPost)}
                  >
                    <img className="filtericon" src={filter} alt="" />
                    {/* {
                    <div
                      className={
                        // menuPost
                        //   ?
                        "dropdown-menu-post card "
                        // : "dropdown-menu-post card active"
                      }
                    >
                      <ul className="d-flex flex-column rounded-xxxl">
                        <li className="fw-700 text-grey-900 font-sms d-flex gap-3 p-2 cursor-pointer ">
                          {t("themostrecent")}
                        </li>
                        <li className="fw-700 text-grey-900 font-sms d-flex gap-3 p-2 cursor-pointer ">
                          {t("oldest")}
                        </li>
                        <li className="fw-700 text-grey-900 font-sms d-flex gap-3 p-2 cursor-pointer ">
                          {t("faster")}
                        </li>
                        <li className="fw-700 text-grey-900 font-sms d-flex gap-3 p-2 cursor-pointer ">
                          {t("cheapest")}
                        </li>
                      </ul>
                    </div>
                  } */}
                  </button>
                </div>
                <InfiniteScroll
                  dataLength={items.length}
                  next={loadMore}
                  hasMore={hasMore}
                  loader={<div className="lds-default  m-auto d-flex"></div>}
                >
                  <div className="flex items-center flex-col gap-4">
                    {items[0]?.id
                      ? items.map((post, index) => (
                          <div
                            className="info mb-3 w-100"
                            key={index}
                            style={{
                              borderBottom:
                                "1px solid rgba(153, 153, 153, 0.5019607843)",
                            }}
                          >
                            <div className="w-100 d-flex justify-content-between">
                              <div className="card-body p-0 d-flex">
                                <figure className="avatar ms-3">
                                  <img
                                    className="shadow-sm rounded-circle w45"
                                    src={
                                      post?.user_img
                                        ? `${URL}/storage/${post?.user_img}`
                                        : Picture
                                    }
                                    alt=""
                                  />
                                </figure>
                                <h5 className="fw-700 text-grey-900 font-sm mt-1 mt">
                                  {post?.first_name} {post?.last_name}
                                  <span className="d-block font-sm fw-500 mt-1 lh-3  text-grey-500">
                                    {/* {t("ago")} 2 {t("hour")} */}
                                  </span>
                                </h5>
                              </div>

                              <Dropdown
                                buttonData={
                                  <img className="w-5" src={dots} alt="" />
                                }
                                data={
                                  user?.id == post?.user_id
                                    ? dropdownDataMe
                                    : dropdownData
                                }
                                type="apply"
                                post={post}
                              />
                            </div>
                            <div className="card-body p-0 ms-lg-5 mt-4">
                              <p className="fw-500 text-grey-500 lh-26 font-sm w-100 mb-2">
                                {post?.details}
                              </p>
                            </div>
                            <ul className="py-3">
                              <li className=" font-sm fw-500 mt-1 lh-3 text-grey-600">
                                {t("Email")}
                                <span> {post?.email}</span>
                              </li>
                              <li className=" font-sm fw-500 mt-1 lh-3 text-grey-600">
                                {t("Phone")}
                                <span> {post?.phone}</span>
                              </li>
                            </ul>
                            <FilesAnother data={[post?.file]} target={post} />

                            <div
                              style={{ justifyContent: "end" }}
                              className="singlePost py-4 flex-wrap  d-flex   justify-content-end w-100"
                            >
                              {user?.id == data?.user_id && (
                                <>
                                  <ActionsAccept user={post} />
                                  <button
                                    onClick={() =>
                                      navigate(`/chat/${data?.user_name}`)
                                    }
                                    className=" text-center   d-flex d-felx align-items-center gap-2"
                                    style={{
                                      backgroundColor: "rgb(0, 153, 171)",
                                      borderRadius: "50px",
                                      border: "1px solid",
                                      fontSize: "17px",
                                      borderRadius: "50px",
                                      padding: "6px 14px",
                                      lineHeight: "normal",
                                      fontSize: "17px",
                                      color: "#fff",
                                    }}
                                  >
                                    {t("send message")}{" "}
                                    <img src={send} alt="" />
                                  </button>
                                </>
                              )}
                              {user?.id == post?.user_id &&
                              post?.status == "1" ? (
                                <>
                                  <button className="btn-3 bg-green-500 text-white">
                                    {t("Accepted")}
                                  </button>
                                  <button
                                    onClick={() =>
                                      navigate(`/chat/${data?.user_name}`)
                                    }
                                    className=" text-center   d-flex d-felx align-items-center gap-2"
                                    style={{
                                      backgroundColor: "rgb(0, 153, 171)",
                                      borderRadius: "50px",
                                      border: "1px solid",
                                      fontSize: "17px",
                                      borderRadius: "50px",
                                      padding: "6px 14px",
                                      lineHeight: "normal",
                                      fontSize: "17px",
                                      color: "#fff",
                                      // marginRight: "15px",
                                    }}
                                  >
                                    {t("send message")}{" "}
                                    <img src={send} alt="" />
                                  </button>
                                </>
                              ) : (
                                ""
                              )}
                              {/* 
                              <button
                                onClick={() =>
                                  navigate(`/chat/${data?.user_name}`)
                                }
                                className=" text-center   d-flex d-felx align-items-center gap-2"
                                style={{
                                  backgroundColor: "rgb(0, 153, 171)",
                                  borderRadius: "50px",
                                  border: "1px solid",
                                  fontSize: "17px",
                                  borderRadius: "50px",
                                  padding: "6px 14px",
                                  lineHeight: "normal",
                                  fontSize: "17px",
                                  color: "#fff",
                                }}
                              >
                                {t("send message")} <img src={send} alt="" />
                              </button> */}
                            </div>
                          </div>
                        ))
                      : ""}
                  </div>
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </div>
      )}

      <ModalAddApplay
        refreach={refreach}
        setrefreach={setrefreach}
        setModalOpened={setModalOpened}
        modalOpened={modalOpened}
        type={"addOffer"}
        content_id={data?.id}
        // post={post}
      />
      {/* <Modal
        isOpen={modalOpened}
        closeModal={() => setModalOpened(false)}
        title={t("Add Your Offer")}
      >
        <form className="formAddContent ">
          {groups.map((group, index) => (
            <div className="group" key={index}>
              <label className="font-bold text-gray-900 text-xs mt-1">
                {group.label}
              </label>
              {group.type === "textarea" ? (
                <textarea type="text" placeholder={group.placeholder} />
              ) : (
                <input type={group.type} placeholder={group.placeholder} />
              )}
            </div>
          ))}

          <div className="d-block mb-3" style={{ textAlign: "end" }}>
            <button className="modelbtn">{t("Add")}</button>
          </div>
        </form>
      </Modal> */}
    </>
  );
}

export default Advertisement;
