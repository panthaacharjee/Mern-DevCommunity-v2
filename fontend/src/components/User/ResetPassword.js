import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../MetaData";
import Loader from "../Loader/Loader";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../redux/actions/userActions";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { loading, success, error } = useSelector(
    (state) => state.forgotPassword
  );
  const { token } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //OnSubmit
  const onSubmit = (data) => {
    dispatch(resetPassword(token, data));
  };

  useEffect(() => {
    function auth() {
      if (error) {
        return toast(error);
      }
      if (success) {
        // toast("Password Update Successfully");
        return history("/login");
      }
    }
    auth();
  }, [error, success]);
  return (
    <>
      <MetaData title={"Reset Password"} />
      {loading ? (
        <Loader />
      ) : (
        <div className="LoginSignup-container">
          <div className="LoginSignup-box">
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter Your email"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </div>
              <div>
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Enter Your email"
                  {...register("confirmPassword", { required: true })}
                />
                {errors.confirmPassword && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </div>
              <button>Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
