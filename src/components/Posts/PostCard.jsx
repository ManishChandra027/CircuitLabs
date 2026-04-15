import React, { useEffect, useState } from "react";
import reviewService from "../../service/appwrite/reviewService";
import { Link } from "react-router-dom";
import profileService from "../../service/appwrite/profileService";
import { Query } from "appwrite";

const PostCard = ({ postData }) => {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!postData) return;
        const data = await profileService.getProfiles([
          Query.equal("userId", postData.userId),
        ]);
        if (!data || data.documents.length === 0)
          throw new Error("No profile found");
        setProfile(data.documents[0]);
      } catch (err) {
        console.error(err);
        // setError(err.message);
      }
    };
    fetchProfile();
    profileService;
  }, [postData]);

  return (
    <Link to={`/post/${postData.$id}`}>
      <div className="bg-white border border-[#e8e6e1] rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer">
        <div className="w-full h-44 overflow-hidden bg-[#f0ede8]">
          <img
            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
            src={
              postData.imageId
                ? reviewService.getImage(postData.imageId)
                : "/fallback.jpg"
            }
            alt={postData.title}
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-[#111] leading-snug line-clamp-2 mb-3">
            {postData.title}
          </h2>
          <p className="text-xs font-light line-clamp-2 text-[#333333cb] my-2 ">
            {postData.description}
          </p>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              {profile?.avatarId ? (
                <img
                  src={profileService.getImage(profile.avatarId)}
                  className="w-6 h-6 rounded-full object-cover"
                  alt={postData?.username}
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-[#0891B2] text-white text-[10px] font-medium flex items-center justify-center">
                  {postData.username?.charAt(0).toUpperCase()}
                </div>
              )}

              <span className="text-xs text-[#999]">{postData.username}</span>
            </div>
            <span className="text-xs text-[#999]">
              Updated:{" "}
              <spam>
                {new Date(postData.$updatedAt).toLocaleDateString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  day: "numeric",
                  month: "short",
                  year: "2-digit",
                })}
              </spam>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
