import React from "react";
import { Route, Navigate } from "react-router-dom";
import { getToken, getRole } from "../utils/auth";

const PrivateRoute = ({ element: Component, requiredRole, ...rest }) => {
  const token = getToken();
  const role = getRole();

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
