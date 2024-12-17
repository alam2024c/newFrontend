import { Fragment, useState } from "react";
import { Modal } from "../ui";
import word from "../../assets/images/word 1.png";
import Excel from "../../assets/images/ExcelFile_Icon.png";
import pdf from "../../assets/images/Group 5 (1).png";
export default function Files({ data, hasCategory }) {
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
          {hasCategory ? (
            <>{image.file.path.split(".").pop()}</>
          ) : (
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
                {data.slice(0, 4).map((image, index) => (
                  <>
                    {image.file.path.split(".").pop() == "pdf" ? (
                      <a
                        target="_blank"
                        href={`${URL}/storage/${image.file.path}`}
                        className="post__file cursor-pointer"
                      >
                        <img
                          style={{ width: "40px ", height: "40px" }}
                          src={pdf}
                          alt=""
                        />
                        <span>{image.file.path}</span>
                      </a>
                    ) : image.file.path.split(".").pop() == "xlsx" ? (
                      <a
                        target="_blank"
                        href={`${URL}/storage/${image.file.path}`}
                        className="post__file cursor-pointer"
                      >
                        <img
                          style={{ width: "40px ", height: "40px" }}
                          src={Excel}
                          alt=""
                        />
                        <span>{image.file.path}</span>
                      </a>
                    ) : image.file.path.split(".").pop() == "docx" ? (
                      <a
                        target="_blank"
                        href={`${URL}/storage/${image.file.path}`}
                        className="post__file cursor-pointer"
                      >
                        <img
                          style={{ width: "40px ", height: "40px" }}
                          src={word}
                          alt=""
                        />
                        <span>{image.file.path}</span>
                      </a>
                    ) : (
                      <></>
                    )}
                  </>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
