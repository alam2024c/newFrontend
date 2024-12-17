import { t } from "i18next";
import { image, person } from "../../assets/images/icons";
import Frame1 from "../../assets/images/Frame1.png";
import Frame2 from "../../assets/images/Frame2.png";
import Frame3 from "../../assets/images/Frame3.png";

import { Button, Textarea } from "../ui";
import { user } from "/public/fakeData";

export default function CreateComment() {
  return (
    <div
      className="gap-3"
      style={{ boxShadow: "0px 4px 8px 0px rgba(10, 58, 100, 0.15)" }}
    >
      <div className="flex">
        <img
          className="w-12 h-12 p-0 rounded-full"
          src={user.user_img ? user.user_img : person}
          alt=""
        />

        <h1
          style={{
            marginTop: "14px",
            fontSize: "18px",
            fontWeight: "600",
            color: "#000000",
          }}
        >
          John Doe
        </h1>
      </div>
      <div className="w-full">
        <Textarea
          bg="bg-white"
          height="h-14"
          placeholder={t("Add A comment") + "..."}
        />

        <div className="flex justify-between border-t-2 pt-5 pb-2 px-4">
          <div className="flex justify-between" style={{ width: "100px" }}>
            <button>
              <img src={Frame1} alt="" />{" "}
            </button>
            <button>
              <img src={Frame2} alt="" />{" "}
            </button>
            <button>
              <img src={Frame3} alt="" />{" "}
            </button>
          </div>
          <Button
            className="rounded"
            style={{
              backgroundColor: "#0099AB",
              color: "#fff",
              padding: "20px",
            }}
            children={"Comment"}
          />
        </div>
      </div>
    </div>
  );
}
