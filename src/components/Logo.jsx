import React from "react";

const Logo = ({ width = "100px" }) => {
  return (
    <div style={{ width }} className="flex items-center gap-1">
      <span className="text-[#0891B2] text-2xl font-semibold  font-outfit">
        Circuit<span className="text-[#333333]">Labs</span>
      </span>
    </div>
  );
};

export default Logo;
