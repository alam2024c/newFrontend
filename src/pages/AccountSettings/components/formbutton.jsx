// eslint-disable-next-line react/prop-types
import { useTranslation } from "react-i18next";

export default function FormButton() {

    const [t] = useTranslation();

    return (

        <div className="col-12" style={{ textAlign: "right" }}>
            <button
                className=" text-center mt-5 border-0 text-white font-xsss fw-500 p-2 w175 d-inline-block"
                style={{ borderRadius: "10px", marginLeft: "35em", backgroundColor: "#0099AB" }} >
                {t("save")}
            </button>
        </div>





    );
}




