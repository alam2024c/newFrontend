import "./staticSection.scss";
import { circle } from "../../../../assets/images";

export default function StaticSection({ sectionText }) {
  return (
    <div className="staticSection  lg:grid hidden">
      <div className="staticSection__images">
        <img className="circle" src={circle} alt="" />
        <div className="image"></div>
      </div>

      <div className="staticSection__text text-center">
        <h3 className="action__header   text-black 1260:text-cyan-600	 ">{sectionText}</h3>

      </div>
    </div>
  );
}
