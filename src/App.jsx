import React from "react";
import SignupCard from "./components/SignupCard";

import { Outlet } from "react-router";
import Header from "./components/Header";

const App = () => {
  return (
    <>
     <Header/>
    <Outlet />
    </>
  );
};

export default App;
