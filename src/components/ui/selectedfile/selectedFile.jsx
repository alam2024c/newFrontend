import { t } from "i18next";
import { useState } from "react";
import AudioPlayer from "../audioPlayer/AudioPlayer";
import { close } from "../../../assets/images/icons";
import word from "../../../assets/images/word 1.png";
import Excel from "../../../assets/images/ExcelFile_Icon.png";
import pdf from "../../../assets/images/Group 5 (1).png";
export default function SelectedFile({
  setPhoto,
  photo,
  selectedField,
  setVideo,
  video,
  imageEdit,
  setImageEdit,
  setVideoEdit,
  videoEdit,
  setFile,
  setRecord,
  file,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const URL2 = import.meta.env.VITE_REACT_APP_API_KEY;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setUploadComplete(false);
    setVideo("");
    if (file) {
      handleUpload(e);
    }
  };

  const handleUpload = (e, type) => {
    // setUploading(true);

    // Simulating upload progress
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 10;
        } else {
          clearInterval(interval);
          setUploadComplete(true);
          setUploading(false);
          setTimeout(() => {
            if (selectedField == "image") {
              setPhoto((prev) => [...prev, ...e.target.files]);
              setVideo("");
              setRecord("");
            } else if (selectedField == "video") {
              // console.log(e.target.files[0]);

              setPhoto([]);
              setRecord("");
              setVideo(e.target.files[0]);
            } else if (selectedField == "file") {
              setFile((prev) => [...prev, ...e.target.files]);
              setVideo("");
              setPhoto("");
            }
          }, 0);
          return prevProgress;
        }
      });
    }, 0);
  };
  const removeFile = (index) => {
    const updatedFiles = [...photo];
    updatedFiles.splice(index, 1);
    setPhoto(updatedFiles);
  };
  // remove image edit
  const removeFileEdit = (index) => {
    const updatedFiles = [...imageEdit];
    updatedFiles.splice(index, 1);
    setImageEdit(updatedFiles);
  };

  const removeAllImages = () => {
    setPhoto([]);
  };
  const removeFiles = (index) => {
    const updatedFiles = [...file];
    updatedFiles.splice(index, 1);
    setFile(updatedFiles);
  };
  // remove image edit

  const removeAllFiles = () => {
    setFile([]);
  };

  return (
    <>
      {!video && (
        <label
          htmlFor="file"
          className="rounded-3 text-center d-flex bg-white p-4 w-100 border-dashed"
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginBottom: "30px",
          }}
        >
          <h4 style={{ fontWeight: "500" }}>
            {t("Choose a file or drag & drop it here")}
          </h4>
          <h3 style={{ fontWeight: "500", color: "#A9ACB4" }}>
            {/* {selectedField == "image"
              ? t("JPEG, PNG formats")
              : selectedField == "file"
              ? t("PDF formats")
              : t("mp4, and MP4 formats")} */}
            {/* {t("JPEG, PNG, PDF, and MP4 formats")} */}
          </h3>
          <br />

          <input
            type="file"
            multiple
            name="file[]"
            // required
            onChange={handleFileChange}
            id="file"
            style={{ display: "none" }} // Hide the input element
            accept={
              selectedField == "image"
                ? ".jpeg, .jpg, .png, .pdf"
                : selectedField == "file"
                ? ".pdf"
                : ".mp4"
            }
          />
          <label htmlFor="file" className="browse-button">
            {uploading ? t("Uploading...") : t("Browse File")}
          </label>
          {uploading && (
            <div>
              <p>Uploading: {uploadProgress}%</p>
              <progress value={uploadProgress} max="100" />
            </div>
          )}
          {/* {uploadComplete && (
          <div>
            <p>Upload Complete!</p>
          </div>
        )} */}
        </label>
      )}

      {photo.length > 0 ? (
        <div>
          <div
            className={`flex gap-3 mb-3 justify-center items-center rounded-lg ${
              photo.length > 2 ? "flex-wrap" : ""
            }`}
          >
            {photo?.map((f, index) => (
              <div className="relative flex justify-between" key={index}>
                <img
                  src={close}
                  className="absolute cursor-pointer -top-2 -left-4"
                  onClick={() => removeFile(index)}
                />
                <img
                  className={`rounded-lg object-cover ${
                    photo.length > 1
                      ? "w-60 h-40"
                      : photo.length > 2
                      ? "w-40 h-40"
                      : ""
                  }`}
                  src={URL.createObjectURL(f)}
                  alt=""
                />
              </div>
            ))}
          </div>

          <button
            className="flex justify-center m-2 h-fit w-full text-red-700"
            onClick={removeAllImages}
          >
            Remove All Images
          </button>
        </div>
      ) : (
        <>
          <>
            {imageEdit?.length > 0 && (
              <div className="d-flex flex-wrap gap-3 mb-3">
                {imageEdit?.map((f, index) => (
                  <div style={{ position: "relative" }} key={index}>
                    <img
                      src={close}
                      style={{ position: "absolute", cursor: "pointer" }}
                      onClick={() => removeFileEdit(index)}
                    />
                    <img
                      src={`${URL2}/storage/${f.image.path || f.image}`}
                      alt=""
                      style={{ width: "150px", height: "150px" }}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        </>
      )}
      {file?.length > 0 ? (
        <div>
          <div
            className={`flex gap-3 mb-3  items-center rounded-lg ${
              file.length > 2 ? "flex-wrap" : ""
            }`}
          >
            {file?.map((f, index) => (
              <div
                className={`grid gap-3 py-4 relative 
                 ${
                   file.length === 2 || file.length === 4
                     ? "sm:grid-cols-1  grid-cols-1"
                     : file.length === 3 || file.length > 4
                     ? "sm:grid-cols-1  grid-cols-1"
                     : "grid-cols-1"
                 } `}
                key={index}
              >
                <>
                  {f.name.split(".").pop() == "pdf" ? (
                    <div className="post__file cursor-pointer">
                      <img
                        style={{ width: "40px ", height: "40px" }}
                        src={pdf}
                        alt=""
                      />
                      <span>{f.name}</span>
                      <img
                        src={close}
                        className=" cursor-pointer "
                        onClick={() => removeFiles(index)}
                      />
                    </div>
                  ) : f.name.split(".").pop() == "xlsx" ? (
                    <div className="post__file cursor-pointer">
                      <img
                        style={{ width: "40px ", height: "40px" }}
                        src={Excel}
                        alt=""
                      />
                      <span>{f.name}</span>
                      <img
                        src={close}
                        className=" cursor-pointer "
                        onClick={() => removeFiles(index)}
                      />
                    </div>
                  ) : f.name.split(".").pop() == "docx" ? (
                    <div className="post__file cursor-pointer">
                      <img
                        style={{ width: "40px ", height: "40px" }}
                        src={word}
                        alt=""
                      />
                      <span>{f.name}</span>
                      <img
                        src={close}
                        className=" cursor-pointer "
                        onClick={() => removeFiles(index)}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              </div>
            ))}
          </div>

          <button
            className="flex justify-center m-2 h-fit w-full text-red-700"
            onClick={removeAllFiles}
          >
            Remove All file
          </button>
        </div>
      ) : (
        <>
          {/* <>
            {imageEdit && (
              <div className="d-flex flex-wrap gap-3 mb-3">
                {imageEdit?.map((f, index) => (
                  <div style={{ position: "relative" }} key={index}>
                    <img
                      src={close}
                      style={{ position: "absolute", cursor: "pointer" }}
                      onClick={() => removeFileEdit(index)}
                    />
                    <img
                      src={`${URL2}/storage/${f.image.path}`}
                      alt=""
                      style={{ width: "150px", height: "150px" }}
                    />
                  </div>
                ))}
              </div>
            )}
          </> */}
        </>
      )}

      {video ? (
        <>
          <img
            src={close}
            alt=""
            onClick={() => {
              setVideo("");
              // setSelectedFeild("video");
            }}
          />
          <div className="d-flex flex-wrap justify-content-center gap-3 mb-2">
            <video width="400" controls style={{ maxHeight: "350px" }}>
              <source
                src={
                  video.size
                    ? URL?.createObjectURL(video)
                    : `${URL2}/storage/videos/${video}`
                }
              />
            </video>
          </div>
        </>
      ) : (
        <>
          {/* {videoEdit && (
            <>
              <img
                src={close}
                alt=""
                onClick={() => {
                  setVideoEdit("");
                }}
              />
              <div className="d-flex flex-wrap justify-content-center gap-3 mb-2">
                <video width="400" controls style={{ maxHeight: "350px" }}>
                  <source src={`${URL2}/storage/videos/${videoEdit}`} />
                </video>
              </div>
            </>
          )} */}
        </>
      )}
    </>
  );
}
