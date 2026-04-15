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
      <div className="py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
    );
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-[#bbb] text-sm">You haven't posted anything yet</p>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="mb-7">
        <p className="text-xs font-semibold text-[#999] uppercase tracking-widest mb-1">
          Your Content
        </p>
        <h1 className="text-xl font-bold text-[#111]">My Posts</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => (
          <PostCard key={post.$id} postData={post} />
        ))}
      </div>
    </div>
  );
};

export default MyPost;
