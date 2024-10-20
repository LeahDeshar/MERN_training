import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import API from "../services/API";

function ProtectedRoute({ children }) {
  const getUser = async () => {
    try {
      const { data } = await API.get("/auth/current-user");
      // if (data?.success) {
      //   dispatch(getCurrentUser(data));
      // }
    } catch (error) {
      localStorage.clear();
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  });

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
