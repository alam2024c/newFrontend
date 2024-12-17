/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import ContentRequests from "./ContentRequests copy/ContentRequests";
import Job from "./ContentRequests/Job";
import Pageheader from "./Pageheader";
import { useEffect, useState } from "react";
import JobAdvertisement from "./JobAdvertisement/JobAdvertisement";

function Jobs() {
  const page = window.location.pathname.split("/")[1];
  const [activeJobs, setActiveJobs] = useState(
    page == "job"
      ? "job"
      : page == "job-advertisement"
      ? "Request Service as company"
      : "Request Service as individual"
  );
  useEffect(() => {
    setActiveJobs(
      page == "job"
        ? "job"
        : page == "job-advertisement"
        ? "Request Service as company"
        : "Request Service as individual"
    );
  }, [page]);
  const navigate = useNavigate();
  return (
    <div className="jobs max-w-4xl m-auto">
      <div className="flex pb-2 text-center justify-around mb-3">
        <Pageheader
          onClick={() => {
            setActiveJobs("Request Service as individual");
            navigate("/Content");
          }}
          activeType={activeJobs}
          button="Request Service as individual"
        />

        <Pageheader
          onClick={() => {
            setActiveJobs("Request Service as company");

            navigate("/job-advertisement");
          }}
          activeType={activeJobs}
          button="Request Service as company"
        />
        <Pageheader
          onClick={() => {
            setActiveJobs("job");

            navigate("/job");
          }}
          activeType={activeJobs}
          button="job"
        />
      </div>
      {page == "job" ? (
        <Job />
      ) : page == "job-advertisement" ? (
        <JobAdvertisement />
      ) : (
        <ContentRequests />
      )}
    </div>
  );
}

export default Jobs;
