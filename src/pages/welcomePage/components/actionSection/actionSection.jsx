import { t } from "i18next";
import { Button } from "../../../../components/ui";
import Slider from "../slider/Slider";
import "./actionSection.scss";
import { useNavigate } from "react-router-dom";

export default function ActionSection({ pickLogin, pickRegister }) {
  const data = [
    "https://placehold.co/153x256/0099ab/e2e2ea?text=01",
    "https://placehold.co/153x256/0099ab/e2e2ea?text=02",
    "https://placehold.co/153x256/0099ab/e2e2ea?text=03",
    "https://placehold.co/153x256/0099ab/e2e2ea?text=04",
    "https://placehold.co/153x256/0099ab/e2e2ea?text=05",
    "https://placehold.co/153x256/0099ab/e2e2ea?text=06",
    "https://placehold.co/153x256/0099ab/e2e2ea?text=07",
    "https://placehold.co/153x256/0099ab/e2e2ea?text=08",
    "https://placehold.co/153x256/0099ab/e2e2ea?text=09",
    "https://placehold.co/153x256/0099ab/e2e2ea?text=10",
  ];
  const navigate = useNavigate();

  return (
    <section className="action">
      <h3 className="action__header">{t("Sign up now for free and interact with fellow researchers !")}</h3>

      <Slider data={data} />

      <div className="action__buttonsGroup">
        <div className="d-flex flex-wrap w-100">
          <Button
            className="notcolor"
            children={t("Register")}
            width={"buttonsection"}
            onClick={() => navigate("/register")}
          />
          <Button
            className="notcolor"
            color="#0099ab"
            width={"buttonsection"}
            backgroundColor="#e2e3ea"
            children={t("Log in")}
            onClick={() => navigate("/login")}
          />
        </div>

        <Button
          className="homeButton"
          backgroundColor="#233142"
          onClick={() => navigate("/home")}
        >
          <p>
            {t("Fast Browsing")}
            <span className="rightArrowIcon">{">>"}</span>
          </p>
        </Button>
      </div>
    </section>
  );
}
