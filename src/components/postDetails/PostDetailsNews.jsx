import { useState } from "react";
import { cloud } from "../../assets/icons";
import { recommendedUserImage } from "../../assets/images";
import { useTranslation } from "react-i18next";
import TextPost from "../PostHeader/TextPost";

export default function PostDetailsNews({ data, category }) {

  const [t] = useTranslation();


  return (
    <>
      <div className="my-4 p-md-4">
        <div className="flex gap-2 items-center">
          {" "}
          {data.news_title ? (
            <h3 className="font-black text-xl text-[#0099ab]">
              {" "}
              <TextPost text={data?.news_title} />
            </h3>
          ) : (
            <></>
          )}
        </div>
        {data.date && (
          <p>
            {" "}
            {"("} {data.date} {")"}{" "}
          </p>
        )}{" "}
        {data.authors && (
          <div className="flex items-center gap-2 pt-4">
            <p className="text-[#0099ab] font-black"> {"Authors" + ":"} </p>
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
        )}
        {data.details && <TextPost text={data?.details} />}
        
        
        {data.url ? (
          <a className="flex gap-2 pb-3" href={data?.url} role="button"      
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
        {/* {data.details.length > 400 && (
          <>
            <Button
              className="capitalize w-full"
              children={t("read more") + " " + t("News")}
              onClick={() => {
                setShowMore(true);
              }}
            />{" "}
            <Modal
              isOpen={showMore}
              title={data.news_title}
              // title={data.title}
              closeModal={() => {
                setShowMore(false);
              }}
              children={<p className="p-4"> {data.details} </p>}
            />
          </>
        )}{" "} */}
      </div>{" "}
    </>
  );
}
