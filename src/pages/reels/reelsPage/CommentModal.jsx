/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Picture from "../../../assets/images/Picture.png";
import Typography from "@mui/material/Typography";
import ASign from "../../../assets/images/ASign.png";
import Emoji from "../../../assets/images/Emoji.png";
import xicon from "../../../assets/images/xicon.png";
import redheart from "../../../assets/images/redheart.png";
import like from "../../../assets/images/Stroke.png";
// import { EmojiPicker } from 'emoji-picker-react';
// import Picker from 'emoji-picker-react';
// import { Picker } from 'emoji-picker-react';
import Picker from "emoji-picker-react";

const CommentModal = ({ open, handleClose, comments, addComment }) => {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    addComment({
      comment: newComment,
      date: new Date().toLocaleString(),
      likes: 0,
      replies: [],
      src: like,
    });
    setNewComment("");
  };

  const handleLikeComment = (index) => {
    const updatedComments = [...comments];
    const currentLikes = updatedComments[index].likes;

    if (updatedComments[index].src === redheart) {
      updatedComments[index].src = like;
      updatedComments[index].likes = currentLikes - 1;
    } else {
      updatedComments[index].src = redheart;
      updatedComments[index].likes = currentLikes + 1;
    }

    setNewComment(updatedComments);
  };
  const handleLikeReply = (commentIndex, replyIndex) => {
    const updatedComments = [...comments];
    const currentLikes =
      updatedComments[commentIndex].replies[replyIndex].likes;

    // Toggle the 'src' property for the specific reply
    if (updatedComments[commentIndex].replies[replyIndex].src === redheart) {
      updatedComments[commentIndex].replies[replyIndex].src = like;
      updatedComments[commentIndex].replies[replyIndex].likes =
        currentLikes - 1;
    } else {
      updatedComments[commentIndex].replies[replyIndex].src = redheart;
      updatedComments[commentIndex].replies[replyIndex].likes =
        currentLikes + 1;
    }

    setNewComment(updatedComments);
  };
  const handleViewReplies = (commentIndex) => {
    const updatedComments = [...comments];
    const selectedComment = updatedComments[commentIndex];

    // Toggle the 'showReplies' property for the selected comment
    selectedComment.showReplies = !selectedComment.showReplies;

    setNewComment(updatedComments);
  };

  const calculateTimeAgo = (commentDate) => {
    const currentDate = new Date();
    const commentDateTime = new Date(commentDate);
    const timeDifference = currentDate - commentDateTime;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return days + " d";
    } else if (hours > 0) {
      return hours + " h";
    } else if (minutes > 0) {
      return minutes + " m";
    } else {
      return seconds + " s";
    }
  };

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const addEmoji = (emojiObject) => {
    let sym = emojiObject.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setNewComment(newComment + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "70%",
            left: "50%",
            height: "62%",
            bottom: "0",
            textAlign: "center",
            overflow: "auto",
            transform: "translate(-50%, -50%)",
            width: "28.5rem",
            bgcolor: "#F5F5F4",
            border: "2px solid #000",
            p: 2,
            borderRadius: "10px",
          }}
        >
          <img
            src={xicon}
            alt=""
            style={{ float: "right", cursor: "pointer" }}
            onClick={handleClose}
          />
          <h2 id="modal-modal-title">
            {" "}
            {comments.length} <span>Comments</span>{" "}
          </h2>
          {comments.map((comment, index) => (
            <Box key={index} mb={2} borderBottom="1px solid #ccc">
              <Box display="flex" alignItems="end" className="justify-between">
                <div className="justify-between flex">
                  <img
                    src={Picture}
                    alt="User Photo"
                    width={30}
                    height={30}
                    style={{ borderRadius: "50%", marginRight: "8px" }}
                  />
                  <Typography variant="body1" style={{ color: "#86878B" }}>
                    martini_rond
                  </Typography>
                </div>
                <IconButton onClick={() => handleLikeComment(index)}>
                  <img
                    src={comment.src === redheart ? redheart : like}
                    alt=""
                  />
                </IconButton>
              </Box>

              <Box
                display="flex"
                alignItems="end"
                className="justify-between mt-1 ml-7"
              >
                <div className="justify-between flex">
                  <Typography
                    variant="body2"
                    style={{
                      fontSize: "17",
                      fontWeight: "600",
                      color: "#011627",
                    }}
                    color="text.secondary"
                    mb={1}
                  >
                    {comment.comment}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" ml={2}>
                    {calculateTimeAgo(comment.date)}
                  </Typography>
                </div>
                <Typography variant="body2" color="text.secondary">
                  {comment.likes}
                </Typography>
              </Box>
              <Box
                display="flex"
                alignItems="end"
                className="justify-between ml-5"
              >
                {/* <Button size="small" style={{ color: "#86878B" }}
                                onClick={() => handleViewReplies(index)}>
                                View Replies({comment.replies.length})
                            </Button> */}

                {/* View Replies button */}
                {comment.replies.length > 0 && (
                  <Button
                    size="small"
                    style={{ color: "#86878B" }}
                    onClick={() => handleViewReplies(index)}
                  >
                    {comment.showReplies
                      ? "Hide Replies"
                      : `View ${comment.replies.length} Replies`}
                  </Button>
                )}

                {/* Display replies if 'showReplies' is true */}
                {comment.showReplies && (
                  <Box>
                    {comment.replies.map((reply, replyIndex) => (
                      <div key={replyIndex}>
                        <Box
                          display="flex"
                          alignItems="end"
                          className="justify-between"
                        >
                          <div className="justify-between flex">
                            <img
                              src={Picture}
                              alt="User Photo"
                              width={30}
                              height={30}
                              style={{
                                borderRadius: "50%",
                                marginRight: "8px",
                              }}
                            />
                            <Typography
                              variant="body1"
                              style={{ color: "#86878B" }}
                            >
                              martini_rond
                            </Typography>
                          </div>
                          <IconButton
                            onClick={() => handleLikeReply(index, replyIndex)}
                          >
                            <img
                              src={reply.src === redheart ? redheart : like}
                              alt=""
                            />
                          </IconButton>
                        </Box>
                        <Box
                          display="flex"
                          alignItems="end"
                          className="justify-between mt-1 ml-7"
                        >
                          <div className="justify-between flex">
                            <Typography
                              variant="body2"
                              style={{
                                fontSize: "17",
                                fontWeight: "600",
                                color: "#011627",
                              }}
                              color="text.secondary"
                              mb={1}
                            >
                              {reply.comment}
                            </Typography>

                            <Typography
                              variant="body2"
                              color="text.secondary"
                              ml={2}
                            >
                              {calculateTimeAgo(reply.date)}
                            </Typography>
                          </div>
                          <Typography variant="body2" color="text.secondary">
                            {reply.likes}
                          </Typography>
                        </Box>
                      </div>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          ))}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              padding: "8px",
              borderRadius: "4px",
            }}
          >
            <img
              src={ASign}
              alt="Calendar Icon"
              width={20}
              height={20}
              style={{ marginRight: "8px" }}
            />

            {/* show Emoji */}
            <img
              src={Emoji}
              alt="Heart Icon"
              width={20}
              height={20}
              style={{ marginRight: "8px" }}
              onClick={() => setShowEmojiPicker((val) => !val)}
            />

            <input
              type="text"
              style={{
                flex: 1,
                outline: "none",
                border: "none",
                overflow: "auto",
                whiteSpace: "pre-wrap",
                textAlign: "left",
              }}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a new comment..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAddComment();
                }
              }}
            />

            {showEmojiPicker && (
              <Picker
                onEmojiClick={addEmoji}
                style={{
                  height: "398px",
                  width: "300px",
                  position: "absolute",
                  bottom: "0px",
                  left: "55px",
                }}
              />
            )}
          </div>

          {/* <Button className="mt-3 " onClick={handleAddComment} variant="contained" color="primary">
                    <img src={send} alt="Heart Icon" width={20} height={20} />
                </Button> */}
        </Box>
      </Modal>

      <style>
        {`
                   @media (max-width: 555px) {
                    .MuiBox-root {
                          width: 24.5rem!important;
                        overflow-x: hidden;
                }
              `}
      </style>
    </>
  );
};

export default CommentModal;
