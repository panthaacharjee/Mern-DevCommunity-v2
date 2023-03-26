import React, { useEffect, useState } from "react";
import "./LoginSignup.css";
import "./Register.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Loader from "../Loader/Loader";
import MetaData from "../MetaData";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/userActions";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import pic from "../../images/profilepng.png";

const Register = () => {
  const history = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  //Handling Image
  const [avatarPreview, setAvatarPreview] = useState(pic);
  const [avatar, setAvatar] = useState(pic);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "developer",
  });
  const { name, email, password, role } = user;

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: [e.target.value] });
    }
  };
  //Registration
  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("role", role);
    myForm.set("avatar", avatar);

    //     console.log(myForm.avatar);
    dispatch(register(myForm));
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    function auth() {
      if (error) {
        return toast(error);
      }
      if (isAuthenticated) {
        return history(redirect);
      }
    }
    auth();
  }, [error, isAuthenticated, history]);

  return (
    <>
      <MetaData title={"Register"} />
      {loading ? (
        <Loader />
      ) : (
        <div className="LoginSignup-container">
          <div className="LoginSignup-box">
            <h2>Create a Account</h2>
            <form onSubmit={registerSubmit}>
              <div>
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter Your name"
                  required
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Enter Your email"
                  required
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter Your password"
                  required
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              <div className="select-option">
                <select name="role" value={role} onChange={handleChange}>
                  <option value="developer">Developer</option>
                  <option value="client">Client</option>
                </select>
              </div>
              <div id="registerImage">
                <img src={avatarPreview} alt={avatarPreview} />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>
              <button>Submit</button>
              <div className="register-link">
                <Link to="/login">Already Have a Account?</Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
