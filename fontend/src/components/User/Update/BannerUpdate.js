import React, { useState, useEffect } from "react";
import "./Update.css";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateBanner } from "../../../redux/actions/userActions";
import { UPDATE_BANNER_RESET } from "../../../redux/constants/userConstants";
import { toast } from "react-toastify";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";

const BannerUpdate = ({ setBannerUpdate }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { isUpdated, error, loading } = useSelector((state) => state.profile);

  const [banner, setBanner] = useState(user.banner.url);

  const handleChange = (e) => {
    if (e.target.name === "banner") {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.readyState === 2) {
          setBanner(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("banner", banner);

    dispatch(updateBanner(myForm));
  };
  useEffect(() => {
    if (error) {
      return toast(error);
    }
    if (isUpdated) {
      dispatch(loadUser());
      dispatch({ type: UPDATE_BANNER_RESET });
      history("/account");
    }
  }, [user, error, isUpdated, dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit} className="form">
          <span onClick={() => setBannerUpdate(true)}>
            <RxCross2 />
          </span>
          <h3>Update Banner</h3>
          <div>
            <img src={banner} alt="Avatar" className="form-img" />
          </div>
          <div id="updateImage">
            <input
              type="file"
              name="banner"
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

export default BannerUpdate;
