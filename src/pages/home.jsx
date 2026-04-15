import React, { useEffect, useState } from "react";
import reviewService from "../service/appwrite/reviewService";
import PostCard from "../components/Posts/PostCard";
import { Link } from "react-router-dom";
import { Query } from "appwrite";
import profileService from "../service/appwrite/profileService";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [featuredProfile, setFeaturedProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await reviewService.getReviews();
        if (data) setPosts(data.documents);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        if (!featuredPost) return;
        const data = await profileService.getProfiles([
          Query.equal("userId", featuredPost?.userId),
        ]);
        if (!data || data.documents.length === 0)
          throw new Error("No profile found");
        setFeaturedProfile(data.documents[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [featuredPost]);

  useEffect(() => {
    if (posts.length > 0) {
      setFeaturedPost(posts[0]);
    }
  }, [posts]);

  if (loading) {
    return (
      <div className="py-10">
        <div className="h-5 bg-[#e8e6e1] w-24 rounded mb-6 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-[#e8e6e1] rounded-2xl h-56 animate-pulse" />
          <div className="flex flex-col gap-3">
            <div className="h-4 bg-[#e8e6e1] w-1/2 rounded animate-pulse" />
            <div className="h-6 bg-[#e8e6e1] w-full rounded animate-pulse" />
            <div className="h-4 bg-[#e8e6e1] w-full rounded animate-pulse" />
            <div className="h-4 bg-[#e8e6e1] w-3/4 rounded animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-[#e8e6e1] rounded-2xl overflow-hidden animate-pulse"
            >
              <div className="h-44 bg-[#e8e6e1]" />
              <div className="p-4 space-y-2">
                <div className="h-3 bg-[#e8e6e1] w-3/4 rounded" />
                <div className="h-3 bg-[#e8e6e1] w-1/2 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-[#bbb] text-sm">No posts yet</p>
      </div>
    );
  }

  const restPosts = posts.slice(1);

  return (
    <div className="py-10">
      {/* Section label */}
      <p className="text-xs font-semibold text-[#999] uppercase tracking-widest mb-6">
        Recent Post
      </p>

      {/* Featured post */}
      {featuredPost && (
        <Link to={`/post/${featuredPost?.$id}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 pb-12 border-b border-[#e8e6e1] cursor-pointer group">
            <div className="w-full h-66 rounded-2xl overflow-hidden bg-[#f0ede8]">
              <img
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                src={
                  featuredPost?.imageId
                    ? reviewService.getImage(featuredPost.imageId)
                    : "/fallback.jpg"
                }
                alt={featuredPost?.title}
              />
            </div>
            <div className="flex flex-col justify-start">
              <h2 className="text-2xl font-semibold text-[#333333] leading-snug mb-3 hover:text-[#0891B2] transition-colors">
                {featuredPost?.title}
              </h2>
              {featuredPost?.description && (
                <p className="text-sm text-[#888] leading-relaxed line-clamp-4 mb-4">
                  {featuredPost?.description}
                </p>
              )}
              <div className="flex items-center gap-2 mb-4">
                {featuredProfile?.avatarId ? (
                  <img
                    src={profileService.getImage(featuredProfile.avatarId)}
                    className="w-6 h-6 rounded-full object-cover"
                    alt={featuredProfile?.username}
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-[#0891B2] text-white text-[10px] font-medium flex items-center justify-center">
                    {featuredPost?.username?.charAt(0).toUpperCase()}
                  </div>
                )}

                <span className="text-xs text-[#999]">
                  {featuredPost.username}
                </span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-sm font-medium text-[#333333] inline-flex items-center gap-1 hover:font-semibold">
                  Read Article <span className="text-base">↗</span>
                </span>
                <span className="text-xs text-[#999]">
                  {" "}
                  Updated:{" "}
                  {new Date(featuredPost.$updatedAt).toLocaleDateString(
                    "en-IN",
                    {
                      timeZone: "Asia/Kolkata",
                      day: "numeric",
                      month: "short",
                      year: "2-digit",
                    },
                  )}
                </span>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Rest posts grid */}
      {restPosts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {restPosts.map((post) => (
            <PostCard key={post.$id} postData={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
