/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React from "react";
import Box from "@mui/material/Box";
import { BiArrowBack, BiEdit } from "react-icons/bi";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Selector from "./components/selector";
import Form from "./components/form";
import FormButton from "./components/formbutton";
import { Button } from "../../components/ui";

export default function AccountSettings({ acountSettings }) {

  const [t] = useTranslation();
  const [value, setValue] = React.useState(
    acountSettings === "acountSettings" ? 0 : 1
  );
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [editProfile, setEditProfile] = useState(false);

  return (
    <div style={{ padding: "1rem" }}>
      <Box sx={{ width: "100%", paddingLeft: "1rem", paddingRight: "1rem" }}>
        {acountSettings == "acountSettings" ? (
          <>
            {editProfile == "editProfile" ? (
              <div value={value} index={0}>
                <div
                  className="card shadow-xs"
                  style={{
                    width: "100%",
                    border: "0",
                    backgroundColor: "#fff",
                    padding: "0",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div
                    className="card-body"
                    style={{
                      padding: "0.5rem 1.5rem",
                      width: "100%",
                      border: "0",
                    }}
                  >
                    <div className="row d-block">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                          gap: "0.5rem",
                          marginBottom: "1.5rem",
                          flex: " 0 0 auto",
                          width: "100%",
                        }}
                      >
                        <BiArrowBack
                          style={{
                            transform: "rotate(180deg)",
                            color: "black",
                            fontWeight: "bolder",
                            fontSize: "25px",
                          }}
                          onClick={() => setEditProfile(false)}
                        />
                      </div>

                      <Form
                        label={t("First name")}
                        type={"text"}
                        style={{ marginBottom: "1rem", flex: "0 0 auto" }}
                      />

                      <Form label={t("Last name")} type={"text"} />
                    </div>

                    <div className="row mb-3 d-block">
                      <Form
                        label={t("Email")}
                        type={"text"}
                        value={"ebrahim"}
                        style={{ marginRight: "20px" }}
                      />

                      <Form
                        label={t("phone")}
                        type={"text"}
                        value={"0101909115"}
                      />

                      <FormButton />
                    </div>
                  </div>
                </div>
              </div>
            ) : editProfile == "editPass" ? (
              <div value={value} index={0}>
                <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                  <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                    <div className="row d-block">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                          gap: "0.5rem",
                          marginBottom: "1.5rem",
                          flex: " 0 0 auto",
                          width: "100%",
                        }}
                      >
                        <BiArrowBack
                          style={{
                            transform: "rotate(180deg)",
                            color: "black",
                            fontWeight: "bolder",
                            fontSize: "25px",
                          }}
                          onClick={() => setEditProfile(false)}
                        />
                      </div>

                      <Form
                        label={t("Old Password")}
                        type={"password"}
                        value={"0101909115"}
                        style={{ marginRight: "20px" }}
                      />
                      <Form
                        label={t("New Password")}
                        type={"password"}
                        value={""}
                        style={{ marginRight: "20px" }}
                      />
                      <Form
                        label={t("Confirm Password")}
                        type={"password"}
                        value={""}
                      />
                    </div>
                    <div className="row mb-3 d-block">
                      <FormButton />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // other
              <div value={value} index={0}>
                <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                  <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                    <div className="row d-block">
                      <div
                        className="col-12 d-flex align-items-center cursor-pointer gap-2 mb-4"
                        onClick={() => setEditProfile("editProfile")}
                      >
                        <h3 className="font-lg fw-bolder">
                          {t("Editprofile")}
                        </h3>

                        <BiEdit
                          style={{ color: "black" }}
                          className="font-lg fw-bolder"
                        />
                      </div>

                      <Form
                        label={t("First name")}
                        type={"text"}
                        value={"ebrahim"}
                        disabled
                      />
                      <Form
                        label={t("Last name")}
                        type={"text"}
                        value={"ebrahim"}
                        disabled
                      />
                    </div>
                    <div className="row mb-3 d-block">
                      <Form
                        label={t("Email")}
                        type={"text"}
                        value={"ebrahim"}
                        style={{ marginRight: "20px" }}
                        disabled
                      />

                      <Form
                        label={t("phone")}
                        type={"text"}
                        value={"0101909115"}
                        disabled
                      />
                    </div>
                    <div className="row d-block">
                      <div
                        className="col-12 d-flex align-items-center cursor-pointer gap-2  "
                        onClick={() => setEditProfile("editPass")}
                      >
                        <h3 className={`font-lg fw-bolder  `}>
                          {t("EditPassword")}
                        </h3>
                        <BiEdit
                          style={{ color: "black" }}
                          className={`font-lg fw-bolder  `}
                        />
                      </div>

                      <Form
                        label={t("Old Password")}
                        type={"password"}
                        value={"123654789"}
                        style={{ marginRight: "20px" }}
                        disabled
                      />

                      <Form
                        label={t("New Password")}
                        type={"password"}
                        value={""}
                        style={{ marginRight: "20px" }}
                        disabled
                      />

                      <Form
                        label={t("Confirm Password")}
                        type={"password"}
                        value={""}
                        disabled
                      />
                    </div>
                    <FormButton />
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          // Accountprivacy
          <div value={value} index={1}>
            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
              <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                <div className="row d-block">
                  <Selector
                    label={t("Account privacy")}
                    option1={t("Genaral")}
                    option2={t("friends only")}
                    option3={t("just me")}
                  />

                  <Selector
                    label={t("Who can download my content")}
                    option1={t("Anyone")}
                    option2={t("friends only")}
                    option3={t("just me")}
                  />
                </div>

                <div className="row mb-3 d-block">
                  <Selector
                    label={t("Who can see your followers")}
                    option1={t("Anyone")}
                    option2={t("friends only")}
                    option3={t("just me")}
                  />

                  {/* <FormButton /> */}
                  <div className="flex justify-end">
                    <Button className="px-12" children={"save"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Box>
    </div>
  );
}
