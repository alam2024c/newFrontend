import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import formatText from "../singlePost/formatText";
import { useTranslation } from "react-i18next";

function TextPost({ text, mention }) {
  const [showFullText, setShowFullText] = useState(false);
  const [formattedText, setFormattedText] = useState("");
  const navigate = useNavigate();
  // console.log("text", text);
  useEffect(() => {
    if (text) {
      setFormattedText(formatText(text, showFullText, navigate, mention));
    }
  }, [text, showFullText, navigate]);

  const handleToggleText = () => {
    setShowFullText((prevShowFullText) => !prevShowFullText);
  };
  const [t] = useTranslation();
  return (
    <div>
      {formattedText && (
        <div>
          <div style={{ marginTop: "", whiteSpace: "pre-wrap" }}>
            {formattedText}
          </div>
          {text.length > 200 && (
            <button
              onClick={handleToggleText}
              className="text-primary mb-2"
              style={{ color: "blue" }}
            >
              {showFullText ? t("show less") : t("show more")}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default TextPost;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import formatText from "../singlePost/formatText";
// import { useTranslation } from "react-i18next";

// function TextPost({ text, mention, isSharedPost = false }) {
//   const [showFullText, setShowFullText] = useState(false);
//   const [formattedText, setFormattedText] = useState("");
//   const navigate = useNavigate();
//   const [t] = useTranslation();

//   useEffect(() => {
//     if (text) {
//       setFormattedText(formatText(text, showFullText, navigate, mention));
//     }
//   }, [text, showFullText, navigate]);

//   const handleToggleText = () => {
//     setShowFullText((prevShowFullText) => !prevShowFullText);
//   };

//   return (
//     <div>
//       {/* Only render the formattedText if it's not a shared post */}
//       {!isSharedPost && formattedText && (
//         <div>
//           <div style={{ marginTop: "", whiteSpace: "pre-wrap" }}>
//             {formattedText}
//           </div>
//           {text.length > 200 && (
//             <button
//               onClick={handleToggleText}
//               className="text-primary mb-2"
//               style={{ color: "blue" }}
//             >
//               {showFullText ? t("show less") : t("show more")}
//             </button>
//           )}
//         </div>
//       )}

//       {/* Render the content for the shared post */}
//       {isSharedPost && (
//         <div>
//           {/* Shared post content can be displayed here */}
//           {/* <p>Details of the shared post...</p> */}
//         </div>
//       )}
//     </div>
//   );
// }

// export default TextPost;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import formatText from "../singlePost/formatText";
// import { useTranslation } from "react-i18next";
// // import AudioPlayer from "../components/AudioPlayer"; // Example for handling media

// function TextPost({ text, mention, sharedPost }) {
//   const [showFullText, setShowFullText] = useState(false);
//   const [formattedText, setFormattedText] = useState("");
//   const navigate = useNavigate();
//   const [t] = useTranslation();

//   useEffect(() => {
//     if (text) {
//       setFormattedText(formatText(text, showFullText, navigate, mention));
//     }
//   }, [text, showFullText, navigate]);

//   const handleToggleText = () => {
//     setShowFullText((prevShowFullText) => !prevShowFullText);
//   };

//   return (
//     <div>
//       {/* Main post content */}
//       {formattedText && !sharedPost && (
//         <div>
//           <div style={{ marginTop: "", whiteSpace: "pre-wrap" }}>
//             {formattedText}
//           </div>
//           {text.length > 200 && (
//             <button
//               onClick={handleToggleText}
//               className="text-primary mb-2"
//               style={{ color: "blue" }}
//             >
//               {showFullText ? t("show less") : t("show more")}
//             </button>
//           )}
//         </div>
//       )}

//       {/* Shared post content */}
//       {sharedPost && (
//         <div className="shared-post">
//           {/* Render the shared post text */}
//           {sharedPost.text && (
//             <div style={{ whiteSpace: "pre-wrap" }}>
//               {formatText(sharedPost.text, false, navigate, sharedPost.mention)}
//             </div>
//           )}

//           {/* Handle other shared post media (e.g., audio, images, etc.) */}
//           {/* {sharedPost.audio && (
//             <AudioPlayer src={`${URL}/storage/${sharedPost.audio}`} />
//           )}
//            */}
//           {/* You can add other shared content types here (e.g., images, videos) */}
//         </div>
//       )}
//     </div>
//   );
// }

// export default TextPost;
