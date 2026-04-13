import React, { useContext, useEffect, useState } from "react";
import { ReviewContext } from "../../Context/reviewContext";
import { useNavigate, useParams } from "react-router-dom";
import reviewService from "../../service/appwrite/reviewService";
import profileService from "../../service/appwrite/profileService";
import { Query } from "appwrite";

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
        if (!slug) { navigate("/"); return; }
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
        const data = await profileService.getProfiles([Query.equal("userId", post?.userId)]);
        if (!data || data.documents.length === 0) throw new Error("No profile found");
        setProfile(data.documents[0]);
      } catch (err) {
        console.error(err);
        setError(err.message);
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
        <div className="w-7 h-7 border-2 border-[#2a2a2a] border-t-[#06B6D4] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10">

      {/* Back */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-sm text-[#555] hover:text-[#06B6D4] transition-colors mb-8 cursor-pointer bg-transparent border-none"
      >
        ← Back to Home
      </button>

      {/* Title */}
      <h1 className="text-2xl font-medium text-white leading-snug mb-5">
        {post?.title}
      </h1>

      {/* Byline */}
      <div className="flex items-center justify-between mb-7 pb-5 border-b border-[#1e1e1e]">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate(`/profile/${post.userId}`)}
        >
          {profile?.avatarId?(
                  <img
                    src={profileService.getImage(profile.avatarId)}
                    className="w-7 h-7 rounded-full object-cover"
                    alt={userData?.name}
                  />
                ):<div className="w-7 h-7 rounded-full bg-[#0891B2] text-black text-xs font-medium flex items-center justify-center">
            {post?.username?.charAt(0).toUpperCase()}
          </div>}
          
          <span className="text-sm text-[#888] hover:text-[#ccc] transition-colors">
            {post?.username}
          </span>
        </div>

        {isAuthor && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/edit-post/${post.$id}`)}
              className="text-xs px-3 py-1.5 border border-[#2a2a2a] text-[#888] rounded-lg hover:border-[#0891B2] hover:text-[#06B6D4] transition-colors cursor-pointer bg-transparent"
            >
              Edit
            </button>
            <button
              onClick={deletePost}
              className="text-xs px-3 py-1.5 border border-[#2a2a2a] text-[#888] rounded-lg hover:border-red-500 hover:text-red-400 transition-colors cursor-pointer bg-transparent"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Cover Image */}
      {post?.imageId && (
        <div className="w-full h-72 rounded-xl overflow-hidden mb-8 bg-[#141414]">
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
          <p className="text-base text-[#aaa] leading-relaxed">
            {post.description}
          </p>
        )}

        {post?.review && (
          <p className="text-sm text-[#777] leading-loose">
            {post.review}
          </p>
        )}
      </div>

    </div>
  );
};

export default PostDetails;