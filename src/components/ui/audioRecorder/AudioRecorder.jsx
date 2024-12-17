import { useEffect, useRef, useState } from "react";
import { mic } from "../../../assets/images/icons";
import Waveform from "./Waveform";
import delet from "../../../assets/images/delete.png";
import recordbutton from "../../../assets/images/recordbutton.png";
import { t } from "i18next";
import AudioPlayer from "../audioPlayer/AudioPlayer";
import { close } from "../../../assets/images/icons";

export default function AudioRecorder({
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
  url,
  file,
  setRecord,
  record,
  setrecordEdit,
  recordEdit,
  setUrl,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setUploadComplete(false);

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
              setVideo(e.target.files[0]);
              setPhoto([]);
              setRecord("");
            } else if (selectedField == "file") {
              setFile((prev) => [...prev, ...e.target.files]);
              setVideo("");
              setPhoto("");
            } else if (selectedField == "record") {
              setRecord(e.target.files[0]);
              setVideo("");
              setPhoto("");
            }
          }, 0);
          return prevProgress;
        }
      });
    }, 0);
  };

  // const [url, setUrl] = useState();
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [timer, setTimer] = useState(0);
  const audioRef = useRef(null);

  const handleRecordClick = async () => {
    if (recording) {
      stopRecording();
    } else {
      await startRecording();
    }
  };
  useEffect(() => {
    let interval;
    if (recording) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [recording]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      const chunks = [];
      recorder.addEventListener("dataavailable", (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      });

      recorder.addEventListener("stop", () => {
        const audioBlob = new Blob(chunks, { type: "audio/webm" });
        addAudioElement(audioBlob);
      });

      recorder.start();
      setRecording(true);
      setMediaRecorder(recorder);
    } catch (error) {
      console.error("Error starting audio recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      setRecording(false);
    }
  };
  const URL_API = import.meta.env.VITE_REACT_APP_API_KEY;

  const addAudioElement = (audioBlob) => {
    const audioUrl = URL.createObjectURL(audioBlob);
    audioRef.current.src = audioUrl;
    console.log(audioRef);
    console.log(audioUrl);
    setUrl(audioUrl);
  };

  const [userChoice, setUserChoice] = useState("");

  const handleUserChoice = (choice) => {
    // Function to handle user's choice
    setUserChoice(choice);
  };

  const handleDelete = () => {
    setUrl(""); // Clear the URL
  };
  console.log(
    record,
    "recordrecordrecordrecordrecordrecordrecordrecordrecordrecordrecordrecordrecordrecordrecordrecordrecordrecord"
  );
  return (
    <>
      {/* <p className="font-black">
        {audioChunks.length > 0 ? "Your record" : "Tap here to start a record"}
      </p>

      <button
        className={`${
          recording ? "bg-[#7CC9D1]" : "bg-[#999999]"
        } w-24 h-24 flex justify-center items-center rounded-full`}
        onClick={recording ? stopRecording : startRecording}
      >
        <img className="w-12" src={mic} alt="" />
      </button>
      <button onClick={handleDownload}>Download Recording</button>

      {recordedAudioURL && (
        <div>
          <audio controls src={recordedAudioURL} />
          <button onClick={handlePlayback}>Play Recorded Audio</button>
        </div>
      )} */}
      {!record && (
        <>
          {userChoice === "" && (
            <div>
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
                <h3 style={{ fontWeight: "500" }}>
                  {t("How would you like to add audio?")}
                </h3>
                <br />
                <button
                  className="browse-button"
                  onClick={() => handleUserChoice("record")}
                >
                  {t("Record Audio")}
                </button>
                <button
                  className="browse-button"
                  onClick={() => handleUserChoice("upload")}
                >
                  {t("Upload Audio")}
                </button>
              </label>
            </div>
          )}
        </>
      )}

      {userChoice === "record" && (
        <>
          {url ? (
            //  شكل الريكورد بعد التسجيل

            <div
              className="rounded-3 text-center p-5 w-100 border-dashed"
              style={{ marginBottom: "20px" }}
            >
              {/* <h4 style={{ fontWeight: "500", fontSize: "large" }}>
                Your record
              </h4> */}

              <div className="wavebody">
                <Waveform url={url} />
                <div style={{ margin: "auto", display: "block" }}>
                  {" "}
                  <img
                    style={{ margin: "auto" }}
                    src={delet}
                    alt=""
                    onClick={handleDelete}
                  />
                </div>
              </div>
            </div>
          ) : (
            //   شكل الريكورد عند التسجيل

            <div
              className="rounded-3 text-center d-flex bg-white w-100 btn-tertiary js-labelFile p-4 border-dashed"
              style={{
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                width: "200px",
                margin: "0 auto",
                fontSize: "48px",
                cursor: "pointer",
                marginBottom: "20px",
              }}
              onClick={handleRecordClick}
            >
              <h4 style={{ fontWeight: "500", fontSize: "large" }}>
                {recording ? t("Click to stop") : t("Click to record")}
              </h4>
              <img src={recordbutton} />

              {recording && (
                <p
                  style={{
                    textAlign: "center",
                    marginTop: "10px",
                    fontSize: "24px",
                  }}
                >
                  Recording...
                </p>
              )}

              {recording && (
                <p
                  style={{
                    textAlign: "center",
                    marginTop: "10px",
                    fontSize: "24px",
                  }}
                >
                  {formatTime(timer)}
                </p>
              )}

              <audio ref={audioRef} controls className="audio1" />
            </div>
          )}
        </>
      )}

      {userChoice === "upload" && (
        <>
          {!record && (
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
                {t("MP3 formats")}
              </h3>
              <br />
              <input
                type="file"
                name="file[]"
                required
                onChange={handleFileChange}
                id="file"
                style={{ display: "none" }} // Hide the input element
                accept=".mp3 , .mpej ,.mpja ,.wav .webm"
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
              {uploadComplete && (
                <div>
                  <p>Upload Complete!</p>
                </div>
              )}
            </label>
          )}
        </>
      )}
      {record ? (
        // <audio src={URL.createObjectURL(record)}></audio>
        <>
          <img
            src={close}
            alt=""
            onClick={() => {
              setRecord("");
              // setSelectedFeild("video");
            }}
          />
          <AudioPlayer
            data={
              record.size
                ? URL?.createObjectURL(record)
                : `${URL_API}/storage/${record}`
            }
          />
        </>
      ) : (
        <>
          {recordEdit && (
            <>
              <img src={close} alt="" onClick={() => setrecordEdit("")} />
              <AudioPlayer data={`${URL_API}/storage/${recordEdit}`} />
            </>
          )}
        </>
      )}
    </>
  );
}
