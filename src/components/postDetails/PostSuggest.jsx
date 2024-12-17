import { useState } from "react";
import { Button, Modal } from "../ui";
import { cloud } from "../../assets/icons";
import { recommendedUserImage } from "../../assets/images";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import TextPost from "../PostHeader/TextPost";

export default function PostSuggest({ data, category }) {
  const mineDescription = data.details.substring(0, 400);
  const [showMore, setShowMore] = useState(false);
  const [t] = useTranslation();

  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const handelClick = () => {
    navigate(`/singlePost/${target.id}`);
  };
  return (
    <>
      <div className="my-4 p-md-4">
        <div className="flex gap-2 items-center">
          {" "}
          {data.project_title ? (
            <h3 className=" text-[#0099ab] w-100">
              {" "}
              <TextPost text={data?.project_title} />{" "}
            </h3>
          ) : (
            <></>
          )}
          {data.date && (
            <p>
              {" "}
              {"("} {data.date} {")"}{" "}
            </p>
          )}{" "}
        </div>{" "}
        {data.authors && (
          <div className="flex items-center gap-2 pt-4">
            <p className="text-[#0099ab] font-black"> {"Members" + ":"} </p>
            <div className="flex items-center gap-2">
              <img
                className="w-6 rounded-full"
                src={recommendedUserImage}
                alt=""
              />
              <p> {"Dr.Mamon "} </p>{" "}
            </div>
            <div className="flex items-center gap-2">
              <img
                className="w-6 rounded-full"
                src={recommendedUserImage}
                alt=""
              />
              <p> {"Dr.Mamon "} </p>{" "}
            </div>{" "}
          </div>
        )}{" "}
        {data.details && (
          <div className="my-4">
            <span
              className="d-block fs-5"
              style={{
                color: "#0099AB",
              }}
            >
              {" "}
              {t("Details")}:
            </span>{" "}
            <TextPost text={data?.details} />
          </div>
        )}{" "}
        {data.skills && (
          <div className="my-4">
            <span
              className="d-block fs-5"
              style={{
                color: "#0099AB",
              }}
            >
              {" "}
              {t("skills")}:
            </span>{" "}
            <TextPost text={data?.skills} />
          </div>
        )}{" "}
        
        {/* {data.file ? (
              <a className="flex gap-2 pb-3" href={data?.url} role="button">
                <img src={cloud} alt="" />
                <p className="capitalize underline text-[#0099ab]">
                  {t("click here")}
                </p>
              </a>
            ) : (
              <a className="flex gap-2 pb-3" href="" role="button">
                <img src={cloud} alt="" />
                <p className="capitalize underline text-[#0099ab]">
                  {t("click here")}
                </p>
              </a>
            )} */}
        {data.members && (
          <div className="flex items-center gap-2 pt-4">
            <p className="text-[#0099ab] font-black"> {t("Members") + " :"} </p>
            <div className="flex items-center gap-2">
              <p> {data?.members} </p>{" "}
            </div>{" "}
          </div>
        )}{" "}
        {data.Members && (
          <div className="flex items-center gap-2 pt-4">
            <p className="text-[#0099ab] font-black"> {t("Members") + " :"} </p>
            <div className="flex items-center gap-2">
              {" "}
              {/* <img
                        className="w-6 rounded-full"
                        src={recommendedUserImage}
                        alt=""
                      /> */}{" "}
              <p> {data?.Members} </p>{" "}
            </div>
            {/* <div className="flex items-center gap-2">
                      <img
                        className="w-6 rounded-full"
                        src={recommendedUserImage}
                        alt=""
                      />
                      <p>{"Dr.Mamon "}</p>
                    </div> */}{" "}
          </div>
        )}{" "}
      </div>{" "}
    </>
  );
}
