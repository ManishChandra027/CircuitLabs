import React from "react";
import reviewService from "../../service/appwrite/reviewService";
import { Link } from "react-router-dom";

const PostCard = ({ postData }) => {
  return (
    <Link to={`/post/${postData.$id}`}>
      <div className="bg-[#141414] border border-[#1e1e1e] rounded-xl overflow-hidden hover:border-[#333] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
        {/* Image */}
        <div className="w-full h-44 overflow-hidden bg-[#1a1a1a]">
          <img
            className="w-full h-full object-cover"
            src={postData.imageId ? reviewService.getImage(postData.imageId) : "/fallback.jpg"}
            alt={postData.title}
          />
        </div>

        {/* Content */}
        <div className="p-3.5">
          <h2 className="text-sm font-medium text-[#ddd] leading-snug line-clamp-2 mb-3">
            {postData.title}
          </h2>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#555]">By {postData.username}</span>
            <span className="text-xs text-[#2a7a4a] font-medium">● Published</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;