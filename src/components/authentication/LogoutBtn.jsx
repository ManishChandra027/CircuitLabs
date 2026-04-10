import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { ReviewContext } from "../../Context/reviewContext";
import user from "../../service/appwrite/auth";

const LogoutBtn = () => {
  const nevigate = useNavigate();
  const {setStatus,setUserData}= useContext(ReviewContext);
  const handleLogout = () => {
    const res = user.logout();
    if (res) {
       setStatus(false);
       setUserData(null);
      nevigate("/");
    }
  };

  return <button onClick={handleLogout}>logout</button>;
};

export default LogoutBtn;
