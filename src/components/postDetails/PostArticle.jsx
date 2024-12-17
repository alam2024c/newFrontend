import { useState } from "react";
import { Button, Modal } from "../ui";
import { cloud } from "../../assets/icons";
import { recommendedUserImage } from "../../assets/images";
import { t } from "i18next";
import TextPost from "../PostHeader/TextPost";

export default function PostCode({ data, category }) {
  const mineDescription = data?.summary?.substring(0, 400);
  const [showMore, setShowMore] = useState(false);

  const fakeTitle = "IT'S GONNA RAIN TODAY";
  const fakeDate = "31/10/2023";
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const handelClick = () => {
    navigate(`/singlePost/${target.id}`);
  };
  return (
    <>
      <div className="my-2 p-md-4">
        <div className="flex gap-2 items-center">
          {data.title ? (
            <>
              <h3 className="font-black text-xl text-[#0099ab] d-flex align-items-center gap-3">
                {t("Inquiry Title")} :
              </h3>
              <TextPost text=              <TextPost text={data?.title} /> />
            </>
          ) : (
            <h3 className="font-black text-xl text-[#0099ab]">{fakeTitle}</h3>
          )}

          {data.date && (
            <p>
              {"("}
              <TextPost text={data?.date} />
              {")"}
            </p>
          )}
        </div>

        {data.code && (
          <div className="my-4 ">
            <p
              className="text-[#0099ab] font-black"
              style={{ color: "#0099AB" }}
            >
              {t("Code")} :
            </p>
            <TextPost text={data?.code} />
          </div>
        )}
        {data.type && (
          <div className="flex items-center gap-2 pt-4">
            <p className="text-[#0099ab] font-black">{"Code type" + " :"}</p>

            <div className="flex items-center gap-2">
              <TextPost text={data?.type} />
            </div>
          </div>
        )}
        {data.importance && (
          <div className="flex items-center gap-2 pt-4">
            <p className="text-[#0099ab] font-black">{"Importance" + " :"}</p>

            <div className="flex items-center gap-2">
              <TextPost text={data?.importance} />
            </div>
          </div>
        )}

        {data.deadline && (
          <div className="my-4 d-flex align-items-center gap-1">
            <span className="d-block fs-5" style={{ color: "#0099AB" }}>
              {t("Deadline")} :
            </span>
            <p className=" p-1 text-ellipsis bg-gradient-to-b from-black to-slate-200 text-transparent bg-clip-text">
              <TextPost text={data?.deadline} />
            </p>
          </div>
        )}

        {data.url ? (
          <a className="flex gap-2 my-3 pb-3" href={data?.url} role="button"
             // change by abdallah  and i added the rel becouse it avoid transport the cretecal data to the new tab 
             target="_blank" 
    rel="noopener noreferrer"
          >
            <img src={cloud} alt="" />
            <p className="capitalize underline text-[#0099ab]">
              {t("click here")}
            </p>
          </a>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
