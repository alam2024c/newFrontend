import React from "react";

function formatText(text, showFullText, navigate, mention) {
  if (!text) return null;

  const visibleText = showFullText
    ? text
    : text?.slice(0, 200) + (text?.length > 200 ? " ..." : "");

  return visibleText.split("\n").map((line, lineIndex) => (
    <div key={lineIndex}>
      {line.split(" ").map((word, wordIndex) => {
        const isWordTooLong = word.length > 10;
        const isLink = word.toLowerCase().startsWith("http");
        const isHashTag = word.startsWith("#");
        const isMentioned = mention && mention.includes(word.trim());

        return (
          <span
            key={`${lineIndex}-${wordIndex}`}
            className={
              isLink || isHashTag || isMentioned
                ? "blue cursor-pointer mention-tag"
                : "inherit cursor-pointer"
            }
            onClick={() => {
              if (isLink) {
                window.open(word, "_blank");
              } else if (isHashTag) {
                navigate(`/singlePostTag/${word.slice(1)}`);
              } else if (isMentioned) {
                navigate(`/profile/${word}`);
              }
            }}
            style={{ wordBreak: isWordTooLong ? "break-all" : "normal" }}
          >
            {word + " "}
          </span>
        );
      })}
    </div>
  ));
}

export default formatText;
