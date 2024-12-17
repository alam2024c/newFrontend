import React from "react";
import { PropagateLoader } from "react-spinners";

function Loading({ height = "100vh" }) {
  return (
    <div
      className=" d-flex align-items-center justify-contnet-center w-100  "
      style={{ height: height, justifyContent: "center" }}
    >
      <PropagateLoader color="#36d7b7" />
    </div>
  );
}

export default Loading;
