import React from "react";
import CreateSubComment from "../createSubComment/CreateSubComment";
// import CreateSubComment from "../ui/createSubComment/createSubComment";

function UpdateComment({ value, data, setEdit, subComment, ref }) {
  return (
    <div ref={ref}>
      <CreateSubComment
        // ref={ref}

        setIsWriting={setEdit}
        value={value}
        dataComment={data}
        setEdit={setEdit}
        subComment={subComment}
      />
    </div>
  );
}

export default UpdateComment;
