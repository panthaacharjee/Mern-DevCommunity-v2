import React, { useEffect, useState } from "react";
import "./Update.css";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { updateExperience, loadUser } from "../../../redux/actions/userActions";
import { UPDATE_EXPERIENCE_RESET } from "../../../redux/constants/userConstants";
import { toast } from "react-toastify";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";

const ExperienceUpdate = ({ setExperienceUpdate }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { isUpdated, error, loading } = useSelector((state) => state.profile);

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [time, setTime] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("title", title);
    myForm.set("description", description);
    myForm.set("time", time);

    dispatch(updateExperience(myForm));
  };
  useEffect(() => {
    if (error) {
      return toast(error);
    }
    if (isUpdated) {
      dispatch(loadUser());
      dispatch({ type: UPDATE_EXPERIENCE_RESET });
      history("/account");
    }
  }, [user, error, isUpdated, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit} className="form about-form">
          <span onClick={() => setExperienceUpdate(true)}>
            <RxCross2 />
          </span>
          <h3>Update Experience</h3>
          <div>
            <label>Title</label>
            <input
              type="text"
              value={title}
              name="location"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Company Name</label>
            <input
              type="text"
              value={description}
              name="location"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Time</label>
            <input
              type="text"
              value={time}
              name="location"
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <input type="submit" />
        </form>
      )}
    </>
  );
};

export default ExperienceUpdate;
