import { useState } from "react";
import { Button, Modal } from "../ui";
import { cloud } from "../../assets/icons";
import { recommendedUserImage } from "../../assets/images";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import TextPost from "../PostHeader/TextPost";

export default function PostResearch({ data, category }) {
  const mineDescription = data?.summary?.substring(0, 400);
  const [showMore, setShowMore] = useState(false);
  const [t] = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <div className="my-4 p-md-4">
        <div className="flex gap-2 items-center">
          {" "}
          {data?.title ? (
            <>
              <h3 className="font-black text-xl text-[#0099ab] d-flex align-items-center gap-3">
                {" "}
                {/* {t("Document Type")}: */}
              </h3>{" "}
              <div className="text-[#0099ab] font-black">
                {" "}
                <TextPost text={data?.title} />
              </div>
              {/* <span>               <TextPost text={data?.title} /> </span>{" "} */}
            </>
          ) : (
            <></>
          )}
         
        </div>
        {data.authors && (
          <div className="flex items-center gap-2 pt-4">
            <p className="text-[#0099ab] font-black"> {t("Authors") + ":"} </p>
            <div className="flex items-center gap-2">
              {data?.user_authors?.map((author, key) => (
                <div
                  key={key}
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
            </div>{" "}
          </div>
        )}
        {data.summary && (
          <div className="my-4 ">
            <p
              className="text-[#0099ab] font-black"
              style={{
                color: "#0099AB",
              }}
            >
              {" "}
              {t("summary")} :
            </p>{" "}
            <TextPost text={data?.summary} />
          </div>
        )}{" "}
        {data.importance && (
          <div className="my-4 d-flex align-items-center gap-1">
            <p
              className="text-[#0099ab] font-black"
              style={{
                color: "#0099AB",
              }}
            >
              {" "}
              {t("Importance")} :
            </p>{" "}
            <div className=" p-1 text-ellipsis bg-gradient-to-b ">
              {" "}
              <TextPost text={data?.importance} />{" "}
            </div>{" "}
          </div>
        )}
        {data.date && (
          <p>
            {" "}
            {"("} {data.date} {")"}{" "}
          </p>
        )}{" "}
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
        {/* <>
          <Button
            className="capitalize w-full"
            children={t("read more") + " " + t("Research")}
            onClick={() => {
              navigate(`/research/${data?.id}`);
            }}
          />{" "}
          <Modal
            isOpen={showMore}
            title={data?.title}
            // title={data.title}
            closeModal={() => {
              setShowMore(false);
            }}
            children={<p className="p-4"> {data.summary} </p>}
          />
        </> */}
      </div>{" "}
    </>
  );
}
