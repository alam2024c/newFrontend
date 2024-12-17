import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SlideshowLightbox } from "lightbox.js-react";
import "lightbox.js-react/dist/index.css";
import "./Gallery.scss";

export default function Gallery({ data, target }) {
  const navigate = useNavigate();
  const params = useParams();
  const [isInSinglePostPath, setIsInSinglePostPath] = useState(false);

  const handelClick = () => {
    navigate(`/singlePost/${target.id}`);
  };

  useEffect(() => {
    setIsInSinglePostPath(
      params.id && window.location.pathname.includes("/singlePost")
    );
  }, [params.id]);

  const URL = import.meta.env.VITE_REACT_APP_API_KEY;

  return (
    <>
      {isInSinglePostPath ? (
        <>
          <div className="grid gap-4 rounded-xl">
            {data.map((image, index) => (
              <img
                // key={index + 1}
                className="w-100 rounded-xl"
                src={`${URL}/storage/${image?.image?.path || image.path}`}
                alt=""
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div
            className={`gallery ${data?.length > 4 && "multi"} with${
              data.length
            }`}
          >
            {data?.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className={`image imageNo${index + 1} `}
                onClick={handelClick}
              >
                <img
                  src={`${URL}/storage/${
                    image?.image?.path || image.path || image?.image
                  }`}
                  alt=""
                />

                {data.length > 4 && (
                  <>
                    {index === 3 && (
                      <p
                        onClick={handelClick}
                        className="gallery__indicator bg-gray-100 bg-opacity-50"
                      >
                        +{+data.length - 4}
                      </p>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
