import React, { useEffect, useState } from "react";
import "./Update.css";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updatePortfolio } from "../../../redux/actions/userActions";
import { UPDATE_PORTFOLIO_RESET } from "../../../redux/constants/userConstants";
import { toast } from "react-toastify";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";

const PortfolioUpdate = ({ setPortfolioUpdate }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { isUpdated, error, loading } = useSelector((state) => state.profile);

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [link, setLink] = useState();
  const [gitLink, setGitLink] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("title", title);
    myForm.set("description", description);
    myForm.set("link", link);
    myForm.set("gitLink", gitLink);

    dispatch(updatePortfolio(myForm));
  };
  useEffect(() => {
    if (error) {
      return toast(error);
    }
    if (isUpdated) {
      dispatch(loadUser());
      dispatch({ type: UPDATE_PORTFOLIO_RESET });
      history("/account");
    }
  }, [user, error, isUpdated, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit} className="form about-form">
          <span onClick={() => setPortfolioUpdate(true)}>
            <RxCross2 />
          </span>
          <h3>Update Portfolio</h3>
          <div>
            <label>Title</label>
            <input
              type="text"
              value={title}
              name="location"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              value={description}
              name="location"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Live Link</label>
            <input
              type="text"
              value={link}
              name="location"
              onChange={(e) => setLink(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Git Link</label>
            <input
              type="text"
              value={gitLink}
              name="location"
              onChange={(e) => setGitLink(e.target.value)}
              required
            />
          </div>
          <input type="submit" />
        </form>
      )}
    </>
  );
};

export default PortfolioUpdate;
