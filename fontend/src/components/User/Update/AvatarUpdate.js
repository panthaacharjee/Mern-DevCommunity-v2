import React, { useState, useEffect } from "react";
import "./Update.css";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateAvatar } from "../../../redux/actions/userActions";
import { UPDATE_AVATAR_RESET } from "../../../redux/constants/userConstants";
import { toast } from "react-toastify";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";

const AvatarUpdate = ({ setAvatarUpdate }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { isUpdated, error, loading } = useSelector((state) => state.profile);

  const [avatar, setAvatar] = useState(user.avatar.url);
  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("avatar", avatar);

    dispatch(updateAvatar(myForm));
  };
  useEffect(() => {
    if (user) {
    }
    if (error) {
      return toast(error);
    }
    if (isUpdated) {
      dispatch(loadUser());
      dispatch({ type: UPDATE_AVATAR_RESET });
      history("/account");
    }
  }, [user, error, isUpdated, dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit} className="form">
          <span onClick={() => setAvatarUpdate(true)}>
            <RxCross2 />
          </span>
          <h3>Update Avatar</h3>
          <div>
            <img src={avatar} alt="Avatar" className="form-img" />
          </div>
          <div id="updateImage">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
          <input type="submit" />
        </form>
      )}
    </>
  );
};

export default AvatarUpdate;
