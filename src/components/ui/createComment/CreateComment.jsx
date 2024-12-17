import { t } from "i18next";
import { image, close } from "../../../assets/images/icons";
// import icon from "../../../assets/images/icons/categories/";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { person } from "../../../assets/images/icons";
import Frame1 from "../../../assets/images/Frame1.png";
import Frame2 from "../../../assets/images/Frame2.png";
import Frame3 from "../../../assets/images/Frame3.png";
import { useEffect, useRef, useState } from "react";
import { refrechcomment } from "../../../rtk/slices/authSlice";
import Emoji from "../../../assets/images/Emoji.png";
import Picker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";

import { IoSend } from "react-icons/io5";
import Textarea from "../textarea/Textarea";

export default function CreateComment({
  isReplying,
  post,
  ref,
  // getAllComments = () => {},
  parent_comment_id,
}) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState("");
  const [imageComment, setImageComment] = useState("");
  const [audioComment, setAudioComment] = useState("");
  const [text, setText] = useState(post?.authors || "");
  const [return_metion, setreturn_metion] = useState();
  const [mention, setMention] = useState(post?.mention || []);
  const URL_API = import.meta.env.VITE_REACT_APP_API_KEY;
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const typeComment = async () => {
    setLoading(true);
    const data = {
      post_id: post.id,
      comment: comment,
      comment_image: imageComment,
      // comment_audio: audioComment,
    };
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    formData.append("return", return_metion);
    for (let i = 0; i < mention.length; i++) {
      formData.append("mention[]", mention[i].display);
    }
    try {
      const results = await axios.post(
        `${URL_API}/api/post/create_comment`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "multipart/form-data",
          },
        }
      );
      setComment("");
      setImageComment("");
      setreturn_metion("");
      setLoading(false);

      dispatch(refrechcomment(results.data.comment));
    } catch (error) {
      setLoading(false);
    }
  };

  const typeSubComment = async () => {
    const data = {
      post_id: post.id,
      parent_comment_id: parent_comment_id,
      comment: comment,
      comment_image: imageComment,
      comment_audio: audioComment,
    };
    formData.append("return", return_metion);
    for (let i = 0; i < mention.length; i++) {
      formData.append("mention[]", mention[i].display);
    }
    try {
      const results = await axios.post(
        `${URL_API}/api/post/show_sub_comment`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {}
  };

  const menuRef = useRef();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef?.current?.contains(e.target)) {
        // inside click

        return;
      } else {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [menuRef]);

  const addEmoji = (emojiObject) => {
    let sym = emojiObject.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    if (comment) {
      setComment(comment + emoji);

      setreturn_metion(return_metion + emoji);
    } else {
      setComment(emoji);

      setreturn_metion(emoji);
    }
    // setShowEmojiPicker(false);
  };

  return (
    <>
      <div className="gap-3 ">
        {imageComment && (
          <div className="w-100">
            <button
              onClick={() => setImageComment("")}
              style={{
                display: "flex",

                flexDirection: "column",
                position: "absolute",
              }}
            >
              <img src={close} alt="" />
            </button>
            <img
              className="p-1"
              src={URL.createObjectURL(imageComment)}
              style={{ width: "200px", height: "120px", marginBottom: "20px" }}
            />
          </div>
        )}
        <form
          // className="flex w-full  bottom-0 justify-center items-center gap-3 bg-slate-200 py-2 px-3 rounded-full"
          className="flex w-full comments"
        >
          {/* <img className="w-7" src={user.image ? user.image : person} alt="" /> */}
          <div
            className="w-full create-commemt border-2 "
            style={{ borderRadius: "20px", overflow: "hidden" }}
          >
            <Textarea
              height="h-[50dvh] sm:h-20"
              bg="bg-white"
              width="w-full sm:w-96"
              value={comment}
              setText={setComment}
              setreturn_metion={setreturn_metion}
              return_metion={return_metion}
              setMention={setMention}
              // border="true"
              placeholder={t("write a comment")}

              // onKeyDown={(e) => {
              //   if (e.key === "Enter" && !e.shiftKey) {
              //     e.preventDefault();
              //     typeComment();
              //   }
              // }}
            />
            {/* <textarea
              className={`resize-none  p-3  outline-none w-full -full outline-none bg-[#f0f2f5] placeholder-gray-400 `}
              height="h-14"
              placeholder={t("write a comment")}
              // className="w-full outline-none bg-slate-200 placeholder-gray-400"
              value={comment}
              style={{ marginBottom: "-30px", borderRadius: "20px" }}
              onChange={(e) => setComment(e.target.value)}
            /> */}
            {/* <div className="flex justify-between border-t-2 pt-5 pb-2 px-4 flex justify-between border-t-2 pt-5 pb-2 px-4 bg-[#f0f2f5]">
              <div className="flex justify-between" style={{ width: "100px" }}>
                <button>
                  <img src={Frame1} alt="" />{" "}
                </button>
                <button>
                  <img src={Frame2} alt="" />{" "}
                </button>
                <button>
                  <img src={Frame3} alt="" />{" "}
                </button>
              </div>
              <Button
                className="rounded"
                style={{
                  backgroundColor: "#0099AB",
                  color: "#fff",
                  padding: "20px",
                }}
                children={"Comment"}
              />
            </div> */}
            <div className="flex comment__bottom justify-between border-t-2  py-2 px-4 flex justify-between align-items-center border-t-2  px-4 bg-[#f0f2f5]">
              <div className="flex justify-between align-items-center  gap-0">
                {/* <button className="h-fit">
                  <img
                    src={Frame1}
                    alt=""
                    style={{ height: "20px", margin: "0 15px" }}
                    role="button"
                  />
                </button> */}
                <label className="h-fit" htmlFor="image">
                  <img
                    src={image}
                    alt=""
                    style={{ height: "30px", width: "50px" }}
                    role="button"
                  />
                  <input
                    accept=".png,.jpg"
                    type="file"
                    name=""
                    id="image"
                    hidden
                    onChange={(e) => setImageComment(e.target.files[0])}
                  />
                </label>
                <BsEmojiSmile
                  onClick={() => setShowEmojiPicker((val) => !val)}
                  style={{
                    cursor: "pointer",
                    // height: "20px",
                    fontSize: "25px",
                  }}
                />
                {/* <img src={Emoji} alt="Heart Icon" width={20} height={20} /> */}
              </div>

              <button
                disabled={loading}
                onClick={(e) => {
                  // e.preventDefault();
                  !isReplying ? typeComment() : typeSubComment();
                }}
              >
                <IoSend
                  className="rounded fs-1 sendComment"
                  style={{
                    fontSize: "30px",
                    // backgroundColor: "#0099AB",
                    fill: "#0099AB",
                    // padding: "10px",
                  }}
                />
              </button>
              {/* <button
                className="rounded"
                style={{
                  backgroundColor: "#0099AB",
                  color: "#fff",
                  padding: "10px",
                }}
                children={"Comment"}
              /> */}
              {/* show Emoji */}
            </div>
          </div>
          {/* <button className="h-fit">
          <img src={Voi} alt="" style={{ height: "20px" }} role="button" />
        </button> */}
          {showEmojiPicker && (
            <div ref={menuRef}>
              <Picker
                onEmojiClick={addEmoji}
                style={{
                  height: "398px",
                  width: "80%",
                  position: "absolute",
                  bottom: "44px",
                  left: "55px",
                }}
              />
            </div>
          )}

          {/* <button className="h-fit">
          <img src={icon} alt="" role="button" />
        </button> */}
        </form>
      </div>
    </>
  );
}
