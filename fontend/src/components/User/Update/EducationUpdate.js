import React, { useEffect, useState } from "react";
import "./Update.css";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateEducation } from "../../../redux/actions/userActions";
import { UPDATE_EDUCATION_RESET } from "../../../redux/constants/userConstants";
import { toast } from "react-toastify";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";

const EducationUpdate = ({ setEducationUpdate }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { isUpdated, error, loading } = useSelector((state) => state.profile);

  const [school, setSchool] = useState();
  const [degree, setDegree] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [grade, setGrade] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("school", school);
    myForm.set("degree", degree);
    myForm.set("startDate", startDate);
    myForm.set("endDate", endDate);
    myForm.set("grade", grade);

    dispatch(updateEducation(myForm));
  };
  useEffect(() => {
    if (error) {
      return toast(error);
    }
    if (isUpdated) {
      dispatch(loadUser());
      dispatch({ type: UPDATE_EDUCATION_RESET });
      history("/account");
    }
  }, [user, error, isUpdated, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit} className="form about-form">
          <span onClick={() => setEducationUpdate(true)}>
            <RxCross2 />
          </span>
          <h3>Update Education</h3>
          <div>
            <label>School</label>
            <input
              type="text"
              value={school}
              name="location"
              onChange={(e) => setSchool(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Degree</label>
            <input
              type="text"
              value={degree}
              name="location"
              onChange={(e) => setDegree(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Start Date</label>
            <input
              type="text"
              value={startDate}
              name="location"
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label>End Date</label>
            <input
              type="text"
              value={endDate}
              name="location"
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Grade</label>
            <input
              type="text"
              value={grade}
              name="location"
              onChange={(e) => setGrade(e.target.value)}
              required
            />
          </div>

          <input type="submit" />
        </form>
      )}
    </>
  );
};

export default EducationUpdate;
