import { useState, useRef, useEffect } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { FaMicrophoneAlt } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

function ChatContentFooter({
  sendMessage, // Function to handle sending messages
  text,
  setText,
  file,
  setFile,
  audioBlob,
  setAudioBlob,
  isRecording,
  startRecording,
  stopRecording,
  isRecordingView,
  setIsRecordingView,
}) {
  // Reference for adjusting textarea height
  const textareaRef = useRef(null);

  // Adjust textarea height based on content
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "40px"; // Reset height
    textarea.style.height = `${Math.min(
      textarea.scrollHeight,
      window.innerHeight * 0.5
    )}px`;
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [text]);

  return (
    <form
      className="content__footer position-relative d-flex justify-content-between px-2"
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage();
      }}
    >
      {isRecordingView ? (
        // Recording Footer Layout
        <div className="d-flex align-items-center w-100">
          {/* Audio Playback Preview */}
          <div className="audio-preview d-flex align-items-center w-100 px-2">
            <audio
              controls
              src={audioBlob ? URL.createObjectURL(audioBlob) : ""}
              style={{ flexGrow: 1 }}
            />
            {/* Trash Icon to Remove Recording */}
            <MdDelete
              className="cursor-pointer mx-2 text-danger"
              style={{ fontSize: "24px" }}
              onClick={() => {
                setAudioBlob(null);
                setIsRecordingView(false); // Exit recording view
              }}
            />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            className="send not__bg align-items-end d-flex ml-2"
          >
            <IoSend className="font-xl cursor-pointer" />
          </button>
        </div>
      ) : (
        // Normal Footer Layout
        <div className="d-flex align-items-end w-100">
          {/* Emoji Picker */}
          <div className="emoji-picker">
            <BsEmojiSmile
              onClick={() => setShowEmoji((val) => !val)}
              style={{ cursor: "pointer", fontSize: "25px" }}
            />
          </div>

          {/* File Upload */}
          <div className="file-upload d-flex align-items-center mx-2">
            <input
              type="file"
              onChange={(e) => setFile([...file, ...e.target.files])}
              className="d-none"
              id="file"
              accept=".png,.jpg,.jpeg"
            />
            <label htmlFor="file">
              <AiOutlinePlus className="cursor-pointer font-lg" />
            </label>
          </div>

          {/* Textarea for Input */}
          <textarea
            ref={textareaRef}
            value={text}
            style={{ height: "40px", maxHeight: "25vh" }}
            onChange={(e) => setText(e.target.value)}
            placeholder="Message"
            className="w-full bg-transparent outline-none resize-none text-lg"
            cols="30"
            rows="2"
          ></textarea>

          {/* Recording Icon */}
          <FaMicrophoneAlt
            onClick={() => {
              startRecording();
              setIsRecordingView(true); // Enter recording view
            }}
            style={{
              fontSize: "20px",
              cursor: "pointer",
              color: isRecording ? "red" : "black",
            }}
          />
        </div>
      )}
    </form>
  );
}

export default ChatContentFooter;
