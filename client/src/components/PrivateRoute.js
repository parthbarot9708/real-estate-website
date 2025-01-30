import React from "react";
import { Route, Navigate } from "react-router-dom"; // Update to import Navigate instead of Redirect
import { getToken } from "../utils/auth";

const PrivateRoute = ({ element: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        getToken() ? (
          <Component {...rest} />
        ) : (
          <Navigate to="/login" /> // Use Navigate for redirect
        )
      }
    />
  );
};

export default PrivateRoute;
