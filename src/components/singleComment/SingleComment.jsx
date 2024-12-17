import { useState } from "react";
import { line, person } from "../../assets/images/icons";
import CreateComment from "../createComment/CreateComment";

export default function SingleComment({ isReply, data }) {
  const [isReplying, setIsReplying] = useState(false);

  return (
    <div className={isReply ? "ps-16" : ""}>
      <div className="flex gap-3 w-100">
        {isReply && <img src={line} alt="" />}

        <img
          className="w-12 h-12 p-0 rounded-full"
          src={data.user.user_img ? data.user.user_img : person}
          alt=""
        />
        <div>
          <h4 className="pb-2 capitalize font-extrabold">
            {data.user.first_name + " " + data.user.last_name}
          </h4>

          <p>{data.text}</p>

          <div className="flex gap-2 py-2 text-[#999999]">
            <button className="capitalize">{"like"}</button>
            {"."}
            <button
              className="capitalize"
              onClick={() => {
                setIsReplying(!isReplying);
              }}
            >
              {"reply"}
            </button>
            {"."}
            <p>{data.time}</p>
          </div>
        </div>
      </div>
      {isReplying && <CreateComment />}
    </div>
  );
}
