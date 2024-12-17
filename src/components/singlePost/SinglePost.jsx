import { user } from "/public/fakeData";
import {
  close1,
  edit,
  flags,
  person,
  pin,
  storage,
  trash,
} from "../../assets/images/icons";
import img1 from "../../assets/images/Group 513551.png";
import img2 from "../../assets/images/Rectangle 4765.png";
import img3 from "../../assets/images/Rectangle 4766.png";
// import img4 from "../../assets/images/Rectangle 4764.png";
import img5 from "../../assets/images/WhatsApp Image 2024-05-10 at 16.40.48_a800645a.jpg";
import img6 from "../../assets/images/WhatsApp Image 2024-05-10 at 16.40.48_bf05465a.jpg";
import { Gallery, InteractionBar, PostDetails } from "../";
import { useEffect, useRef, useState } from "react";
import { AudioPlayer, Dropdown } from "../ui";
import VideoPlayer from "../ui/videoPlayer/VideoPlayer";
import { useSelector } from "react-redux";
import Files from "../Files/Files";
import PostHeader from "../PostHeader/PostHeader";
import AllPosts from "./AllPosts/AllPosts";
import PostDetailsNews from "../postDetails/PostDetailsNews";
import PostSuggest from "../postDetails/PostSuggest";
import PostDocument from "../postDetails/PostDocument";
import PostTrain from "../postDetails/PostTrain";
import PostExpirment from "../postDetails/PostExpirment";
import PostScholarship from "../postDetails/PostScholarship";
import PostProject from "../postDetails/PostProject";
import PostCourse from "../postDetails/PostCourse";
import PostResearch from "../postDetails/PostResearch";
import PostService from "../postDetails/PostService";
import PostDonations from "../postDetails/PostDonations";
import PostCode from "../postDetails/PostCode";
import PostEssay from "../postDetails/PostEssay";
import PostBook from "../postDetails/PostBook";
import PostCongratulations from "../postDetails/PostCongratulations";
import PostsStory from "../postDetails/PostsStory";
import PostProduct from "../postDetails/PostProduct";
import PostEvent from "../postDetails/PostEvent";
import PostOfficial from "../postDetails/PostOfficial";
import PostQoutation from "../postDetails/PostQoutation";
import PostResearcherStory from "../postDetails/PostResearcherStory";
import PostQuestionnaire from "../postDetails/PostQuestionnaire";
import FilesAnother from "../Files/FilesAnother";
// import { t } from "i18next";
import TextPost from "../PostHeader/TextPost";
import { useTranslation } from "react-i18next";
import FilesAnotherMaulti from "../Files/FilesAnotherMaulti";

