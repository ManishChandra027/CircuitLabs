import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router";
import Header from "./components/header/Header";
import { ReviewContext } from "./Context/reviewContext";
import user from "./service/appwrite/auth";
import { Footer } from "./footer/Footer";

const App = () => {
  const { setStatus, setUserData } = useContext(ReviewContext);

  useEffect(() => {
    const checkUser = async () => {
      const userData = await user.getAccount();
      if (userData) {
        setStatus(true);
        setUserData(userData);
      }
    };
    checkUser();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Header />
      <div className="w-full max-w-6xl mx-auto px-6">
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};

export default App;
