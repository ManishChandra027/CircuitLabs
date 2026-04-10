import React, { useState } from "react";
import { ReviewContext } from "./reviewContext";


const ReviewProvider = ({ children }) => {
  const [status, setStatus] = useState(false);
  const [userData, setUserData] = useState(null);

  return (
    <ReviewContext.Provider
      value={{ status, userData, setStatus, setUserData }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export default ReviewProvider;
