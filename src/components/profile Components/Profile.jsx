import React, { useContext, useEffect, useState } from "react";
import profileService from "../../service/appwrite/profileService";
import { useNavigate, useParams } from "react-router-dom";
import { Query  } from "appwrite";
import { ReviewContext } from "../../Context/reviewContext";

const Profile = () => {
  const {slug}=useParams(); 
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const {userData}=useContext(ReviewContext);
  const isAuthor = userData && slug?userData?.$id==slug:false;
//   const isAuthor = true;
useEffect(() => {
    profileService.getProfiles([ Query.equal('userId',slug)]).then((data) => {
        if (data) {
            setPost(data.documents[0]);
            
        }
    });
},[slug]);


  return (
    <div className="max-w-xs w-full m-10 bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className=" w-full h-60 overflow-hidden ">
        <img className="w-full"
          src={
            post?.avatarId
              ? profileService.getImage(post?.avatarId)
              : "/fallback.jpg"
          }
          alt={post?.username}
        />
      </div>

      <div className="p-3">
        <h2 className="text-lg font-semibold text-gray-800 leading-snug line-clamp-2">
          {post?.username}
        </h2>
        <p className="text-sm  text-gray-800 leading-snug line-clamp-2">
          {post?.bio}
        </p>
        <div className="flex justify-between">
          {isAuthor && (
            <span className="flex justify-between gap-6">
              <button
                className="cursor-pointer"
                onClick={() => {
                  navigate(`/edit-profile/${post.$id}`);
                }}
              >
                edit
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
