// import React from "react";
import "./AddJob.scss";
// import Modal from "@mui/material/Modal";
import Picture from "../../../../assets/images/Picture.png";
import close1 from "../../../../assets/images/x.png";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../../../components/ui";

function AddJob() {
  const navigate = useNavigate();
  const [modalOpened, setModalOpened] = useState(false);
  const [t] = useTranslation();
  const [myfile, setmyFile] = useState("");
  const [showFile, setShowFile] = useState();

  function closeModal() {
    setModalOpened(false);
  }

  function openModal() {
    setModalOpened(true);
  }


  const groups = [
    { label: t("Name"), type: "text", placeholder: t("Name") },
    { label: t("Age"), type: "text", placeholder: t("Age") },
    { label: t("Job Title"), type: "text", placeholder: t("Job Title") },
    { label: t("Skills"), type: "text", placeholder: t("Skills") },
    { label: t("Experience"), type: "textarea", placeholder: t("Experience") },
    { label: t("Upload CV"), type: "file", buttonText: t("Upload CV") },
  ];

  return (
    <div className="addContents ">
      <div className="add bg-blue-50">
        <p>
          <img src={Picture} alt="" />
          {t("Add CV")}
        </p>

        <div>
          <button
            className="card"
            onClick={openModal}
          >
            {t("Add")}
          </button>
        </div>
      </div>


      <Modal
        isOpen={modalOpened}
        closeModal={closeModal}
        title="Add CV"
      >
        <form className="formAddContent">

          {groups.map((group, index) => (
            <div className="group" key={index}>
              <label className="font-bold text-gray-900 text-xs mt-1">{group.label}</label>
              {group.type === "select" ? (
                <select>
                  {group.options.map((option, optionIndex) => (
                    <option key={optionIndex}>{option}</option>
                  ))}
                </select>
              ) : group.type === "textarea" ? (
                <textarea type="text" placeholder={group.placeholder} />
              ) : group.type === "file" ? (
                myfile ? (
                  <div className="col-lg-12 mb-3">
                    <div className="form-group">
                      <label
                        htmlFor={`file-${index}`}
                        className="mont-font fw-600 font-xsss input-with-icon w-100"
                      >
                        <AiOutlineCloudDownload
                          className="ti-cloud-up ri-cloud-download-line input-icon"
                          style={{ fontSize: "20px" }}
                        />
                        <input
                          htmlFor={`file-${index}`}
                          style={{ width: "100%" }}
                          className="form-control"
                          disabled

                        />
                      </label>

                      <input
                        id={`file-${index}`}
                        style={{ paddingLeft: "0", display: "none" }}
                        type="file"
                        name="file[]"
                        required
                        multiple

                        className="input-file"
                      // accept=".png, .jpeg, .jpg"
                      />
                    </div>

                    <div className="w-100 m-auto h-100 position-relative">
                      <div className="w-100 h-75  m-auto mb-3  position-relative d-flex align-items-center flex-wrap justify-content-center gap-3">
                        {showFile?.map((e, index) => (
                          <h4 key={index}>{e.name}</h4>
                        ))}

                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="form-group mb-0 w-full">
                    <div className="form-group">
                      <label
                        htmlFor={`file-${index}`}
                        className="mont-font fw-600 font-xsss input-with-icon w-100"
                      >
                        <AiOutlineCloudDownload
                          className="ti-cloud-up ri-cloud-download-line input-icon"
                          style={{ fontSize: "20px" }}
                        />
                        <input
                          htmlFor={`file-${index}`}
                          style={{ width: "100%" }}
                          className="form-control"
                          disabled

                        />
                      </label>

                      <input
                        id={`file-${index}`}
                        style={{ paddingLeft: "0", display: "none" }}
                        type="file"
                        name="file[]"
                        required
                        multiple
                        onChange={(e) => {
                          setmyFile(e.target.files);
                          setShowFile([...e.target.files]);
                        }}
                        className="input-file"
                      // accept=".png, .jpeg, .jpg"
                      />
                    </div>
                  </div>
                )
              ) : (
                <input type={group.type} placeholder={group.placeholder} />
              )}
            </div>
          ))}

          <div className="d-block mb-3" style={{ textAlign: "end" }}>
            <button className="modelbtn" onClick={() => { navigate("/userCV") }}>{t("Add")}</button>
          </div>
        </form>

      </Modal>
    </div>
  );
}

export default AddJob;
