import { Link } from "react-router-dom";
import back from "../../../assets/images/back.png";
// eslint-disable-next-line react/prop-types
export default function UlList({ name, icon, page }) {
  return (
    <>
      <li
        className="truncate"
        style={{
          display: "block",
          backgroundColor: "#F2F2F2",
          borderRadius: "10px",
          marginRight: "0",
          paddingRight: "15px",
          paddingLeft: "20px",
          marginBottom: "20px",
          borderBottom: "1px solid #e1e1f0",
        }}
      >
        <Link
          to={page}
          style={{
            justifyContent: "space-between",
            display: "flex",
            paddingTop: "14px",
            alignItems: "center",
            paddingBottom: "11px",
          }}
          className=""
        >
          <div style={{ display: "flex" }}>
            <div className="" style={{ width: "45px", borderRadius: "45px" }}>
              <img
                src={icon}
                alt=""
                style={{ height: "38px" }}
                className="rounded-circle "
              />{" "}
            </div>
            <h4
              className=""
              style={{
                fontSize: "17px",
                marginTop: "0.5rem",
                fontWeight: "500",
                color: "#212529",
              }}
            >
              {/* {user ? user.first_name + " " : "user"}
        {user ? user.last_name : "user"} */}
              {name}
            </h4>
          </div>
          <img src={back} style={{ fontSize: "17px" }} alt="" />
        </Link>
      </li>
    </>
  );
}
