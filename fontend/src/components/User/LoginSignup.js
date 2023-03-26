import React, { useEffect } from "react";
import "./LoginSignup.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Loader from "../Loader/Loader";
import MetaData from "../MetaData";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/userActions";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const LoginSignup = () => {
  const history = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //OnSubmit
  const onSubmit = (data) => {
    const { email, password } = data;
    dispatch(login(email, password));
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
      <MetaData title={"Login"} />
      {loading ? (
        <Loader />
      ) : (
        <div className="LoginSignup-container">
          <div className="LoginSignup-box">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Enter Your email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter Your password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </div>
              <div>
                <Link to="/forgot/password">forgot password ?</Link>
              </div>
              <button>Submit</button>
              <div className="register-link">
                <Link to="/register">Create a New Account?</Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginSignup;
