import { useState } from "react";
import { Button, Modal } from "../ui";
import { cloud } from "../../assets/icons";
import { recommendedUserImage } from "../../assets/images";
import { t } from "i18next";
import TextPost from "../PostHeader/TextPost";

export default function PostDocument({ data, category }) {
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
      <div className=" px-4">
        {data?.title && (
          <h3 className="font-black text-xl text-[#0099ab] d-flex align-items-center gap-3">
            <TextPost text={data?.title} />
          </h3>
        )}
      </div>
      {data.details && (
        <div className="my-4 ">
          <p className="text-[#0099ab] font-black" style={{ color: "#0099AB" }}>
            {t("Details")} :
          </p>
          <TextPost text={data?.details} />{" "}
        </div>
      )}
      <div className="my-2 p-md-4">
        <div className="flex gap-2 items-center">
          {data.documentation_type && (
            <>
              <h3 className="font-black text-xl text-[#0099ab] d-flex align-items-center gap-3">
                {t("Document Type")} :
              </h3>
              <span> {data.documentation_type}</span>
            </>
          )}

          {data.date && (
            <p>
              {"("}
              {data.date}
              {")"}
            </p>
          )}
        </div>

        {data.summary && (
          <div className="my-4 ">
            <span className="d-block fs-5" style={{ color: "#0099AB" }}>
              {t("Details")}:
            </span>
            <p className=" p-1 text-ellipsis bg-gradient-to-b from-black to-slate-200 text-transparent bg-clip-text">
              <TextPost text={data?.summary} />{" "}
            </p>
          </div>
        )}
        {data.authors && (
          <div className="flex items-center gap-2 pt-4">
            <p className="text-[#0099ab] font-black">{"Authors" + " :"}</p>

            <div className="flex items-center gap-2">
              <p>{data?.authors}</p>
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
              {data.deadline}
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

        {/* {data.details.length > 400 && (
          <>
            <Button
              className="capitalize w-full"
              children={"reed more" + " " + category}
              onClick={() => {
                setShowMore(true);
              }}
            />
            <Modal
              isOpen={showMore}
              title={fakeTitle}
              // title={data.title}
              closeModal={() => {
                setShowMore(false);
              }}
              children={<p className="p-4">{data.description}</p>}
            />
          </>
        )} */}
      </div>
    </>
  );
}
