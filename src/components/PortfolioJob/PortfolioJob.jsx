import { useState } from "react";
import "./PortfolioJob.scss";
import { useTranslation } from "react-i18next";
// import Modal from "@mui/material/Modal";
import Picture from "../../assets/images/Picture.png";
import close1 from "../../assets/images/x.png";
import filter from "../../assets/images/filter.png";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { Modal } from "../ui";

function PortfolioJob() {
  const [activeOffer, setActiveOffer] = useState(false);
  const [menuPost, setMenuPost] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [t] = useTranslation();
  const [myfile, setmyFile] = useState("");
  const [showFile, setShowFile] = useState();

  const groups = [
    { label: t("Name"), type: "text", placeholder: t("Name") },
    { label: t("Age"), type: "text", placeholder: t("Age") },
    { label: t("Job Title"), type: "text", placeholder: t("Job Title") },
    { label: t("Skills"), type: "text", placeholder: t("Skills") },
    { label: t("Experience"), type: "textarea", placeholder: t("Experience") },
    { label: t("UploadFile"), type: "file", buttonText: t("D") },
  ];

  const lists = [
    { li: t("Date Of Publication"), span: t("منذ 6 دقائق") },
    { li: t("Budget"), span: t("50$ - 100$") },
    { li: t("Implementation Period"), span: t("1 يوم") },
    { li: t("averageOffers"), span: t("70$") },
    { li: t("numberOfOffers"), span: 2 },
  ];

  return (
    <>
      <div className="sectionCenter max-w-4xl m-auto">
        <div className="contents">
          <div className="contentRequest" style={{ margin: "30px 5px" }}>
            <div className="add">
              <p
                style={{
                  color: "#25324B",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                <img src={Picture} alt="" />
                {t("Brand Designer")}
              </p>
              <p
                style={{
                  color: "#7C8493",
                  marginLeft: "60px",
                  marginTop: "-14",
                }}
              >
                I need a designer to make two logos and branding
              </p>
              <div className="singlePost flex-wrap">
                <div style={{ justifyContent: "space-between" }}>
                  <button className="btn1">{t("Illustrator")}</button>

                  <button className="btn2">{t("Photoshop")}</button>

                  <button className="btn3">{t("Adobe Xd")}</button>
                </div>
                <button className="btn4" onClick={() => setModalOpened(true)}>
                  {t("Add Your Offer")}
                </button>
              </div>
            </div>
          </div>

          <div className="projectCard contentRequest">
            <div className="add" style={{ padding: "15px 40px" }}>
              <h4 className="fw-700 text-grey-900 font-xs mt-1">
                {" "}
                {t("Project Card")}
              </h4>
              <ul>
                {lists.map((list, index) => (
                  <li
                    className=" font-sm fw-500 mt-1 lh-3 text-grey-600"
                    key={index}
                  >
                    {list.li}
                    <span> {list.span}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="projectCard contentRequest">
            <div className="add" style={{ padding: "15px 40px" }}>
              <h4 className="fw-700 text-grey-900 font-xs mt-1">
                {" "}
                {t("projectDescription")}
              </h4>
              <p className="font-sm fw-500 mt-1 lh-3 text-grey-700">
                Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et
                massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                sapien fringilla, mattis ligula consectetur, ultrices mauris.
                Maecenas vitae mattis tellus..
              </p>
            </div>
          </div>

          <div className="projectCard contentRequest">
            <div className="add" style={{ padding: "15px 40px" }}>
              <h4 className="fw-700 text-grey-900 font-xs mt-1">
                {" "}
                {/* Change by Abdallah */}
                {t("Required Skills")}
              </h4>
              <div className="singlePost">
                <div style={{ justifyContent: "space-between" }}>
                  <button className="btn1">{t("Illustrator")}</button>

                  <button className="btn2">{t("Photoshop")}</button>

                  <button className="btn3">{t("Adobe Xd")}</button>
                </div>
              </div>
            </div>
          </div>

          <div className="projectCard contentRequest">
            <div className="add" style={{ padding: "15px 40px" }}>
              <div
                className="d-flex top justify-content-between mb-3"
                style={{
                  borderBottom: "1px solid rgba(153, 153, 153, 0.5019607843)",
                }}
              >
                <h3 className="fw-700 text-grey-900 font-xs mt-1">
                  {t("offersSubmitted")}
                </h3>
                <button
                  className="bg-primary-gradiant text-white position-relative"
                  onClick={() => setMenuPost(!menuPost)}
                >
                  {t("themostrecent")}

                  <img src={filter} alt="" />
                  {/* {
                    <div
                      className={
                        // menuPost
                        //   ?
                        "dropdown-menu-post card "
                        // : "dropdown-menu-post card active"
                      }
                    >
                      <ul className="d-flex flex-column rounded-xxxl">
                        <li className="fw-700 text-grey-900 font-sms d-flex gap-3 p-2 cursor-pointer ">
                          {t("themostrecent")}
                        </li>
                        <li className="fw-700 text-grey-900 font-sms d-flex gap-3 p-2 cursor-pointer ">
                          {t("oldest")}
                        </li>
                        <li className="fw-700 text-grey-900 font-sms d-flex gap-3 p-2 cursor-pointer ">
                          {t("faster")}
                        </li>
                        <li className="fw-700 text-grey-900 font-sms d-flex gap-3 p-2 cursor-pointer ">
                          {t("cheapest")}
                        </li>
                      </ul>
                    </div>
                  } */}
                </button>
              </div>
              {[...Array(3)].map((_, index) => (
                <div
                  className="info mb-3"
                  key={index}
                  style={{
                    borderBottom: "1px solid rgba(153, 153, 153, 0.5019607843)",
                  }}
                >
                  <div className="card-body p-0 d-flex">
                    <figure className="avatar ms-3">
                      <img
                        src={Picture}
                        alt=""
                        className="shadow-sm rounded-circle w45"
                      />
                    </figure>
                    <h5 className="fw-700 text-grey-900 font-sm mt-1">
                      Anthony Daugloi{" "}
                      <span className="d-block font-sm fw-500 mt-1 lh-3 text-grey-500">
                        {t("ago")} 2 {t("hour")}
                      </span>
                    </h5>
                  </div>
                  <div className="card-body p-0 ms-lg-5">
                    <p className="fw-500 text-grey-500 lh-26 font-sm w-100 mb-2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Morbi nulla dolor,Proin blandit ac massa sed rhoncus{" "}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalOpened}
        closeModal={() => setModalOpened(false)}
        title="Add CV"
      >
        <form className="formAddContent">
          {groups.map((group, index) => (
            <div className="group" key={index}>
              <label className="font-bold text-gray-900 text-xs mt-1">
                {group.label}
              </label>
              {group.type === "textarea" ? (
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
            <button className="modelbtn">{t("Add")}</button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default PortfolioJob;
