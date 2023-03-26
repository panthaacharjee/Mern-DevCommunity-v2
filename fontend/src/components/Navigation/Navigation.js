import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdNotifications } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { RiAccountCircleLine } from "react-icons/ri";
import "./Navigation.css";
import UserOptions from "../User/UserOptions";

const Navigation = ({ sidebar, setSidebar }) => {
  const [userOption, setUserOption] = useState(false);
  return (
    <div className="navbar">
      <div className="container navbar-box">
        <div className="logo">
          <Link to="/">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3800/3800024.png"
              alt="logo"
            />
            <span>Developer Community</span>
          </Link>
        </div>
        {/* <div className="search-box">
          <input placeholder="search a post" />
          <span>
            <IoIosSearch />
          </span>
        </div> */}
        <div className="nav-menu">
          <li>
            <Link to="/notification">
              <IoMdNotifications />
            </Link>
          </li>
          <li>
            <Link to="#" onClick={() => setUserOption(!userOption)}>
              <RiAccountCircleLine />
            </Link>
          </li>
          <li>
            <Link to="#" onClick={() => setSidebar(!sidebar)}>
              <FaBars className="navigation-bar" />
            </Link>
          </li>
        </div>
      </div>
      <div className="userOption">
        <UserOptions userOption={userOption} setUserOption={setUserOption} />
      </div>
    </div>
  );
};

export default Navigation;
