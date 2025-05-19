import React from "react";
import { useAuth } from "../components/OAuth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (currentUser) {
    return children;
  }

  return <Navigate to="/signin" replace />;
};

export default PrivateRoute;
