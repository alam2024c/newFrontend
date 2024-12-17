import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import avatar from "../../../assets/images/avatar.png";
import fileicon from "../../../assets/images/fileicon.png";
import Research from "../../../assets/images/Research.png";
import Line from "../../../assets/images/Line.png";
import xicon from "../../../assets/images/x.png";
import img3 from "../../../assets/images/img3.jpg";
import img2 from "../../../assets/images/img2.jpg";
import img1 from "../../../assets/images/img1.jpeg";

import download from "../../../assets/images/download.png";

import React from "react";

import { Aside, InteractionBar, Navbar } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { logout } from "../../../rtk/slices/authSlice";

function Researches({ setCount, count }) {
  const [t] = useTranslation();
  const [editingIndex, setEditingIndex] = useState(-1);
  const [skills, setSkills] = useState([
    { name: "Interface" },
    { name: "HTML" },
    { name: "CSS" },
  ]);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const id = useParams().id;
  const direction = localStorage.getItem("direction");
  const [item, setItem] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getSinglePost = async () => {
    try {
      const response = await fetch(`${URL}/api/post/showPosts/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setItem(data.post?.post_research);
      setData(data.posts);
    } catch (error) {
      if (data?.status == 401) {
        dispatch(logout());
      }
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getSinglePost();
  }, [id]);
  const [textWithLineBreak, setTextWithLineBreak] = useState("");

  useEffect(() => {
    if (item?.summary) {
      const formattedText = item.summary.split("\n").map((line, lineIndex) => {
        const words = line.split(" ");
        const formattedLine = words.map((word, wordIndex) => {
          const isWordTooLong = word.length > 10;
          const isHashTag = word.startsWith("#");
          const isMentioned = item.mention && item.mention.includes(word); // Check if data.mention exists and includes the word

          return isWordTooLong ? (
            <span
              key={`${lineIndex}-${wordIndex}`}
              className="cursor-pointer"
              onClick={() => {
                if (isHashTag) {
                  navigate(`/singlePostTag/${word.slice(1)}`);
                } else {
                  navigate(`/profile/${word}`);
                }
              }}
              style={{
                lineBreak: "anywhere",
                color: isHashTag ? "blue" : isMentioned ? "blue" : "inherit",
              }}
            >
              {isWordTooLong ? word + " " : word}
            </span>
          ) : (
            <span
              className="cursor-pointer"
              key={`${lineIndex}-${wordIndex}`}
              onClick={() => {
                if (isHashTag) {
                  navigate(`/singlePostTag/${word.slice(1)}`);
                } else {
                  navigate(`/profile/${word}`);
                }
              }}
              style={{
                color: isHashTag ? "blue" : isMentioned ? "blue" : "inherit",
              }}
            >
              {word}{" "}
            </span>
          );
        });
        return <div key={lineIndex}>{formattedLine}</div>;
      });
      setTextWithLineBreak(formattedText);
    }
  }, [item?.summery, item?.mention]);
  return (
    <div className="max-w-[1920px] m-auto">
      <Navbar setCount={setCount} count={count} />
      <section className="flex justify-between gap-2 lg:mx-4 p-1">
        <div className="hidden md:block">
          <Aside />
        </div>
        <main className="w-full">
          <div className="w-100 m-auto">
            <div
              className="formAddContent d-flex "
              style={{ backgroundColor: "#F9F9F9" }}
            >
              <div
                className="modalhead justify-content-center mb-5"
                style={{
                  borderRadius: "0px 0px 200px 200px",
                  margin: "auto",
                }}
              >
                <h1 style={{ color: "#fff" }}>
                  {" "}
                  <img src={Research} alt="" />
                </h1>
              </div>
              <p
                className="mb-5 address d-flex align-items-center"
                style={{
                  fontSize: "28px",
                  color: "#0099AB",
                  display: "flex",
                  maxWidth: " 50%",
                }}
              >
                <img
                  style={{ marginRight: "10px", marginLeft: "40px" }}
                  src={Line}
                  alt=""
                />
                {item?.title}
              </p>

              <div className="d-flex parts row w-100">
                <div className="col-md-8 part1">
                  <div
                    className="prt1 mx-3"
                    style={{ backgroundColor: "#fff" }}
                  >
                    <p style={{ color: "#001AFF", margin: "0 25px" }}>
                      {" "}
                      #Research
                    </p>
                    <p style={{ margin: "0 25px", marginBottom: "30px" }}>
                      {textWithLineBreak}
                    </p>
                  </div>

                  <div className="d-flex mb-5 justify-content-xxl-between prt2 flex-wrap px-5">
                    <div style={{ color: "#0099AB", fontSize: "21px" }}>
                      <p className="d-flex flex-wrap  gap-1">
                        References :
                        <a
                          href={item?.url}
                          target="_blank"
                          style={{
                            textDecoration: "underline",
                            marginLeft: "10px",
                            cursor: "pointer",
                          }}
                        >
                          {item?.url}
                        </a>{" "}
                      </p>

                      <p className="d-flex  gap-1 mt-4">
                        Authors:
                        <div
                          className="contentRequest d-flex"
                          style={{ color: "#999999", marginLeft: "10px" }}
                        >
                          {item?.user_authors?.map((author) => (
                            <div
                              className={
                                author?.img
                                  ? "d-flex align-items-center gap-2 cursor-pointer "
                                  : "d-flex align-items-center gap-2  "
                              }
                              onClick={() => {
                                if (author?.img) {
                                  navigate(`/profile/${author?.user_name}`);
                                }
                              }}
                            >
                              {author?.img && (
                                <img
                                  src={author?.img}
                                  alt=""
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                  }}
                                />
                              )}

                              {author?.user_name}
                            </div>
                          ))}
                        </div>
                      </p>
                    </div>

                    {/* <button
                      className="modelbtn d-flex justify-content-xxl-between"
                      style={{
                        backgroundColor: "#0099AB",
                        padding: "8px 24px",
                        height: "40px",
                        marginTop: "50px",
                      }}
                    >
                      <img src={download} alt="" style={{ marginTop: "5px" }} />
                      {t("Download")}
                    </button> */}
                  </div>
                  {item && <InteractionBar data={item} />}
                </div>

                <div className="col-md-4 part2">
                  <p
                    className="prt1 mb-3"
                    style={{ color: "#0099AB", marginLeft: "80px" }}
                  >
                    Related Research:
                  </p>
                  {data?.map((e) => (
                    <img
                      onClick={() => navigate(`/research/${e.id}`)}
                      src={`${URL}/storage/${e?.post_research?.file}`}
                      alt=""
                      style={{
                        borderRadius: "40px",
                        width: "100%",
                        maxHeight: "250px",
                        margin: "auto",
                        marginBottom: "25px",
                      }}
                    />
                  ))}
                  {/* <img
                    src={img2}
                    alt=""
                    style={{
                      borderRadius: "40px",
                      width: "100%",
                      maxHeight: "250px",
                      margin: "auto",
                      marginBottom: "25px",
                    }}
                  />
                  <img
                    src={img3}
                    alt=""
                    style={{
                      borderRadius: "40px",
                      width: "100%",
                      maxHeight: "250px",
                      margin: "auto",
                      marginBottom: "25px",
                    }}
                  /> */}
                </div>
              </div>
              <div></div>
            </div>
            <style>
              {`


                 @media (max-width: 1444px) {
                  .Close{
                     display: none;
                    } 
                 }
                 @media (max-width: 838px) {
                    .parts{
                        margin: auto!important;
                        flex-wrap: wrap!important;
                      } 
                      .part2{
                        max-width: 100%!important;
                        margin:auto!important;
                          }
                     .address{
                      max-width: 100%!important;

                     }      
                   }

                 @media (max-width: 764px) {
                 .modalhead{
                       display: none;
                     }
                 .address{
                    max-width: 100%!important;
                     }   
                 .formAddContent{
                    max-width: 100%!important;
                     }
                  .part1{
                   max-width: 100%!important;
                      }
                  .part2{
                    max-width: 100%!important;
                    width: 100%!important;
                    margin:auto!important;
                      } 
                 .prt1{
                    margin-left: 0px!important;
                      }
                 .prt2{
                    margin-left: 20px!important;
                      }
                 }

                
                 @media (max-width: 569px) {
                    .address{
                     font-size: 22px!important;    
                    }
                 }
                 @media (max-width: 402px) {
                  .prt2{
                    margin-left: 0px!important;    
                  }
                  .modelbtn{
                    width: 140px!important; 

                  }
               }
                 

                 
                  `}
            </style>
          </div>
        </main>
      </section>
    </div>
  );
}

export default Researches;
