import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const history = useNavigate();
  return (
    <Fragment>
      {!loading && isAuthenticated ? children : history("/login")}
    </Fragment>
  );
};
export default ProtectedRoute;
