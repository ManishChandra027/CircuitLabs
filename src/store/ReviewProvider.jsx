import React, { useState } from "react";
import { ReviewContext } from "./reviewContext";

const ReviewProvider = ({ children }) => {
  const [status, setStatus] = useState(false);
  const [userData, setUserdata] = useState({});

  return (
    <ReviewContext.Provider
      value={{ status, userData, setStatus, setUserdata }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export default ReviewProvider;
