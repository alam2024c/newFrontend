import { useState } from "react";
import { Button, Modal } from "../ui";
import { cloud } from "../../assets/icons";
import { recommendedUserImage } from "../../assets/images";
import { t } from "i18next";
import TextPost from "../PostHeader/TextPost";

export default function PostQuestionnaire({ data, category }) {
  const mineDescription = data?.details?.substring(0, 700);
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
        <div className="mb-3">
          {data?.title && (
            <h3 className="font-black text-xl text-[#0099ab] d-flex align-items-center gap-3">
              <TextPost text={data?.title} />
            </h3>
          )}
        </div>
        {data.details && (
          <div className="my-4 ">
            <p
              className="text-[#0099ab] font-black"
              style={{ color: "#0099AB" }}
            >
              {t("Details")} :
            </p>
            <TextPost text={data?.details} />
          </div>
        )}
        {data.question && (
          <div className="flex items-center gap-2 ">
            <p className="text-[#0099ab] font-black">
              {t("Importance of questionnaire") + " :"}
            </p>

            <div className="flex items-center gap-2">
              <TextPost text={data?.question} />{" "}
            </div>
          </div>
        )}
        {data.type && (
          <div className="flex items-center gap-2 pt-4">
            <p className="text-[#0099ab] font-black">
              {t("Questionnaire Type") + " :"}
            </p>

            <div className="flex items-center gap-2">
              <TextPost text={data?.type} />
            </div>
          </div>
        )}

        {data.organization && (
          <div className="flex items-center gap-2 pt-4">
            <p className="text-[#0099ab] font-black">
              {t("Organization") + " :"}
            </p>

            <div className="flex items-center gap-2">
              <TextPost text={data?.organization} />{" "}
            </div>
          </div>
        )}

        {data.deadline && (
          <div className="my-4 d-flex align-items-center gap-1">
            <span className="d-block fs-5" style={{ color: "#0099AB" }}>
              {t("Deadline")} :
            </span>
            <TextPost text={data?.deadline} />
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
