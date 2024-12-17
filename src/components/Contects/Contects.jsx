import { useEffect, useState } from "react";
import "./Contects.scss";
import { useTranslation } from "react-i18next";
// import Modal from "@mui/material/Modal";
import Picture from "../../assets/images/Picture.png";
import { AiOutlineCloudDownload } from "react-icons/ai";
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
import ModalContent from "../../pages/Jobs/ContentRequests/AddContents/ModalContent";
import ModalAddoffer from "../../pages/Jobs/ContentRequests/AddContents/ModalAddoffer";
import { getDataPostOffer } from "../posts/getDataPost";
import InfiniteScroll from "react-infinite-scroll-component";
import { HiLockClosed } from "react-icons/hi";
import { toast } from "react-toastify";
import ActionsAccept from "../../pages/FriendsPage/components/ActionsAccept";
import TextPost from "../PostHeader/TextPost";
import FilesAnother from "../Files/FilesAnother";
import send from "../../assets/images/send.png";
import Loading from "../Loading/Loading";

function Contects() {
  const navigate = useNavigate();

  const [menuPost, setMenuPost] = useState(false);
  const [t] = useTranslation();
  const [loading, setLoading] = useState("");
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
      const res = await axios.get(`${URL}/api/offer-show/${post_id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);

      // console.log(res, "resresresresresresres");
      setData(res.data.content);
      checkIfImage(res.data.content.file);
    } catch (err) {
      setLoading(false);

      console.log(err);
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
    `get_offer/${post_id}`
  );

  console.log(items);
  const [isImage, setIsImage] = useState(false);

  const checkIfImage = (file) => {
    const extension = file.split(".").pop().toLowerCase();
    const imageExtensions = ["jpg", "jpeg", "png", "gif"]; // Add more extensions if needed
    const isImage = imageExtensions.includes(extension);
    setIsImage(isImage);
  };
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

                <p
                  className="sm:px-14 pb-4"
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
                    {t("Budget")}
                    <span> {data?.dudget} </span>
                  </li>
                  <li className=" font-sm fw-500 mt-1 lh-3 text-grey-600">
                    {t("Implementation Period")}
                    <span>
                      {" "}
                      {data?.time} {t("day")}
                    </span>
                  </li>
                  <li className=" font-sm fw-500 mt-1 lh-3 text-grey-600">
                    {t("numberOfOffers")}
                    <span> {data?.offerCount}</span>
                  </li>
                  <li className=" font-sm fw-500 mt-1 lh-3 text-grey-600">
                    {t("averageOffers")}
                    <span> {data?.offer_avarage}</span>
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
                  {/* {data?.details} */}
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
              <>
                {isImage ? (
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
                        <img src={`${URL}/storage/${data?.file}`} alt="" />
                      </a>
                    </div>
                  </div>
                ) : (
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
                        <FilesAnother data={[data?.file]} target={data} />
                      </a>
                    </div>
                  </div>
                )}
                {/* <div className="projectCard contentRequest">
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
              </div> */}
              </>
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
                                type="offer"
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
                                {t("Implementation Period")}
                                <span>
                                  {" "}
                                  {post?.term} {t("Day")}
                                </span>
                              </li>
                              <li className=" font-sm fw-500 mt-1 lh-3 text-grey-600">
                                {t("Offers")}
                                <span> {post?.value} $</span>
                              </li>
                            </ul>
                            {}
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
                                    className=" text-center  bg-red-600   d-flex d-felx align-items-center gap-2"
                                    style={{
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
                              )}
                              {user?.id == post?.user_id &&
                              post?.status == "1" ? (
                                <>
                                  <button className="btn-3 bg-green-500 text-white">
                                    {t("Accepted")}
                                  </button>
                                  {/* <button
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
                                  </button> */}
                                </>
                              ) : (
                                ""
                              )}
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

      <ModalAddoffer
        refreach={refreach}
        setrefreach={setrefreach}
        setModalOpened={setModalOpened}
        modalOpened={modalOpened}
        type={"addOffer"}
        content_id={data?.id}
        user_id={data?.user_id}
        // post={post}
      />
    </>
  );
}

export default Contects;
