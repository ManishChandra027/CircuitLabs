import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router";
import Header from "../components/header/Header";
import { ReviewContext } from "../Context/reviewContext";
import ReviewCard from "../components/Review Components/ReviewCard";
import reviewService from "../service/appwrite/reviewService";

const Home = () => {
  const [posts, setPosts] = useState([]);
useEffect(() => {
  const fetchData = async () => {
    const data = await reviewService.getReviews();
    if (data) {
      setPosts(data.documents);
    }
  };

  fetchData();
}, []);
  return (
    <div className="w-full py-8">
      <div className="flex flex-wrap">
        {posts.map((post) => (
          <div key={post.$id} className="p-2 w-full sm:w-1/2 lg:w-1/4">
            <ReviewCard postData={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
