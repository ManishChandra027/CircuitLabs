import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { ReviewContext } from "../../Context/reviewContext";
import user from "../../service/appwrite/auth";

const LogoutBtn = () => {
  const navigate = useNavigate();
  const { setStatus, setUserData } = useContext(ReviewContext);

  const handleLogout = async () => {
    const isLogout = await user.logout();
    if (!isLogout) throw new Error("Failed to Logout");
    setStatus(false);
    setUserData(null);
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-3 py-1.5 text-sm rounded-lg border border-[#2a2a2a] text-gray-400 hover:border-yellow-400 hover:text-yellow-400 transition-colors cursor-pointer"
    >
      Logout
    </button>
  );
};

export default LogoutBtn;