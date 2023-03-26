import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import "./userOption.css";
import ProfilePic from "../../images/pantha.jpg";
import { Link } from "react-router-dom";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { logout } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";

const UserOptions = ({ userOption, setUserOption }) => {
  const dispatch = useDispatch();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  //Body Undo User Option

  useEffect(() => {
    document.body.addEventListener("click", handleClick, true);
  }, []);
  const handleClick = () => {
    setUserOption(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div
          className={
            userOption ? "userOption-box userOption-show" : "userOption-box"
          }
          onClick={() => setUserOption(true)}
        >
          {isAuthenticated ? (
            <div className="profile-details">
              <div className="porfile-details-content">
                <img src={user.avatar.url} alt={"Profile Pic"} />
                <div>
                  <h4>{user.name}</h4>
                  <p>
                    <span>Balance : </span>
                    {user.balance} $
                  </p>
                </div>
              </div>
              <div>
                <Link to="/account">View Profile</Link>
              </div>
            </div>
          ) : null}
          <div className="account-management">
            <div>
              <span>
                <BsFillBookmarkHeartFill />
              </span>
              <p>Try Premium for Free</p>
            </div>
            <li>
              <Link>Settings and Privacy</Link>
            </li>
            <li>
              <Link>Help</Link>
            </li>
            <li>
              <Link>Languages</Link>
            </li>
          </div>
          <div className="login">
            {isAuthenticated ? (
              <Link onClick={() => dispatch(logout())}>Logout</Link>
            ) : (
              <Link to="/login">Log In</Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserOptions;
