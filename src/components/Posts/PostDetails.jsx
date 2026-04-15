import React, { useContext, useEffect, useState } from "react";
import { ReviewContext } from "../../Context/reviewContext";
import { useNavigate, useParams } from "react-router-dom";
import reviewService from "../../service/appwrite/reviewService";
import profileService from "../../service/appwrite/profileService";
import { Query } from "appwrite";
import parse from "html-react-parser";
const PostDetails = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const { userData } = useContext(ReviewContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  const isAuthor = post?.userId === userData?.$id;

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        if (!slug) {
          navigate("/");
          return;
        }
        const data = await reviewService.getReview(slug);
        if (data) setPost(data);
        else navigate("/");
      } catch (err) {
        console.error(err);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!post) return;
        const data = await profileService.getProfiles([
          Query.equal("userId", post?.userId),
        ]);
        if (data?.documents?.length > 0) setProfile(data.documents[0]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [post]);

  const deletePost = async () => {
    try {
      const isDeleted = await reviewService.deleteReview(slug);
      if (isDeleted) {
        if (post?.imageId) await reviewService.delImage(post.imageId);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-7 h-7 border-2 border-[#e8e6e1] border-t-[#0891B2] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-sm text-[#999] hover:text-[#111] transition-colors mb-8 cursor-pointer bg-transparent border-none"
      >
        ← Back to Home
      </button>

      <h1 className="text-2xl font-bold text-[#333333] leading-snug mb-5">
        {post?.title}
      </h1>

      {/* Byline */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#e8e6e1]">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate(`/profile/${post.userId}`)}
        >
          {profile?.avatarId ? (
            <img
              src={profileService.getImage(profile.avatarId)}
              className="w-8 h-8 rounded-full object-cover"
              alt={post?.username}
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#0891B2] text-white text-xs font-medium flex items-center justify-center">
              {post?.username?.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-[#111]">{post?.username}</p>
          </div>
        </div>

        {isAuthor && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/edit-post/${post.$id}`)}
              className="text-xs px-3 py-1.5 border border-[#ddd] text-[#666] rounded-lg hover:border-[#0891B2] hover:text-[#0891B2] transition-colors cursor-pointer bg-transparent"
            >
              Edit
            </button>
            <button
              onClick={deletePost}
              className="text-xs px-3 py-1.5 border border-[#ddd] text-[#666] rounded-lg hover:border-red-400 hover:text-red-500 transition-colors cursor-pointer bg-transparent"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Cover Image */}
      {post?.imageId && (
        <div className="w-full h-72 rounded-2xl overflow-hidden mb-8 bg-[#f0ede8]">
          <img
            className="w-full h-full object-cover"
            src={reviewService.getImage(post.imageId)}
            alt={post?.title}
          />
        </div>
      )}

      {/* Body */}
      <div className="space-y-5">
        {post?.description && (
          <p className="text-lg font-semibold text-[#444] leading-relaxed ">
            {post.description}
          </p>
        )}
        {post?.review && (
          <div className="prose max-w-none text-[#666] leading-loose">
            {parse(post.review)}
          </div>
        )}
      </div>
      <div className="flex justify-between mt-2  ">
        <span className="text-xs text-[#999]">
          Created:{" "}
          {new Date(post.$createdAt).toLocaleDateString("en-IN", {
            timeZone: "Asia/Kolkata",
            day: "numeric",
            month: "short",
            year: "2-digit",
          })}
        </span>
        <span className="text-xs text-[#999]">
          Updated:{" "}
          {new Date(post.$updatedAt).toLocaleDateString("en-IN", {
            timeZone: "Asia/Kolkata",
            day: "numeric",
            month: "short",
            year: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

export default PostDetails;
