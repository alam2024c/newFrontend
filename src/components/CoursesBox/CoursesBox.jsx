import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown } from "../ui";
import { edit, trash } from "../../assets/images/icons";
import { dots } from "../../assets/icons";
import { useSelector } from "react-redux";
import { MdOutlineSlowMotionVideo } from "react-icons/md";

function CoursesBox({ post, index }) {
  const { user } = useSelector((state) => state.auth);

  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const navigate = useNavigate();
  const params = useParams().id;
  const idCourse = useParams().idCourse;
  const dropdownDataMe = [
    { name: "delete post", image: trash, value: "delete" },
    { name: "edit post", image: edit, value: "edit" },
  ];
  return (
    <div
      style={{ position: "relative" }}
      className={`border rounded-lg overflow-hidden shadow-lg  ${
        idCourse == post?.id ? "bg-gray-300 bg-opacity-50" : ""
      }`}
    >
      {" "}
      <div onClick={() => navigate(`/one-course/${params}/${post.id}`)}>
        <div style={{ position: "relative" }}>
          <img
            src={`${URL}/storage/${post.image}`}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
          <div className="video__img bg-gray-300 bg-opacity-25">
            <MdOutlineSlowMotionVideo className="text-6xl text-black" />
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold">{post.title}</h2>
          <p className="text-gray-600">{post.desc.slice(0, 100)} .... </p>
        </div>

        <span className="number__course">{index + 1}</span>
      </div>
    </div>
  );
}

export default CoursesBox;
