import { useState } from "react";
import "./FiltersBar.scss";
import { useTranslation } from "react-i18next";

function FiltersBar() {
  const data = [
    "All",
    "medical",
    "agricultural",
    "religious",
    "geometric",
    "scientific",
    "Asked assistant",
  ];

  const [t] = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const handleFilterClick = (index) => {
    setSelectedFilter(index);
    setShowAll(false);
  };

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="filtersList">
      <h4>
        {t("Filters")}
        <span onClick={handleShowAll}>
          {showAll ? t("Show less") : t("Show All")}
        </span>
      </h4>
      <ul className={showAll ? "showAll" : ""}>
        {data.map((name, index) => (
          <li
            key={index}
            className={selectedFilter === index ? "chosen" : ""}
            onClick={() => handleFilterClick(index)}
          >
            {t(name)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FiltersBar;
