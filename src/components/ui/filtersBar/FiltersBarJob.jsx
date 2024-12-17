import { useEffect, useRef, useState } from "react";
import { Button, Modal, Select } from "..";
import { filter } from "../../../assets/images/icons";
import { t } from "i18next";
import axios from "axios";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function FiltersBarJob({ filters, width, setFilterCategory }) {
  const [filteringBy, setFilteringBy] = useState("All");
  const [t, i18n] = useTranslation();

  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const { token, deletePost_id, update } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const res = await axios.get(`${URL}/api/post/get_job_category`, {
        headers: {
          Accept: "multipart/form-data",
          Authorization: `Bearer ${token}`,
          "Accept-Language": i18n.language,
        },
      });
      setData(res.data.data);
      console.log(res, "catego");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [i18n.language]);
  
  const containerRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleMouseDown = (event) => {
    setIsMouseDown(true);
    setStartX(event.clientX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (event) => {
    if (!isMouseDown) return;
    event.preventDefault();
    const x = event.clientX - containerRef.current.offsetLeft;
    const scrollX = x - startX;
    containerRef.current.scrollLeft = scrollLeft - scrollX;
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // added by abdallah 11/6/2024
 // إلغاء تفعيل السحب عند الإفلات خارج العنصر
 useEffect(() => {
   
  const handleMouseUpOutside = () => {
    if (isMouseDown) setIsMouseDown(false);
  };

  window.addEventListener("mouseup", handleMouseUpOutside);
  window.addEventListener("mouseleave", handleMouseUpOutside);

  return () => {
    window.removeEventListener("mouseup", handleMouseUpOutside);
    window.removeEventListener("mouseleave", handleMouseUpOutside);
  };
}, [isMouseDown]);



  return (
    <>
      <nav
        // className={`hidden md:flex gap-2 overflow-x-scroll no-scrollbar ${
          className={`hidden md:flex gap-2 overflow-x-scroll  ${

          width ? width : "md:max-w-4xl"
        }`}
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {data?.length > 0 && (
          <Button
            children={t("all")}
            className="w-fit whitespace-nowrap capitalize"
            isReverse={"all" !== filteringBy}
            onClick={() => {
              console.log(filter.id, "filter.id");
              setFilteringBy("all");
              setFilterCategory("all");
            }}
          />
        )}
        {data.map((filter, index) => (
          <Button
            key={index}
            children={t(filter.name)}
            className="w-fit whitespace-nowrap capitalize"
            isReverse={filter.id !== filteringBy}
            onClick={() => {
              console.log(filter.id, "filter.id");
              setFilteringBy(filter.id);
              setFilterCategory(filter.id);
            }}
          />
        ))}
      </nav>

      <nav className="md:hidden flex justify-between items-center w-full px-4">
        <div className="flex justify-center items-center gap-4">
          {/* <p className="text-black">
            {t("Sort by")}
            {" : "}
          </p> */}

          {/* <Select
            className="gap-4 bg-white p-0 capitalize font-black text-[#0099A8]"
            selectLabels={[t("new")]}
            preSelect
          /> */}
        </div>

        <div className="flex justify-center items-center">
          <button
            className="flex font-black justify-center items-center"
            onClick={openModal}
          >
            <p>{t("Filters")}</p>

            <img src={filter} alt="" />
          </button>

          <Modal
            isOpen={isOpen}
            closeModal={closeModal}
            title="Filters"
            children={
              <div className="grid grid-cols-2 gap-4">
                {data?.length > 0 && (
                  <Button
                    children={t("all")}
                    className="w-full truncate capitalize"
                    isReverse={"all" !== filteringBy}
                    onClick={() => {
                      console.log(filter.id, "filter.id");
                      setFilteringBy("all");
                      setFilterCategory("all");
                      closeModal();
                    }}
                  />
                )}
                {data.map((filter, index) => (
                  <Button
                    key={index}
                    children={t(filter.name)}
                    className="w-full truncate capitalize"
                    isReverse={filter.id !== filteringBy}
                    onClick={() => {
                      console.log(filter.id, "filter.id");
                      setFilteringBy(filter.id);
                      setFilterCategory(filter.id);

                      closeModal();
                    }}
                    // children={t(filter)}
                    // className="w-full truncate capitalize"
                    // isReverse={filter !== filteringBy}
                    // onClick={() => {
                    //   setFilteringBy(filter.id);
                    //   setFilterCategory(filter.id);
                    //   closeModal();
                    // }}
                  />
                ))}
              </div>
            }
          />
        </div>
      </nav>
    </>
  );
}
