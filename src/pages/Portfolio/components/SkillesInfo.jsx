import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useTranslation } from "react-i18next";

function SkillesInfo() {
  const [t] = useTranslation();
  const [editingIndex, setEditingIndex] = useState(-1);
  const [skills, setSkills] = useState([
    { name: "User Interface" },
    { name: "User Experience" },
    { name: "Web Design" },
    { name: "Product Design" },
    { name: "HTML" },
    { name: "CSS" },
  ]);

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleSave = () => {
    setEditingIndex(-1);
  };

  const handleSkillChange = (index, event) => {
    const newSkills = [...skills];
    newSkills[index].name = event.target.value;
    setSkills(newSkills);
  };

  return (
    <div>
      <div style={{ color: "#303030", padding: "20px" }}>
        <ul>
          {skills.map((skill, index) => (
            <>
              <li
                className="my-3 d-flex"
                style={{ justifyContent: "space-between" }}
                key={index}
              >

                {editingIndex === index ? (
                  <input style={{
                    width: "100%",
                    backgroundColor: "#f6f6f6"
                  }}
                    type="text"
                    value={skill.name}
                    onChange={(event) => handleSkillChange(index, event)}
                  />
                ) : (
                  skill.name
                )}
                <AiOutlineEdit
                  className="font-xxl"
                  style={{ color: "#0099ab", cursor: "pointer" }}
                  onClick={() => handleEdit(index)}
                />
              </li>
              <hr />
            </>
          ))}
        </ul>
        <div className="Skills">
          <span> &rarr; </span>
          {t("Show all")} {t("Skills")}
        </div>
      </div>
    </div>
  );
}

export default SkillesInfo;