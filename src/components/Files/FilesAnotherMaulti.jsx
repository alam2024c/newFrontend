import { Fragment, useState } from "react";
import { Modal } from "../ui";
import word from "../../assets/images/word 1.png";
import Excel from "../../assets/images/ExcelFile_Icon.png";
import pdf from "../../assets/images/Group 5 (1).png";
import { t } from "i18next";
export default function FilesAnotherMaulti({ data, hasCategory }) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const URL = import.meta.env.VITE_REACT_APP_API_KEY;

  return (
    <>
      {data?.length > 0 && (
        <>
          <div
            className={`grid gap-3 py-4 relative 
                 ${
                   data.length === 2 || data.length === 4
                     ? "sm:grid-cols-1  grid-cols-1"
                     : data.length === 3 || data.length > 4
                     ? "sm:grid-cols-1  grid-cols-1"
                     : "grid-cols-1"
                 } `}
          >
            {data?.slice(0, 4).map((image, index) => (
              <div key={index}>
                {image?.path?.split(".").pop() == "pdf" ? (
                  <a
                    key={index}
                    target="_blank"
                    href={`${URL}/storage/${image.path}`}
                    className="post__file cursor-pointer"
                  >
                    <img
                      style={{ width: "40px ", height: "40px" }}
                      src={pdf}
                      alt=""
                    />
                    <span> {t("Attached File")}</span>
                  </a>
                ) : image?.path?.split(".").pop() == "xlsx" ? (
                  <a
                    key={index}
                    target="_blank"
                    href={`${URL}/storage/${image.path}`}
                    className="post__file cursor-pointer"
                  >
                    <img
                      style={{ width: "40px ", height: "40px" }}
                      src={Excel}
                      alt=""
                    />
                    <span>{image}</span>
                  </a>
                ) : image?.path?.split(".").pop() == "docx" ? (
                  <a
                    key={index}
                    target="_blank"
                    href={`${URL}/storage/${image.path}`}
                    className="post__file cursor-pointer"
                  >
                    <img
                      style={{ width: "40px ", height: "40px" }}
                      src={word}
                      alt=""
                    />
                    <span>{image}</span>
                  </a>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
