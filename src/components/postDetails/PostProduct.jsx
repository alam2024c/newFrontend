import { useState } from "react";
import { Button, Modal } from "../ui";
import { cloud } from "../../assets/icons";
import { recommendedUserImage } from "../../assets/images";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import TextPost from "../PostHeader/TextPost";

export default function PostProduct({ data, category }) {
  const mineDescription = data?.details?.substring(0, 700);
  const [showMore, setShowMore] = useState(false);
  const [t] = useTranslation();

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
          {" "}
          {data?.name && (
            <h3 className="font-black text-xl text-[#0099ab] d-flex align-items-center gap-3">
              {" "}
              <TextPost text={data?.name} />{" "}
            </h3>
          )}{" "}
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
              {t("Offer details")}:
            </p>{" "}
            <TextPost text={data?.details} />
          </div>
        )}
        <div className="flex gap-2 items-center flex-wrap">
          {" "}
          {data.email ? (
            <>
              <h3 className="font-black text-xl text-[#0099ab] d-flex align-items-center gap-3">
                {" "}
                {t("Price")}:
              </h3>{" "}
              <TextPost text={data?.email} />{" "}
            </>
          ) : (
            <h3 className="font-black text-xl text-[#0099ab]"> {fakeTitle} </h3>
          )}
          {data.date && (
            <p>
              {" "}
              {"("} {data.date} {")"}{" "}
            </p>
          )}{" "}
        </div>
        {data.authors && (
          <div className="flex items-center gap-2 pt-4">
            <p className="text-[#0099ab] font-black"> {"Authors" + " :"} </p>
            <div className="flex items-center gap-2">
              <TextPost text={data?.authors} />{" "}
            </div>{" "}
          </div>
        )}{" "}
        {data.importance && (
          <div className="flex items-center gap-2 pt-4">
            <p className="text-[#0099ab] font-black"> {"Importance" + " :"} </p>
            <div className="flex items-center gap-2">
              <TextPost text={data?.importance} />{" "}
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
              {" "}
              {t("click here")}{" "}
            </p>{" "}
          </a>
        ) : (
          <></>
        )}
        {/* {data.details.length > 400 && (
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
              title=              <TextPost text={data?.title} /> // title={data.title}
              closeModal={() => {
                setShowMore(false);
              }}
              children={<p className="p-4"> {data.details} </p>}
            />
          </div>
        )}{" "} */}
      </div>{" "}
    </>
  );
}
