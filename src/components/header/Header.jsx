import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import user from "../../service/appwrite/auth";
import { ReviewContext } from "../../Context/reviewContext";
import LogoutBtn from "../authentication/LogoutBtn";

const Header = () => {
  const nevigate = useNavigate();
  const { status } = useContext(ReviewContext);
  const authStatus = status;

  const navItem = [
    { name: "Home", slug: "/", isActive: true },
    { name: "Login", slug: "/login", isActive: !authStatus },
    { name: "Signup", slug: "/signup", isActive: !authStatus },
    { name: "Add Review", slug: "/add-review", isActive: authStatus },
    { name: "My Reviews", slug: "/my-review", isActive: authStatus },
  ];
  return (
    <div className="w-full bg-gray-400 h-20 flex gap-3 ">
      <ul className="flex gap-3 justify-around items-center cursor-pointer">
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
