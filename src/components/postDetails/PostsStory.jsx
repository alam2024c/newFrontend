import { useState } from "react";
import { Button, Modal } from "../ui";
import { cloud } from "../../assets/icons";
import { recommendedUserImage } from "../../assets/images";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import TextPost from "../PostHeader/TextPost";

export default function PostsStory({ data, category }) {
  const mineDescription = data?.story?.substring(0, 400);
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
          {data?.title && (
            <h3 className="font-black text-xl text-[#0099ab] d-flex align-items-center gap-3">
              {" "}
              <TextPost text={data?.title} />{" "}
            </h3>
          )}{" "}
        </div>{" "}
        {data.story && (
          <div className="my-4 ">
            <p className="text-[#0099ab] font-black"> {t("Story") + " :"} </p>{" "}
            <TextPost text={data?.story} />
          </div>
        )}{" "}
        <div className="flex gap-2 items-center">
          {" "}
          {data.documentation_type ? (
            <>
              <h3 className="font-black text-xl text-[#0099ab] d-flex align-items-center gap-3">
                {" "}
                {t("Document Type")}:
              </h3>{" "}
              <TextPost text={data?.documentation_type} />{" "}
            </>
          ) : (
            <h3 className="font-black text-xl text-[#0099ab]"> </h3>
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
        {/* {data.story.length > 400 && (
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
              title={fakeTitle}
              // title={data.title}
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
