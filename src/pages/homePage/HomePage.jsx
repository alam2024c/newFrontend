import {
  Aside,
  ComplementaryAside,
  Navbar,
  Search,
  Posts,
  Videos,
} from "../../components";
import { posts } from "/public/fakeData";
import { useParams } from "react-router-dom";
import FriendsPage from "../FriendsPage/FriendsPage";
import Portfolio from "../Portfolio/Portfolio";
import Jobs from "../Jobs/Jobs";
import Contects from "../../components/Contects/Contects";
import PortfolioJob from "../../components/PortfolioJob/PortfolioJob";
import Settings from "../../components/Settings/Settings";
import Researches from "../Portfolio/components/researches";
import SkillesInfo from "../Portfolio/components/SkillesInfo";
import UserCV from "../Portfolio/components/cv";
import We from "../We/We";
import PolicyAndPrivacy from "../PolicyAndPrivacy/PolicyAndPrivacy";
import AccountSettings from "../AccountSettings/AccountSettings";

import { CategorizedPosts } from "/src/pages";
import { PrivacySettings } from "../../components/Settings/components";
import Notifcations from "../notifications/notifications";
import UpdateInfo from "../../components/updateInfo/UpdateInfo";
import ChangePassword from "../../changePassword/ChangePassword";
import Article from "../Article/Article";
import News from "../News/News";
import Summeries from "../Summeries/Summeries";
import { useState } from "react";
import Advertisement from "../../components/Advertisement/Advertisement";
import Courses from "../Courses/Courses";
import OneCourse from "../Courses/OneCourse/OneCourse";
import Tekpart from "../Tekpart/Tekpart";
// import Support from "../Support/Support";
// import { CategorizedPosts } from "../";  all these imports need to be fixed either this way or the one above

export default function HomePage({ setCount, count }) {
  const name = useParams().name;
  return (
    <div className="max-w-[1920px] m-auto">
      <Navbar setCount={setCount} count={count} />
      <section className="flex pages justify-between gap-2 lg:mx-3 p-1">
        <div className="hidden md:block">
          <Aside />
        </div>
        <main className="w-full">
          {name == "friends" ? (
            <FriendsPage activeTypeFriend={"allFriends"} />
          ) : name == "all-friends" ? (
            <FriendsPage activeTypeFriend={"suggestions"} />
          ) : name == "Followers" ? (
            <FriendsPage activeTypeFriend={"Followers"} />
          ) : name == "Following" ? (
            <FriendsPage activeTypeFriend={"Following"} />
          ) : name == "friend-request" ? (
            <FriendsPage activeTypeFriend={"request"} />
          ) : name == "profile" ? (
            <Portfolio />
          ) : name == "content-request" ? (
            <Jobs activeJobs={"content-request"} />
          ) : name == "Content" ? (
            <Jobs activeJobs="job" />
          ) : name == "courses-all" ? (
            <Courses activeJobs="all" />
          ) : name == "one-course" ? (
            <OneCourse activeJobs="all" />
          ) : name == "my-courses" ? (
            <Courses activeJobs="me" />
          ) : name == "job-advertisement" ? (
            <Jobs activeJobs="job-advertisement" />
          ) : name == "job" ? (
            <Jobs activeJobs="job" />
          ) : name == "contect" ? (
            <Contects />
          ) : name == "advertisement" ? (
            <Advertisement />
          ) : name == "portfolioJob" ? (
            <PortfolioJob />
          ) : name == "researches" ? (
            <Researches />
          ) : name == "skillesInfo" ? (
            <SkillesInfo />
          ) : name == "userCV" ? (
            <UserCV />
          ) : name == "videos" ? (
            <Videos data={posts} />
          ) : name == "singlePost" ? (
            <We />
          ) : name == "we" ? (
            <We />
          ) : name == "tekpart" ? (
            <Tekpart />
          ) : name == "accountSettings" ? (
            <>
              <PrivacySettings />
            </>
          ) : name == "policyAndPrivacy" ? (
            <PolicyAndPrivacy />
          ) : // )
          // :
          // name == "support" ? (
          //   <Support />
          name == "policyAndPrivacy" ? (
            <PolicyAndPrivacy />
          ) : name == "privacySettings" ? (
            <>
              <UpdateInfo />
              <ChangePassword />
            </>
          ) : name == "policyAndPrivacy" ? (
            <PolicyAndPrivacy />
          ) : name == "userCV" ? (
            <UserCV />
          ) : name == "userCV" ? (
            <UserCV />
          ) : name == "friends" ? (
            <FriendsPage />
          ) : name == "search" ? (
            <Search />
          ) : name == "categorized-Posts" ? (
            <CategorizedPosts data={posts} />
          ) : name == "articles" ? (
            <Article data={posts} />
          ) : name == "news" ? (
            <News data={posts} />
          ) : name == "summaries" ? (
            <Summeries data={posts} />
          ) : name == "notifcations" ? (
            <Notifcations setCount={setCount} count={count} />
          ) : (
            <Posts data={posts} />
          )}
        </main>
        <div className="hidden  b2-5xl">
          <ComplementaryAside />
        </div>
      </section>
    </div>
  );
}
