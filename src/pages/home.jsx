import React, { useEffect, useState } from "react";
import reviewService from "../service/appwrite/reviewService";
import PostCard from "../components/Posts/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await reviewService.getReviews();
        if (data) setPosts(data.documents);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
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

  if (posts.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-[#444] text-sm">No posts yet</p>
      </div>
    );
  }

  return (
    <div className="py-10">
      {/* Page header */}
      <div className="mb-7">
        <p className="text-xs font-semibold text-[#06B6D4] uppercase tracking-widest mb-1">
          Community
        </p>
        <h1 className="text-xl font-medium text-white">Latest Posts</h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.$id} postData={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
