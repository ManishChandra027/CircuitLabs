import React from "react";
import ProfileCard from "../components/profile/ProfileCard";
import ReviewCard from "../components/Posts/PostCard";
import Home from "./home";

const Profile = () => {
  return (
    <div>
      <div className="flex justify-center">
        <ProfileCard />
      </div>
      {/* <Home/> */}
    </div>
  );
};

export default Profile;
