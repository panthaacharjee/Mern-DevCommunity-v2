import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { HiShoppingBag } from "react-icons/hi";
import { RiProjectorLine } from "react-icons/ri";
import { BsFillFilePostFill } from "react-icons/bs";
import {
  AiFillQuestionCircle,
  AiFillMessage,
  AiFillSetting,
  AiFillHeart,
} from "react-icons/ai";
const Sidebar = ({ sidebar }) => {
  return (
    <div className="sidebar-box">
      {sidebar ? (
        <>
          <Link to="#">
            <span>
              <HiShoppingBag />
            </span>
            <p>Jobs</p>
          </Link>
          <Link to="#">
            <span>
              <RiProjectorLine />
            </span>
            <p>Projects</p>
          </Link>

          <Link to="/posts">
            <span>
              <BsFillFilePostFill />
            </span>
            <p>Posts</p>
          </Link>
          <Link to="#">
            <span>
              <AiFillQuestionCircle />
            </span>
            <p>Problems</p>
          </Link>
          <Link to="#">
            <span>
              <AiFillMessage />
            </span>
            <p>Messages</p>
          </Link>
          <Link to="#">
            <span>
              <AiFillSetting />
            </span>
            <p>Settings</p>
          </Link>
          <Link to="#">
            <span>
              <HiShoppingBag />
            </span>
            <p>Favorite</p>
          </Link>
        </>
      ) : (
        <>
          <Link to="#">
            <span>
              <HiShoppingBag />
            </span>
          </Link>
          <Link to="#">
            <span>
              <RiProjectorLine />
            </span>
          </Link>

          <Link to="/posts">
            <span>
              <BsFillFilePostFill />
            </span>
          </Link>
          <Link to="#">
            <span>
              <AiFillQuestionCircle />
            </span>
          </Link>
          <Link to="#">
            <span>
              <AiFillMessage />
            </span>
          </Link>
          <Link to="#">
            <span>
              <AiFillSetting />
            </span>
          </Link>
          <Link to="#">
            <span>
              <HiShoppingBag />
            </span>
          </Link>
        </>
      )}
    </div>
  );
};

export default Sidebar;
