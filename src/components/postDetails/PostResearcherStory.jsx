import { useState } from "react";
import { Button, Modal } from "../ui";
import { cloud } from "../../assets/icons";
import { recommendedUserImage } from "../../assets/images";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import TextPost from "../PostHeader/TextPost";

export default function PostResearcherStory({ data, category }) {


  return (
    <>
      <div className="my-2 p-md-4">
        <div className="mb-3">
          {" "}
          {data?.name && (
            <h3 className="font-black text-xl text-[#0099ab] d-flex align-items-center gap-3">
              {" "}
              <TextPost text={data?.name} />{" "}
            </h3>
          )}{" "}
        </div>{" "}
        {data.description && (
          <div className="my-4 ">
            <p
              className="text-[#0099ab] font-black"
              style={{
                color: "#0099AB",
              }}
            >
              {" "}
              {t("Description")}:
            </p>{" "}
            <TextPost text={data?.description} />
          </div>
        )}
        {data.authors && (
          <div className="flex items-center gap-2 pt-4">
            <p className="text-[#0099ab] font-black"> {t("Authors") + " :"} </p>
            <div className="flex items-center gap-2">
              <TextPost text={data?.authors} />{" "}
            </div>{" "}
          </div>
        )}{" "}
        {data.students && (
          <div className="flex items-center gap-2 pt-4">
            <p className="text-[#0099ab] font-black">
              {" "}
              {t("The Most Important Achievements") + " :"}{" "}
            </p>
            <div className="flex items-center gap-2">
              <TextPost text={data?.students} />{" "}
            </div>{" "}
          </div>
        )}{" "}
        {data.projects && (
          <div className="flex items-center gap-2 pt-4">
            <p className="text-[#0099ab] font-black">
              {" "}
              {t("Available Projects") + " :"}{" "}
            </p>
            <div className="flex items-center gap-2">
              <TextPost text={data?.projects} />{" "}
            </div>{" "}
          </div>
        )}{" "}
        {data.email && (
          <div className="flex items-center gap-2 pt-4">
            <p className="text-[#0099ab] font-black"> {t("Email") + " :"} </p>
            <div className="flex items-center gap-2">
              <TextPost text={data?.email} />{" "}
            </div>{" "}
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
        {/* {data.description.length > 400 && (
          <div className="mt-4">
            <Button
              className="capitalize w-full "
              children={t("read more") + " " + t("Article")}
              onClick={() => {
                setShowMore(true);
              }}
            />{" "}
            <Modal
              isOpen={showMore}
              title=<TextPost text={data?.title} /> // title={data.title}
              closeModal={() => {
                setShowMore(false);
              }}
              children={<p className="p-4"> {data.description} </p>}
            />
          </div>
        )}{" "} */}
      </div>{" "}
    </>
  );
}
