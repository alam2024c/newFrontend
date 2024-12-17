import React, { useState } from "react";
import FormSelect from "../../components/formSelect/FormSelect";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { getUser } from "../../rtk/Api/Api";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui";

function UpdateInfo() {
  const [t] = useTranslation();
  const [formValues, setFormValues] = useState({});
  const [formValues2, setFormValues2] = useState({});
  const { token, user } = useSelector((state) => state.auth);

  const inputsSelect = [
    {
      name: t("First name"),
      type: "text",
      class: "half",
      state: "first_name",
      value: `${user?.first_name}`,
    },
    {
      name: t("Last name"),
      type: "text",
      class: "half",
      state: "last_name",
      value: user?.last_name,
    },
    {
      name: t("Email address"),
      type: "email",
      class: "",
      state: "email",
      value: user?.email,
    },
    {
      name: t("Phone"),
      type: "phone",
      class: "",
      state: "phone",
      value: user?.phone,
    },
    {
      name: t("About You"),
      type: "textarea",
      class: "",
      state: "bio",
      value: user?.profile?.bio,
    },
    {
      name: `${t("Account Privacy")} (${t(user?.profile?.privacy)})`,
      type: "select",
      select: ["public", "private"],
      state: "privacy",
    },
  ];
  const typeUser = [
    {
      name: t("User Type"),
      type: "select",
      select: [t("User Type"), t("Regular user"), t("Service provider")],
      state: "service_provider",
    },
  ];

  const dispatch = useDispatch();

  //upload text
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const handleButtonClick = async () => {
    if (!formValues?.first_name) {
      formValues.first_name = user?.first_name;
    }
    if (!formValues?.last_name) {
      formValues.last_name = user?.last_name;
    }
    if (!formValues?.email) {
      formValues.email = user?.email;
    }
    //  if (!formValues?.first_name) {
    //    formValues.fName = user?.fName;
    //  }
    console.log(formValues);
    try {
      const res = await axios.post(
        `${URL}/api/profile/updateInformation`,
        formValues,

        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);

      if (res.status == 201) {
        await getUser(token, dispatch);
        toast.success(t("Updated Successfully"));
      }
    } catch (err) {
      console.log(err, "err");
      if (err?.response?.data?.error) {
        toast.error(err?.response?.data?.error?.phone[0]);
      }
      toast.error(t("Maximum 255 characters in CV"));

      console.log(err);
    }
  };
  const navigate = useNavigate();
  const handleSubmit = async () => {
    // setLoading(true);
    console.log(formValues2);

    let data = {
      email: user?.email,
    };
    if (
      formValues2?.service_provider == "مستخدم عادي" ||
      formValues2?.service_provider == "Regular user"
    ) {
      data.service_provider = 0;
    } else {
      data.service_provider = 1;
    }
    console.log(data);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(`${URL}/api/service_provider`, data, config);
      console.log(res);
      //  navigate("/login");
      if (res.data.data == 1) {
        // setStep(4);
        // navigate("/language");
        navigate("/provider-profile");
      } else {
        toast.success("Updated");
        getUser(token, dispatch);
        // dispatch(loginStart(res.data));
      }
      // setLoading(false);
      // return res.data;
    } catch (error) {
      // return custom error message from backend if present
      // setLoading(false);
      console.log(error, "error");
      toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <div className="updateInfo">
      <div className="inputSelect">
        <FormSelect
          inputs={inputsSelect}
          name={t("Save modifications")}
          setFormValues={setFormValues}
        />
        <Button
          children={t("Save modifications")}
          onClick={handleButtonClick}
        />
      </div>
    </div>
  );
}

export default UpdateInfo;
