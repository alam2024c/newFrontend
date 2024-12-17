import "./staticSection.scss";
import { circle } from "../../../../assets/images";

export default function StaticSection({ sectionText }) {
  return (
    <div className="staticSection">
      <div className="staticSection__images">
        <img className="circle" src={circle} alt="" />
        <div className="image"></div>
      </div>

      <div className="staticSection__text text-center">
        <h3 className="action__header text-white">{sectionText}</h3>
      </div>
    </div>
  );
}
