import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import profileService from "../service/appwrite/profileService";
import UpdateProfile from "../components/profile Components/UpdateProfile";

const EditProfile = () => {
  const [post, setPost] = useState({});
  const { slug } = useParams();
  useEffect(() => {
    // console.log(slug)
    profileService.getProfile(slug).then((data) => {
      // console.log(data)
      if (data) {
        setPost(data);
      }
    });
  }, [slug]);
  return <UpdateProfile updaitedData={post} />;
};

export default EditProfile;
