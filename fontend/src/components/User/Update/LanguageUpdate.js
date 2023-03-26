import React, { useEffect, useState } from "react";
import "./Update.css";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateLanguage } from "../../../redux/actions/userActions";
import { UPDATE_LANGUAGE_RESET } from "../../../redux/constants/userConstants";
import { toast } from "react-toastify";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";

const LanguageUpdate = ({ setLanguageUpdate }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { isUpdated, error, loading } = useSelector((state) => state.profile);

  const [language, setLanguage] = useState();
  //   const [level, setLevel] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("language", language);

    dispatch(updateLanguage(myForm));
  };
  useEffect(() => {
    if (error) {
      return toast(error);
    }
    if (isUpdated) {
      dispatch(loadUser());
      dispatch({ type: UPDATE_LANGUAGE_RESET });
      history("/account");
    }
  }, [user, error, isUpdated, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit} className="form">
          <span onClick={() => setLanguageUpdate(true)}>
            <RxCross2 />
          </span>
          <h3>Update Language</h3>
          <div>
            <label>Language</label>
            <input
              type="text"
              value={language}
              name="location"
              onChange={(e) => setLanguage(e.target.value)}
              required
            />
          </div>
          <input type="submit" />
        </form>
      )}
    </>
  );
};

export default LanguageUpdate;
