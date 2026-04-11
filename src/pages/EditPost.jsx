import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import reviewService from "../service/appwrite/reviewService";
import AddPostCard from "../components/Posts/PostForm";

const EditPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState({});
  const nevigate = useNavigate();
  useEffect(() => {
    if (slug) {
      reviewService.getReview(slug).then((data) => {
        if (data) {
          setPost(data);
        }
      });
    } else {
      nevigate("/");
    }
  }, [slug, nevigate]);
  return <AddPostCard existingPost={post} />;
};

export default EditPost;
