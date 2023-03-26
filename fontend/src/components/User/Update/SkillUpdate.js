import React, { useEffect, useRef, useState } from "react";
import "./Update.css";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { updateSkill, loadUser } from "../../../redux/actions/userActions";
import { UPDATE_SKILL_RESET } from "../../../redux/constants/userConstants";
import { toast } from "react-toastify";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";

const SkillUpdate = ({ setSkillUpdate }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { isUpdated, error, loading } = useSelector((state) => state.profile);

  const [skill, setSkill] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("skill", skill);

    dispatch(updateSkill(myForm));
  };
  useEffect(() => {
    if (user) {
      setSkill(user.skill);
    }
    if (error) {
      return toast(error);
    }
    if (isUpdated) {
      dispatch(loadUser());
      dispatch({ type: UPDATE_SKILL_RESET });
      history("/account");
    }
  }, [user, error, isUpdated, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit} className="form about-form">
          <span onClick={() => setSkillUpdate(true)}>
            <RxCross2 />
          </span>
          <h3>Update Skill</h3>
          <div>
            <label>Skill</label>
            <input
              type="text"
              value={skill}
              name="location"
              onChange={(e) => setSkill(e.target.value)}
            />
          </div>

          <input type="submit" />
        </form>
      )}
    </>
  );
};

export default SkillUpdate;
