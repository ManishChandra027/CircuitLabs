import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import user from "../../service/appwrite/auth";
import { ReviewContext } from "../../Context/reviewContext";
import LogoutBtn from "../authentication/LogoutBtn";
import profileService from "../../service/appwrite/profileService";
import Logo from "../Logo";

const Header = () => {
  const nevigate = useNavigate();
  const { status, userData } = useContext(ReviewContext);
  const authStatus = status;

  const navItem = [
    { name: "Home", slug: "/", isActive: true },
    { name: "Login", slug: "/login", isActive: !authStatus },
    { name: "Signup", slug: "/signup", isActive: !authStatus },
    { name: "Add Review", slug: "/add-review", isActive: authStatus },
    { name: "My Reviews", slug: "/my-review", isActive: authStatus },
    {
      name: "Profile",
      slug: `/my-profile/${userData?.$id}`,
      isActive: authStatus,
    },
  ];
  return (
    <div className="w-full bg-gray-100 h-20 flex gap-3 ">
      <ul className="flex gap-8 justify-around items-center cursor-pointer">
        <Logo/>
        {navItem.map((item) =>
          item.isActive ? (
            <li key={item.name}>
              {" "}
              <NavLink to={item.slug}> {item.name}</NavLink>
            </li>
          ) : null,
        )}

        {authStatus ? <LogoutBtn /> : null}
      </ul>
    </div>
  );
};

export default Header;
