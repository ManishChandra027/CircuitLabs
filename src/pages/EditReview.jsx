import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import reviewService from '../service/appwrite/reviewService';
import AddReviewCard from '../components/Review Components/AddReviewCard';

const EditReview = () => {
    const {slug}=useParams();
    const [post,setPost]=useState({});
    const nevigate=useNavigate();
    useEffect(()=>{
        if(slug){
            reviewService.getReview(slug).then((data)=>{
                if(data){
                    setPost(data);
                }
            })
        }else{
            nevigate('/');
        }
    },[slug,nevigate]);
  return (
    <AddReviewCard updaitedData={post}/>
  )
}

export default EditReview