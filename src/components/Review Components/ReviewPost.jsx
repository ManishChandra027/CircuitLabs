import React, { useContext, useEffect, useState } from "react";
import { ReviewContext } from "../../Context/reviewContext";
import { useNavigate, useParams } from "react-router-dom";
import reviewService from "../../service/appwrite/reviewService";

const ReviewPost = () => {
  const [post, setPost] = useState({});
  const { slug } = useParams();
  const { userData } = useContext(ReviewContext);
  const navigate = useNavigate();

  const isAuthor = post && userData ? post?.userId === userData?.$id : false;

  useEffect(() => {
    if (slug) {
      reviewService.getReview(slug).then((data) => {
        if (data) {
          setPost(data);
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = async () => {
    const isDeleted = await reviewService.deleteReview(slug);

    if (isDeleted) {
      const file = await reviewService.delImage(post.imageId);
      if (file) {
      }
      navigate("/");
    }
  };

  return (
    <div className="max-w-3xl w-full bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="w-full h-40 overflow-hidden">
        <img
          src={
            post.imageId
              ? reviewService.getImage(post?.imageId)
              : "/fallback.jpg"
          }
          alt={post?.title}
        />
      </div>

      <div className="p-3">
        <h2 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">
          {post?.title}
        </h2>
        <div className="flex justify-between">
          <span className="inline-block mt-2 text-xs text-green-600 font-medium">
            Published
          </span>

          <span
            onClick={() => {
              navigate(`/my-profile/${post.userId}`);
            }}
            className="inline-block mt-2 text-xs text-red-600 font-medium cursor-pointer"
          >
            <span className="text-black ">By: </span>
            {post?.username}
          </span>

          {isAuthor && (
            <span className="flex justify-between gap-6">
              <button
                className="cursor-pointer"
                onClick={() => {
                  navigate(`/edit-post/${post.$id}`);
                }}
              >
                edit
              </button>
              <button onClick={deletePost} className="cursor-pointer">
                delete
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewPost;
