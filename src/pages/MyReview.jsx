import React, { useContext, useEffect, useState } from 'react'
import ReviewCard from '../components/Review Components/ReviewCard';
import reviewService from '../service/appwrite/reviewService';
import { ReviewContext } from '../Context/reviewContext';
import { Query  } from "appwrite";
const MyReview = () => {
    const [posts,setPosts]=useState([]);
    const {userData}=useContext(ReviewContext);
    useEffect(()=>{
        reviewService.getReviews([ Query.equal('userId',userData?.$id)]).then((data)=>{
            if(data){
                setPosts(data.documents);
                
            }
        })
    },[userData])
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
  )
}

export default MyReview