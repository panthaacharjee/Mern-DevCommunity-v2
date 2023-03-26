import React, { useEffect, useRef, useState } from "react";
import "./Update.css";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { updateAbout, loadUser } from "../../../redux/actions/userActions";
import { UPDATE_ABOUT_RESET } from "../../../redux/constants/userConstants";
import { toast } from "react-toastify";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";

const AboutUpdate = ({ setAboutUpdate }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { isUpdated, error, loading } = useSelector((state) => state.profile);

  //Jodit Rich Text Editor
  const [about, setAbout] = useState(user.about);
  const editor = useRef(null);
  const config = {
    buttons: ["bold", "italic", "underline", "link", "unlink", "source"],
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("about", about);

    dispatch(updateAbout(myForm));
  };
  useEffect(() => {
    if (user) {
      setAbout(user.about);
    }
    if (error) {
      return toast(error);
    }
    if (isUpdated) {
      dispatch(loadUser());
      dispatch({ type: UPDATE_ABOUT_RESET });
      history("/account");
    }
  }, [user, error, isUpdated, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit} className="form about-form">
          <span onClick={() => setAboutUpdate(true)}>
            <RxCross2 />
          </span>
          <h3>Update About</h3>
          <div>
            <JoditEditor
              ref={editor}
              value={about}
              onChange={(e) => {
                setAbout(e);
              }}
            />
          </div>
          <input type="submit" />
        </form>
      )}
    </>
  );
};

export default AboutUpdate;
