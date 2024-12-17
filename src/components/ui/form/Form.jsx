import { useState, Fragment, useRef, useEffect } from "react";
import { Button, Input, Modal, Select, Textarea } from "../";
import { person } from "../../../assets/images/icons";
import FormSelect from "../../formSelect/FormSelect";
import { useDispatch, useSelector } from "react-redux";
import img1 from "../../../assets/images/Group 513551.png";
import img2 from "../../../assets/images/Rectangle 4765.png";
import img3 from "../../../assets/images/Rectangle 4766.png";
import img4 from "../../../assets/images/Rectangle 4764.png";
import img5 from "../../../assets/images/WhatsApp Image 2024-05-10 at 16.40.48_a800645a.jpg";
import img6 from "../../../assets/images/WhatsApp Image 2024-05-10 at 16.40.48_bf05465a.jpg";
import {
  addUpload,
  finishUpload,
  setPercentage,
} from "../../../rtk/slices/progressSlice";
import { refrechPosts } from "../../../rtk/slices/authSlice";
import { toast } from "react-toastify";
import axios from "axios";
import SelectCategory from "../SelectCategory/SelectCategory";
import { FaCheck } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

export default function Form({
  categoriesSorted,
  selectedCategory,
  setSelectedCategory,
  forms,
  filters,
  setIsFormsOpen,
  isFormsOpen,
  setHasCategory,
  post,
}) {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  function openCategoryModal() {
    setHasCategory(true);
  }
  const [t, i18n] = useTranslation();

  const { token, user } = useSelector((state) => state.auth);
  const [categor_id, setcategor_id] = useState(post?.category_id);
  const [text, setText] = useState(post?.post_research?.authors);
  const [return_metion, setreturn_metion] = useState(
    post?.post_research?.return
  );
  const [mention, setMention] = useState(post?.post_research?.mention || []);
  let api = post ? `update/${post.id}` : `create`;
  const [color, setColor] = useState(4);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState({});
  const [classification_id, setclassification_id] = useState({});
  const [privacy, setPrivacy] = useState(
    user?.profile?.privacy == "private"
      ? user.profile.privacy
      : post?.privacy || "public"
  );
  const selectedForm = forms.find((form) => form.formName === selectedCategory);
  const inputs = selectedForm ? selectedForm.formFields : [];
  const [error, setError] = useState("");
  const [errorForm, setErrorForm] = useState("");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setclassification_id(category);

    setFormData({});
  };
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    if (categor_id) {
      setError("");
      setLoading(true);
      const data = { ...selectedValue, categor_id };
      // data.append("privacy", privacy);
      // data.append("category_id", categor_id);
      const formData = new FormData();
      for (const key in selectedValue) {
        formData.append(key, selectedValue[key]);
      }
      formData.append("privacy", privacy);
      formData.append("color", color);
      if (selectedValue.file) {
        for (let i = 0; i < selectedValue.file.length; i++) {
          formData.append("file[]", selectedValue.file[i]);
        }
        // formData.append("file[]", selectedValue.file);
      }
      formData.append("category_id", categor_id);
      if (selectedCategory == "Add News") {
        formData.append("classification_id", 9);
        data.classification_id = 9;
      } else if (selectedCategory == "Suggest Cooperation") {
        formData.append("classification_id", 21);
      } else if (selectedCategory == "Document Check up") {
        formData.append("classification_id", 12);
      } else if (selectedCategory == "Scientific Research Summary") {
        formData.append("classification_id", 6);
        formData.append("authors", text);
        formData.append("return", return_metion);
        for (let i = 0; i < mention.length; i++) {
          formData.append("mention[]", mention[i].display);
        }
      } else if (selectedCategory == "Add Science Experiment") {
        formData.append("classification_id", 22);
      } else if (selectedCategory == "Request for Volunteers or Trainees") {
        formData.append("classification_id", 16);
      } else if (selectedCategory == "Scholarship Announcement") {
        formData.append("classification_id", 27);
      } else if (selectedCategory == "Project Funding") {
        formData.append("classification_id", 28);
      } else if (selectedCategory == "Announcing Course") {
        formData.append("classification_id", 13);
      } else if (selectedCategory == "Donations") {
        formData.append("classification_id", 29);
      } else if (selectedCategory == "Request for a Scientific Service") {
        formData.append("classification_id", 26);
      } else if (selectedCategory == "Code Inquiry") {
        formData.append("classification_id", 15);
      } else if (selectedCategory == "Suggest Collaboration") {
        formData.append("classification_id", 21);
      } else if (selectedCategory == "Add Essay") {
        formData.append("classification_id", 30);
      } else if (selectedCategory == "Add Congratulations") {
        formData.append("classification_id", 11);
      } else if (selectedCategory == "Summary of Book, Novel or Film") {
        formData.append("classification_id", 20);
      } else if (selectedCategory == "Add Short Story") {
        formData.append("classification_id", 10);
      } else if (selectedCategory == "Offer Commercial Product") {
        formData.append("classification_id", 14);
      } else if (selectedCategory == "Announcing for an Event") {
        formData.append("classification_id", 24);
      } else if (selectedCategory == "Official Announcement") {
        formData.append("classification_id", 31);
      } else if (selectedCategory == "Request for Quotation") {
        formData.append("classification_id", 32);
      } else if (selectedCategory == "Researcher Story") {
        formData.append("classification_id", 17);
      } else if (selectedCategory == "Questionnaire") {
        formData.append("classification_id", 33);
      }
      // setIsFormsOpen(false);

      const fileId = Date.now();
      dispatch(addUpload({ fileId }));
      try {
        const res = await axios.post(
          `${URL}/api/post/${api}`,
          formData,

          {
            headers: {
              Accept: "multipart/form-data",
              Authorization: `Bearer ${token}`,
              "Accept-Language": i18n.language,
            },
            onUploadProgress: (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              dispatch(setPercentage({ fileId, progress }));
            },
          }
        );
        setLoading(false);

        if (res.data) {
          dispatch(refrechPosts(res.data.post));
          dispatch(finishUpload({ fileId }));
          setIsFormsOpen(false);
          toast.success("تم نشر المنشور");
          setErrorForm({});
          setFormData({});
          setSelectedValue({});
        }
      } catch (err) {
        setLoading(false);
        setErrorForm(err?.response?.data?.error);
        dispatch(finishUpload({ fileId }));
        // toast.error(t("A network error occurred"));
        // setIsFormsOpen(false);
        setFormData({});
        // setSelectedValue({});
      }
    } else {
      setError(t("The type of post must be selected first"));
    }
  };
  function closeFormsModal() {
    setIsFormsOpen(false);
  }

  const selectRef = useRef(null);
  const errorRef = useRef(null);

  useEffect(() => {
    if (errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [error]);

  return (
    <>
      {/* the forms modal */}
      <Modal
        isOpen={isFormsOpen}
        closeModal={closeFormsModal}
        backFunc={() => {
          openCategoryModal();
          closeFormsModal();
        }}
        title={t(selectedCategory)}
        children={
          <>
            <form
              onSubmit={handleClick}
              className=" block lg:grid  gap-4 my-2"
              id="buttonshare"
            >
              {/* // to change the category */}
              <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-start">
                <div className="flex gap-2 items-center">
                  <img
                    className="w-12 h-12 rounded-full"
                    style={{ transform: "rotate(0deg)" }}
                    src={
                      user?.profile?.image
                        ? `${URL}/storage/${user?.profile?.image}`
                        : person
                    }
                    alt=""
                  />
                  <p>{user.first_name}</p>
                </div>
                <Select
                  bg={"bg-white"}
                  className="h-11 sm:w-44 gap-2 w-fit rounded-full border-2 border-[#0099AB] text-[#0099AB]"
                  selectLabels={["public", "private"]}
                  preSelect={privacy ? privacy : ""}
                  handleSelectChange={(value) => setPrivacy(value)}
                />

                {/* <Select
                  bg={"bg-white"}
                  className="h-11 w-44 rounded-full border-2 border-[#0099AB] text-[#0099AB]"
                  selectLabels={[t("Public"), t("privet")]}
                  preSelect={true}
                /> */}
              </div>

              {!post && (
                <>
                  {categoriesSorted && (
                    <Select
                      className="w-full rounded-lg capitalize"
                      selectLabels={categoriesSorted}
                      selectedValue={selectedCategory}
                      selectName={t("post type")}
                      handleSelectChange={handleCategoryChange}
                      preSelect={
                        selectedCategory ? selectedCategory : t("post type")
                      }
                    />
                  )}
                </>
              )}
              <SelectCategory
                errorRef={errorRef}
                className="w-full rounded-lg capitalize"
                // selectLabels={items}
                selectName="category"
                preSelect={post?.category ? post?.category : "Select Category"}
                handleSelectChange={(value) => {
                  setcategor_id(value);
                }}
                // preSelect={true}
              />
              {error && (
                <span className="text-red" style={{ color: "red" }}>
                  {error}
                </span>
              )}
              {/* <Select
                className="w-full rounded-lg capitalize"
                selectLabels={filters}
                selectName={t("category")}
                handleSelectChange={handleSelectChange}
                preSelect={true}
              /> */}
              {selectedCategory == "Scientific Research Summary" && (
                <>
                  <label>{t("Authors")}</label>
                  <Textarea
                    height="h-[50dvh] sm:h-20"
                    bg="bg-white"
                    width="w-full sm:w-96"
                    value={text}
                    setText={setText}
                    setreturn_metion={setreturn_metion}
                    return_metion={return_metion}
                    setMention={setMention}
                    border="true"
                  />
                </>
              )}
              <FormSelect
                inputs={inputs}
                error={errorForm}
                //   name={t("Save modifications")}
                setFormValues={setSelectedValue}
                formValues={selectedValue}
                required={!post && true}
                post={
                  post?.post_news ||
                  post?.post_suggest ||
                  post?.post_document ||
                  post?.post_research ||
                  post?.post_expirment ||
                  post?.post_researcher_story ||
                  post?.post_trainer ||
                  post?.post_scholarship ||
                  post?.post_project ||
                  post?.post_course ||
                  post?.post_service ||
                  post?.post_donation ||
                  post?.post_code ||
                  post?.post_essay ||
                  post?.post_book ||
                  post?.post_story ||
                  post?.post_official ||
                  post?.post_congratulation ||
                  post?.post_product ||
                  post?.post_quotation ||
                  post?.post_questionnaire ||
                  post?.post_event ||
                  post?.post_document
                }
              />
              {selectedCategory == "Add Congratulations" && (
                <>
                  <ul className="congratulations">
                    <li
                      className={color == 1 && "active"}
                      onClick={() => setColor(1)}
                    >
                      <img src={img1} alt="" />
                      <FaCheck />
                    </li>
                    <li
                      onClick={() => setColor(2)}
                      className={color == 2 && "active"}
                    >
                      <img src={img2} alt="" />
                      <FaCheck />
                    </li>{" "}
                    <li
                      onClick={() => setColor(3)}
                      className={color == 3 && "active"}
                    >
                      <img src={img3} alt="" />
                      <FaCheck />
                    </li>{" "}
                    <li
                      onClick={() => setColor(4)}
                      className={color == 4 && "active"}
                    >
                      <img src={img4} alt="" />
                      <FaCheck />
                    </li>
                    <li
                      onClick={() => setColor(5)}
                      className={color == 5 && "active"}
                    >
                      <img src={img5} alt="" />
                      <FaCheck />
                    </li>
                    <li
                      onClick={() => setColor(6)}
                      className={color == 6 && "active"}
                    >
                      <img src={img6} alt="" />
                      <FaCheck />
                    </li>
                  </ul>
                </>
              )}

              <div className="flex justify-end">
                <Button
                  loading={loading}
                  className="w-fit"
                  children={t("Post")}
                  // onClick={handleClick}
                />
              </div>
            </form>
            {/* <Form
              forms={forms}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categoriesSorted={categoriesSorted}
              filters={filters}
            /> */}
          </>
        }
      />
    </>
  );
}
