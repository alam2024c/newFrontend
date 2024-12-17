import { cloud } from "../../assets/icons";
import { t } from "i18next";
import TextPost from "../PostHeader/TextPost";

export default function PostBook({ data, category }) {
  return (
    <>
      <div className="my-2 p-md-4">
        <div className="mb-3">
          {" "}
          {data?.title && (
            <h3 className="font-black text-xl text-[#0099ab] d-flex align-items-center gap-3">
              {" "}
              <TextPost text={data?.title} />
            </h3>
          )}{" "}
        </div>{" "}
        {data.summary && (
          <div className="my-4 ">
            <h3 className="font-black text-xl text-[#0099ab] d-flex align-items-center gap-3">
              {" "}
              {t("Summary")}:
            </h3>{" "}
            <TextPost text={data?.summary} />
          </div>
        )}{" "}
        <div className="flex gap-2 items-center">
          {" "}
          {data.learned_lesson ? (
            <>
              <h3 className="font-black text-xl text-[#0099ab] d-flex align-items-center gap-3">
                {" "}
                {t("Learned Lessonss")}:
              </h3>{" "}
              <TextPost text={data?.learned_lesson} />
            </>
          ) : (
            <></>
          )}
          {data.date && (
            <p>
              {" "}
              {"("} {data.date} {")"}{" "}
            </p>
          )}{" "}
        </div>
        {data.author && (
          <div className="flex items-center gap-2 pt-4">
            <p className="text-[#0099ab] font-black"> {t("Authors") + " :"} </p>
            <div className="flex items-center gap-2">
              <p> {data?.author} </p>{" "}
            </div>{" "}
          </div>
        )}{" "}
        {data.importance && (
          <div className="flex items-center gap-2 pt-4">
            <p className="text-[#0099ab] font-black"> {"Importance" + " :"} </p>
            <div className="flex items-center gap-2">
              <p> {data?.importance} </p>{" "}
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
          <a className="flex gap-2 my-3 pb-3" href={data?.url} 
          role="button"
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
