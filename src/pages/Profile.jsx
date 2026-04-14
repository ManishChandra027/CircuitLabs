import React, { useEffect, useState } from "react";
import ProfileCard from "../components/profile/ProfileCard";
import ReviewCard from "../components/Posts/PostCard";
import Home from "./home";
import { useParams } from "react-router-dom";
import reviewService from "../service/appwrite/reviewService";
import { Query } from "appwrite";
import PostCard from "../components/Posts/PostCard";

const Profile = () => {
  const { slug } = useParams();
  const [error, setError] = useState("");
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!slug) return;
        const data = await reviewService.getReviews([
          Query.equal("userId", slug),
        ]);
        if (!data || data.documents.length === 0)
          throw new Error("No profile found");
        setPosts(data.documents);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  console.log(posts);
  if (loading) {
    return (
      <div className="w-full py-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-[#141414] border border-[#1e1e1e] rounded-xl overflow-hidden animate-pulse"
          >
            <div className="h-44 bg-[#1c1c1c]" />
            <div className="p-3.5 space-y-2">
              <div className="h-3 bg-[#1c1c1c] w-3/4 rounded" />
              <div className="h-3 bg-[#1c1c1c] w-1/2 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center">
        <ProfileCard />
      </div>
      {posts?.length === 0 || posts == null ? (
        <div className="min-h-[60vh] flex items-center justify-center">
          //{" "}
          <p className="text-[#444] text-sm">Don't have posted anything yet</p>
          //{" "}
        </div>
      ) : (
        <div className="py-5">
          <div className="mb-7">
            <h1 className="text-xl font-medium text-white">Posts</h1>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts?.map((post) => (
              <PostCard key={post.$id} postData={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
