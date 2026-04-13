import React, { useContext, useEffect, useState } from "react";
import reviewService from "../service/appwrite/reviewService";
import { ReviewContext } from "../Context/reviewContext";
import { Query } from "appwrite";
import PostCard from "../components/Posts/PostCard";

const MyPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useContext(ReviewContext);

  useEffect(() => {
    reviewService
      .getReviews([Query.equal("userId", userData?.$id)])
      .then((data) => {
        if (data) setPosts(data.documents);
      })
      .finally(() => setLoading(false));
  }, [userData]);

  if (loading) {
    return (
      <div className="w-full py-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-[#141414] border border-[#1e1e1e] rounded-xl overflow-hidden animate-pulse">
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

  if (posts.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-[#444] text-sm">You haven't posted anything yet</p>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="mb-7">
        <p className="text-xs text-[#06B6D4] uppercase tracking-widest mb-1">Your Content</p>
        <h1 className="text-xl font-medium text-white">My Posts</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <PostCard key={post.$id} postData={post} />
        ))}
      </div>
    </div>
  );
};

export default MyPost;