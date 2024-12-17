import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { GiSkills, GiTargetPrize } from "react-icons/gi";
import Accordion from "@mui/material/pAccordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";

import { BsBook, BsCameraVideo } from "react-icons/bs";

import { IoMdPhotos } from "react-icons/io";
import { RiCloseCircleLine } from "react-icons/ri";
import { RiMenuAddLine } from "react-icons/ri";
import { GrCircleInformation } from "react-icons/gr";
import { styled, alpha } from "@mui/material/styles";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
function Support() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const themeColor = localStorage.getItem("themeColor");

  const [t, i18n] = useTranslation();
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div className="pt-5 m-auto h-100 p-3">
      <h3 className={`font-xxl fw-bolder text-current mb-5`}>
        {t("support")}{" "}
      </h3>
      <div className="mb-5">
        <h3 className={`font-xl fw-bolder text-current mb-3`}>
          {t("common questions")}{" "}
        </h3>
        <Accordion
          className="card"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <div className="d-flex align-items-center">
              <BsCameraVideo className="feather-lock text-grey-500 ms-3 font-lg " />
              <h4 className="fw-700 text-grey-900 mb-0 font-xssss mt-0">
                {t("demonstrationVideo")}{" "}
              </h4>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="card"
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <div className="d-flex align-items-center">
              <BsCameraVideo className="feather-lock text-grey-500 ms-3 font-lg " />
              <h4 className="fw-700 text-grey-900 mb-0 font-xssss mt-0">
                {t("demonstrationVideo")}{" "}
              </h4>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="card"
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <div className="d-flex align-items-center">
              <BsCameraVideo className="feather-lock text-grey-500 ms-3 font-lg " />
              <h4 className="fw-700 text-grey-900 mb-0 font-xssss mt-0">
                {t("demonstrationVideo")}{" "}
              </h4>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="card"
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <div className="d-flex align-items-center">
              <BsCameraVideo className="feather-lock text-grey-500 ms-3 font-lg " />
              <h4 className="fw-700 text-grey-900 mb-0 font-xssss mt-0">
                {t("demonstrationVideo")}{" "}
              </h4>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="card"
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <div className="d-flex align-items-center">
              <BsCameraVideo className="feather-lock text-grey-500 ms-3 font-lg " />
              <h4 className="fw-700 text-grey-900 mb-0 font-xssss mt-0">
                {t("demonstrationVideo")}{" "}
              </h4>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="card"
          expanded={expanded === "panel6"}
          onChange={handleChange("panel6")}
        >
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <div className="d-flex align-items-center">
              <BsCameraVideo className="feather-lock text-grey-500 ms-3 font-lg " />
              <h4 className="fw-700 text-grey-900 mb-0 font-xssss mt-0">
                {t("demonstrationVideo")}{" "}
              </h4>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="card"
          expanded={expanded === "panel7"}
          onChange={handleChange("panel7")}
        >
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <div className="d-flex align-items-center">
              <BsCameraVideo className="feather-lock text-grey-500 ms-3 font-lg " />
              <h4 className="fw-700 text-grey-900 mb-0 font-xssss mt-0">
                {t("demonstrationVideo")}{" "}
              </h4>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="card"
          expanded={expanded === "panel8"}
          onChange={handleChange("panel8")}
        >
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <div className="d-flex align-items-center">
              <BsCameraVideo className="feather-lock text-grey-500 ms-3 font-lg " />
              <h4 className="fw-700 text-grey-900 mb-0 font-xssss mt-0">
                {t("demonstrationVideo")}{" "}
              </h4>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="">
        <h3 className={`font-xl fw-bolder text-current mb-3`}>
          {t("Support correspondent")}{" "}
        </h3>
        <div className={`col-lg-12 mb-3 ${themeColor}`}>
          <label className="mont-font fw-600 font-xsss">
            {" "}
            {t("Problem details")}
          </label>
          <textarea
            className="form-control mb-0 p-3 h100  lh-16"
            rows={5}
            // placeholder="Write your message..."
            spellCheck="false"
            defaultValue={""}
          />
        </div>
        <div className="row">
          <div className="col-lg-12">
            <a
              href="#"
              className={`${themeColor} bg-current text-center text-white font-xsss fw-600 p-3 w-100 rounded-3 d-inline-block`}
            >
              {t("send")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
