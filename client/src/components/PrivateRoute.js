import React from "react";
import { Route, Navigate } from "react-router-dom";
import { getToken, getRole } from "../utils/auth"; // Import functions to get token and role

const PrivateRoute = ({ element: Component, requiredRole, ...rest }) => {
  const token = getToken();
  const role = getRole(); // Get role from localStorage

  return (
    <Route
      {...rest}
      element={
        token ? (
          requiredRole === role || requiredRole === "any" ? (
            <Component {...rest} />
          ) : (
            <Navigate to="/" />
          )
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
