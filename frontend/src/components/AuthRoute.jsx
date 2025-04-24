import React from "react";
import useAuthStore from "../store/useAuthStore";
import { Navigate } from "react-router";

const AuthRoute = ({ children }) => {
  const { authUser } = useAuthStore();
  return !authUser ? children : <Navigate to="/" />;
};

export default AuthRoute;
