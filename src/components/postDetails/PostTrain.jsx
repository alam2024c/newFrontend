import { useState } from "react";
import { cloud } from "../../assets/icons";
import { useTranslation } from "react-i18next";
import TextPost from "../PostHeader/TextPost";

export default function PostTrain({ data, category }) {
  const mineDescription = data?.details?.substring(0, 400);
  const [showMore, setShowMore] = useState(false);
  const [t] = useTranslation();
  // console.log(data);
  return (
    <>
      <div className="my-2 p-md-4">
        <div className="mb-3">
          {" "}
          {data?.how_apply && (
            <>
              {" "}
              <h3 className="font-black text-xl text-[#0099ab] d-flex align-items-center gap-3">
                {t("How To Apply")}
              </h3>
              <TextPost text={data?.how_apply} />
            </>
          )}
        </div>{" "}
        {data.details && (
          <div className="my-4 ">
            <p
              className="text-[#0099ab] font-black"
              style={{
                color: "#0099AB",
              }}
            >
              {" "}
              {t("Details")}:
            </p>{" "}
            <p
              className={
                data?.details?.length > 400
                  ? " p-1 text-ellipsis bg-gradient-to-b  from-black to-slate-200 text-transparent bg-clip-text"
                  : "p-1 text-ellipsis bg-gradient-to-b "
              }
            >
              {" "}
              <TextPost text={data?.details} />
            </p>{" "}
          </div>
        )}
        <div className="flex gap-2 items-center flex-wrap my-2">
          {" "}
          {data.paid_or_free && (
            <>
              <p
                className="text-[#0099ab] font-black"
                style={{
                  color: "#0099AB",
                }}
              >
                {" "}
                {t("paid or free")}:
              </p>
              <span> {data.paid_or_free} </span>{" "}
            </>
          )}{" "}
        </div>{" "}
        <div className="flex gap-2 items-center flex-wrap my-2">
          {" "}
          {data.place && (
            <>
              <p
                className="text-[#0099ab] font-black"
                style={{
                  color: "#0099AB",
                }}
              >
                {" "}
                {t("Place")}:
              </p>
              <TextPost text={data?.place} />
            </>
          )}{" "}
        </div>{" "}
        <div className="flex gap-2 items-center flex-wrap my-2">
          {" "}
          {data.skills && (
            <>
              <p
                className="text-[#0099ab] font-black"
                style={{
                  color: "#0099AB",
                }}
              >
                {" "}
                {t("Skills")}:
              </p>
              <TextPost text={data?.skills} />
            </>
          )}{" "}
        </div>
        {data.authors && (
          <div className="flex items-center gap-2 pt-4">
            <p className="text-[#0099ab] font-black"> {"Authors" + " :"} </p>
            <div className="flex items-center gap-2">
              <p> {data?.authors} </p>{" "}
            </div>{" "}
          </div>
        )}{" "}
        {data.importance && (
          <div className="flex items-center gap-2 pt-4">
            <p className="text-[#0099ab] font-black"> {"Importance" + " :"} </p>
            <div className="flex items-center gap-2">
              <TextPost text={data?.importance} />
            </div>{" "}
          </div>
        )}
        {data.deadline && (
          <div className="my-4 d-flex align-items-center gap-1">
            <span
              className="d-block fs-5"
              style={{
                color: "#0099AB",
              }}
            >
              {" "}
              {t("Deadline")}:
            </span>{" "}
            <p className=" p-1 text-ellipsis bg-gradient-to-b from-black to-slate-200 text-transparent bg-clip-text">
              {" "}
              {data.deadline}{" "}
            </p>{" "}
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
              {" "}
              {t("click here")}{" "}
            </p>{" "}
          </a>
        ) : (
          <></>
        )}
      </div>{" "}
    </>
  );
}
