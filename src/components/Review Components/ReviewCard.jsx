import { useEffect, useState } from "react";
import reviewService from "../../service/appwrite/reviewService";
import { Link } from "react-router-dom";

const ReviewCard = ({ postData }) => {
// console.log(postData)
  return (
    <Link to={`/post/${postData.$id}`}>
      <div className="max-w-3xl w-full bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200">
        <div className="w-full h-40 overflow-hidden">
          <img
            src={
              postData.imageId
                ? reviewService.getImage(postData.imageId)
                : "/fallback.jpg"
            }
            alt={postData.title}
          />
        </div>

        <div className="p-3 flex gap-5">
          <h2 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">
            {postData.title}
          </h2>
          <span className="inline-block mt-2 text-xs text-green-600 font-medium">
            Published
          </span>
          <span className="inline-block mt-2 text-xs text-red-600 font-medium">
            <span className="text-black">By: </span>{postData.username}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ReviewCard;
