import { t } from "i18next";
import React from "react";
import { CiBoxList } from "react-icons/ci";
import { MdSlowMotionVideo } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function PlayListBox({ playlist }) {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const navigate = useNavigate();

  return (
    <div
      className="container mx-auto p-4"
      onClick={() => navigate(`/one-course/${playlist.id}`)}
    >
      {/* <h1 className="text-2xl font-bold mb-4">Playlists</h1> */}
      <div className="flex flex-col gap-4">
        <div
          className="flex border rounded-lg overflow-hidden shadow-lg w-full"
          style={{ position: "relative" }}
        >
          <div className="relative w-1/3 h-full cursor-pointer">
            <img
              src={`${URL}/storage/${playlist.image}`}
              alt={playlist.title}
              className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-75"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
              <span className="text-white text-lg font-semibold d-flex align-items-center justify-content-center gap-2">
                <MdSlowMotionVideo /> {t("Open Playlist")}
              </span>
            </div>
          </div>
          <div className="number__video bg-black bg-opacity-75 d-flex align-items-center justify-content-center gap-2">
            <CiBoxList className="text-2xl" />
            {playlist?.count_videos}
          </div>
          <div className="p-4 w-2/3">
            <h2 className="text-lg font-semibold">{playlist.name}</h2>
            <p className="text-gray-600">{playlist.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayListBox;