export default function SinglePost({
  data,
  isFullScreen = false,
  closeModal,
  notPar,
}) {
  const [hasCategory, setHasCategory] = useState(false);

  const dropdownData = [
    { name: "delete post", image: trash },
    { name: "edit post", image: edit },
    { name: "report post", image: flags },
  ];
  const [t] = useTranslation();
  useEffect(() => {
    setHasCategory(data.post_category);
  }, [data]);

  const [playingVideo, setPlayingVideo] = useState(null);
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        setIsVisible(entry.isIntersecting);
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5, // Adjust the threshold as needed
    });

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [videoRef]);

  useEffect(() => {
    const handleScroll = () => {
      if (playingVideo) {
        playingVideo.pause();
        setPlayingVideo(null);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [playingVideo]);

  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const { user } = useSelector((state) => state.auth);
  const [textWithLineBreak, setTextWithLineBreak] = useState("");

  useEffect(() => {
    // فصل النص إلى كلمات
    if (data?.text) {
      const words = data?.text?.split(" ");

      // تحقق من طول كل كلمة وتطبيق line-break: anywhere إذا كانت أطول من الطول المحدد
      const formattedText = words.map((word, index) => {
        const isWordTooLong = word.length > 10; // قم بتحديد الطول الذي تريده
        return isWordTooLong ? (
          <span key={index} style={{ lineBreak: "anywhere" }}>
            {word}{" "}
          </span>
        ) : (
          `${word} `
        );
      });

      setTextWithLineBreak(formattedText);
    }
  }, [data?.text]);

  console.log("zsdfghjkl",data?.post_share)
  return (
    <div
    // update by abd 10/7/2024
      // style={
      //   data?.post_congratulation?.color == "1"
      //     ? { backgroundImage: url("${img1}"), backgroundPosition: "center" }
      //     : data?.post_congratulation?.color == "2"
      //     ? { backgroundImage: url("${img2}"), backgroundPosition: "center" }
      //     : data?.post_congratulation?.color == "3"
      //     ? { backgroundImage: url("${img3}"), backgroundPosition: "center" }
      //     // : data?.post_congratulation?.color == "4"
      //     // ? { backgroundImage: url("${img4}"), backgroundPosition: "center" }
      //     : data?.post_congratulation?.color == "5"
      //     ? { backgroundImage: url("${img5}"), backgroundPosition: "center" }
      //     : data?.post_congratulation?.color == "6"
      //     ? { backgroundImage: url("${img6}"), backgroundPosition: "center" }
      //     : {}
      // }
      className="bg-blue-50 text-black  rounded-2xl px-4 shadow w-full 
      max-w-4xl"
  
    >
      {/* post header */}
      <PostHeader data={data} closeModal={closeModal} notPar={notPar} />

      <div className="w-100">
        <div className="mt-3">
          <TextPost text={data?.text} mention={data?.mention}  />
        </div>
        {data?.post_share && (
          <div className="p-2">
            <div
              className={`share-post bg-blue-50 text-black rounded-2xl px-4 shadow w-full ${
                isFullScreen ? "" : "max-w-4xl"
              }`}
              key={data.post_id}
            >
              {/* post header */}
              <PostHeader
                data={data?.post_share}
                closeModal={closeModal}
                notPar={notPar}
              />

              <div className="w-100">
                <div className="mt-3">
                  <TextPost text={data?.post_share.text} mention={data?.mention} />
                  {/* <TextPost text={data.text} mention={data.mention} sharedPost={data.post_share} /> */}


                </div>
                {data.post_share?.image?.length > 0 && (
                  <Gallery data={data.post_share?.image} target={data} />
                )}
                {data.post_share?.file?.length > 0 && (
                  <Files data={data.post_share?.file} target={data} />
                )}

                {/* <Gallery data={data.post_share?.post_data.post_share?.post_images} hasCategory={hasCategory} /> */}

                {/* handle the details post  */}
                {data?.classification_id != 1 &&
                data?.classification_id != 2 &&
                data?.classification_id != 3 &&
                data?.classification_id != 4 &&
                data?.classification_id != 8 &&
                data?.classification_id != 5 ? (
                  <div
                  className="gallery with1"
                  style={{ marginBottom: "-15px" }}
                >
                  <div className="image imageNo1">
                
                      <img
                        src={`${URL}/storage/${
                          data?.post_share?.post_news?.file ||
                          data.post_share?.post_news?.file ||
                          data?.post_share?.post_expirment?.file ||
                          data?.post_share?.post_course?.file ||
                          data?.post_share?.post_scholarship?.file ||
                          data?.post_share?.post_project?.file ||
                          data?.post_share?.post_trainer?.file ||
                          data?.post_share?.post_expirment?.file ||
                          data?.post_share?.post_service?.file ||
                          data?.post_share?.post_document?.file ||
                          data?.post_share?.post_research?.file ||
                          data?.post_share?.post_suggest?.file ||
                          data?.post_share?.post_service?.file ||
                          data?.post_share?.post_donation?.file ||
                          data?.post_share?.post_code?.file ||
                          data?.post_share?.post_essay?.file ||
                          data?.post_share?.post_expirment?.file
                        }`}
                        alt=""
                        style={{ maxHeight: "60vh" }}
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                {data?.post_share?.post_news ? (
                  <PostDetailsNews
                    data={data.post_share?.post_news}
                    category={data.post_share?.post_category}
                  />
                ) : data?.post_share?.post_document ? (
                  <PostDocument data={data?.post_share?.post_document} />
                ) : data?.post_share?.post_expirment ? (
                  <PostExpirment data={data?.post_share?.post_expirment} />
                ) : data?.post_share?.post_course ? (
                  <PostCourse data={data?.post_share?.post_course} />
                ) : data?.post_share?.post_scholarship ? (
                  <PostScholarship data={data?.post_share?.post_scholarship} />
                ) : data?.post_share?.post_research ? (
                  <PostResearch data={data?.post_share?.post_research} />
                ) : data?.post_share?.post_service ? (
                  <PostService data={data?.post_share?.post_service} />
                ) : data?.post_share?.post_donation ? (
                  <PostDonations data={data?.post_share?.post_donation} />
                ) : data?.post_share?.post_project ? (
                  <PostProject data={data?.post_share?.post_project} />
                ) : data?.post_share?.post_trainer ? (
                  <PostTrain data={data?.post_share?.post_trainer} />
                ) : (
                  data?.post_share?.post_suggest && (
                    <PostSuggest
                      data={data?.post_share?.post_suggest}
                      // category={data.post_category}
                    />
                  )
                )}

{data?.post_share?.audio && (
  <AudioPlayer
    data={`${URL}/storage/${data?.post_share?.audio}`}
    user={data}
  />
)}


                {/* handle the video post  */}
                {data?.post_share?.video && (
                  <VideoPlayer data={data?.post_share?.video} user={user} />
                )}

                {/* {data.post_data?.post_video && (
          <div onClick={handlePlayPause} className="px-4">
            <VideoPlayer
              ref={videoRef}
              data={data.post_data.post_video}
              playing={videoRef.current && !videoRef.current.paused}
              onPlay={() => {}}
              onPause={() => {}}
              // Pass any other necessary props
            />
          </div>
        )} */}

                {/* handle the link post  */}
                {data?.post_data?.post_link && (
                  <p>{data.post_data?.post_link}</p>
                )}

                {/* <InteractionBar data={data} /> */}
              </div>
            </div>
          </div>
        )}
        {data?.post_news && (
          <></>
          // <AllPosts data={data?.post_news} />
          // <div>
          //   <div>{data?.post_news?.file}</div>
          //   <div>{data?.post_news?.news_title}</div>
          // </div>
        )}
        {data.image?.length > 0 && <Gallery data={data.image} target={data} />}
        {data.file?.length > 0 && <Files data={data.file} target={data} />}

        {/* <Gallery data={data.post_data.post_images} hasCategory={hasCategory} /> */}

        {/* handle the details post  */}
        {data?.classification_id != 1 &&
        data?.classification_id != 2 &&
        data?.classification_id != 3 &&
        data?.classification_id != 4 &&
        data?.classification_id != 23 &&
        data?.classification_id != 25 &&
        data?.classification_id != 8 &&
        data?.classification_id != 5 ? (
          <>
            {data?.post_news?.file ||
            data.post_news?.file ||
            data?.post_expirment?.file ||
            data?.post_course?.file ||
            data?.post_scholarship?.file ||
            data?.post_project?.file ||
            data?.post_trainer?.file ||
            data?.post_expirment?.file ||
            data?.post_service?.file ||
            data?.post_document?.file ||
            data?.post_research?.file ||
            data?.post_suggest?.file ||
            data?.post_service?.file ||
            data?.post_donation?.file ||
            data?.post_code?.file ||
            data?.post_essay?.file ||
            data?.post_congratulation?.file ||
            data?.post_book?.file ||
            data?.post_story?.file ||
            data?.post_product?.file ||
            data?.post_event?.file ||
            data?.post_official?.file ||
            data?.post_quotation?.file ||
            data?.post_questionnaire?.file ||
            data?.post_researcher_story?.file ||
            data?.post_expirment?.file ? (
<div
  className="gallery p-md-4 px-0 mb-2 with1"
  style={{ marginBottom: "-15px" }}
>
  <div className="image imageNo1">

                  {data.type_file == "png" ||
                  data.type_file == "jpg" ||
                  data.type_file == "jpeg" ? (
                    <Gallery />
                  ) : (
                    // <img
                    //   src={`${URL}/storage/${
                    //     data?.post_news?.file ||
                    //     data.post_news?.file ||
                    //     data?.post_expirment?.file ||
                    //     data?.post_course?.file ||
                    //     data?.post_scholarship?.file ||
                    //     data?.post_project?.file ||
                    //     data?.post_trainer?.file ||
                    //     data?.post_expirment?.file ||
                    //     data?.post_service?.file ||
                    //     data?.post_document?.file ||
                    //     data?.post_research?.file ||
                    //     data?.post_suggest?.file ||
                    //     data?.post_service?.file ||
                    //     data?.post_donation?.file ||
                    //     data?.post_code?.file ||
                    //     data?.post_essay?.file ||
                    //     data?.post_congratulation?.file ||
                    //     data?.post_book?.file ||
                    //     data?.post_story?.file ||
                    //     data?.post_product?.file ||
                    //     data?.post_event?.file ||
                    //     data?.post_official?.file ||
                    //     data?.post_quotation?.file ||
                    //     data?.post_questionnaire?.file ||
                    //     data?.post_researcher_story?.file ||
                    //     data?.post_expirment?.file
                    //   }`}
                    //   style={{ maxHeight: "60vh" }}
                    // />
                    <FilesAnotherMaulti data={data?.pdfs} target={data} />
                  )}
                </div>
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>{data?.file_name}</>
        )}
        {data.classification_id == 23 || data.classification_id == 25 ? (
          <></>
        ) : (
          <div className="flex gap-2 items-center mt-4">
            <h3 className="font-black text-xl text-[#0099ab] d-flex align-items-center gap-3">
              {t("Category")} :
            </h3>
            <span> {t(data.category)}</span>
          </div>
        )}
        <div className="single__post">
          {data?.post_news ? (
            <PostDetailsNews
              data={data.post_news}
              category={data.post_category}
            />
          ) : data?.post_document ? (
            <PostDocument data={data.post_document} />
          ) : data?.post_expirment ? (
            <PostExpirment data={data.post_expirment} />
          ) : data?.post_course ? (
            <PostCourse data={data.post_course} />
          ) : data?.post_scholarship ? (
            <PostScholarship data={data.post_scholarship} />
          ) : data?.post_research ? (
            <PostResearch data={data.post_research} />
          ) : data?.post_service ? (
            <PostService data={data.post_service} />
          ) : data?.post_donation ? (
            <PostDonations data={data.post_donation} />
          ) : data?.post_project ? (
            <PostProject data={data.post_project} />
          ) : data?.post_trainer ? (
            <PostTrain data={data.post_trainer} />
          ) : data?.post_code ? (
            <PostCode data={data.post_code} />
          ) : data?.post_essay ? (
            <PostEssay data={data.post_essay} />
          ) : data?.post_book ? (
            <PostBook data={data.post_book} />
          ) : data?.post_congratulation ? (
            <PostCongratulations data={data.post_congratulation} />
          ) : data?.post_story ? (
            <PostsStory data={data.post_story} />
          ) : data?.post_product ? (
            <PostProduct data={data.post_product} />
          ) : data?.post_event ? (
            <PostEvent data={data.post_event} />
          ) : data?.post_official ? (
            <PostOfficial data={data.post_official} />
          ) : data?.post_quotation ? (
            <PostQoutation data={data.post_quotation} />
          ) : data?.post_researcher_story ? (
            <PostResearcherStory data={data.post_researcher_story} />
          ) : data?.post_questionnaire ? (
            <PostQuestionnaire data={data.post_questionnaire} />
          ) : (
            data?.post_suggest && (
              <PostSuggest
                data={data.post_suggest}
                // category={data.post_category}
              />
            )
          )}
        </div>
        {/* handle the audio post  */}
        {/* {data?.post_data?.post_audio?.length > 0 && (
          <AudioPlayer data={data.post_data?.post_audio} />
        )} */}
        {data?.audio && (
  <AudioPlayer data={`${URL}/storage/${data.audio}`} user={data} />
)}

        {/* handle the video post  */}
        {data?.video && <VideoPlayer data={data.video} user={user} />}

        {/* {data.post_data?.post_video && (
          <div onClick={handlePlayPause} className="px-4">
            <VideoPlayer
              ref={videoRef}
              data={data.post_data.post_video}
              playing={videoRef.current && !videoRef.current.paused}
              onPlay={() => {}}
              onPause={() => {}}
              // Pass any other necessary props
            />
          </div>
        )} */}

        {/* handle the link post  */}
        {data?.post_data?.post_link && <p>{data.post_data?.post_link}</p>}
        {!notPar && <InteractionBar data={data} />}

        {/* <InteractionBar data={data} /> */}
      </div>
    </div>
  );
}