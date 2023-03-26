import React, { useEffect, useState } from "react";
import "./Update.css";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, loadUser } from "../../../redux/actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../../redux/constants/userConstants";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";

const UpdateProfile = ({ setProfileUpdate }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { isUpdated, error, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState(user.name);
  const [title, setTitle] = useState(user.title);
  const [location, setLocation] = useState(user.location);

  const handleSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("title", title);
    myForm.set("location", location);

    dispatch(updateProfile(myForm));
  };
  useEffect(() => {
    if (user) {
      setName(user.name);
      setTitle(user.title);
      setLocation(user.location);
    }
    if (error) {
      return toast(error);
    }
    if (isUpdated) {
      dispatch(loadUser());
      dispatch({ type: UPDATE_PROFILE_RESET });
      history("/account");
    }
  }, [user, error, isUpdated, dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit} className="form">
          <span onClick={() => setProfileUpdate(true)}>
            <RxCross2 />
          </span>
          <h3>Update Profile</h3>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Title</label>
            <input
              type="text"
              value={title}
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Location</label>
            <input
              type="text"
              value={location}
              name="location"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <input type="submit" />
        </form>
      )}
    </>
  );
};

export default UpdateProfile;
