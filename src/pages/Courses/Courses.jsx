import { useNavigate } from "react-router-dom";

import { useState } from "react";
import Job from "../Jobs/ContentRequests/Job";
import Pageheader from "../Jobs/Pageheader";
import MyCourses from "./MyCourses/MyCourses";
import AllCourses from "./AllCourses/AllCourses";

function Courses() {
  const page = window.location.pathname.split("/")[1];
  const [activeJobs, setActiveJobs] = useState(
    page == "courses-all" ? "Courses" : page == "my-courses" && "My Courses"
  );

  const navigate = useNavigate();
  return (
    <div className="jobs max-w-4xl m-auto">
      <div className="flex pb-2 text-center justify-around mb-3">
        <Pageheader
          onClick={() => {
            setActiveJobs("Courses");
            navigate("/courses-all");
          }}
          activeType={activeJobs}
          button="Courses"
        />

        <Pageheader
          onClick={() => {
            setActiveJobs("My Courses");

            navigate("/my-courses");
          }}
          activeType={activeJobs}
          button="My Courses"
        />
      </div>
      {page == "courses-all" ? <AllCourses /> : <MyCourses />}
    </div>
  );
}

export default Courses;
