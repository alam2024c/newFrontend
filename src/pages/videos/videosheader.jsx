/* eslint-disable react/prop-types */
import Pageheader from "../Jobs/pageheader";
import { useState } from "react";
import Videopost from "./components/videopost";
import ReelsPage from "../reels/reelsPage/ReelsPage";

function Videos() {

    const [activeJobs, setActiveJobs] = useState("Videos");

    return (
        <div className="jobs">
            <div className="box typeArticleAndSearches d-flex justify-content-around mx-3 mb-4">
                <Pageheader
                    onClick={() => setActiveJobs("Videos")}
                    activeType={activeJobs}
                    button="Videos"

                />

                <Pageheader
                    onClick={() => setActiveJobs("Reels")}
                    activeType={activeJobs}
                    button="Reels"
                />
            </div>


            {activeJobs === "Videos" ? <Videopost /> : <ReelsPage />}
        </div>
    );
}

export default Videos;