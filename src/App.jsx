import React, { useContext, useEffect } from "react";

import { Outlet, useNavigate } from "react-router";
import Header from "./components/header/Header";
import { ReviewContext } from "./Context/reviewContext";
import user from "./service/appwrite/auth";

const App = () => {
  const { setStatus, setUserData } = useContext(ReviewContext);
  const nevigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const userData = await user.getAccount();
      if (userData) {
        setStatus(true);
        setUserData(userData);
      } else {
        nevigate("/login");
      }
    };
    checkUser();
  }, []);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;
