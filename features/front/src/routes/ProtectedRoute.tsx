// import React, { useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import API from "../services/API";
// import { getCurrentUser } from "../redux/Features/auth/authAction";
// import { useDispatch } from "react-redux";

// function ProtectedRoute({ children }) {
//   const dispatch = useDispatch();
//   const getUser = async () => {
//     try {
//       const { data } = await API.get("/user/get-current-user");
//       if (data?.success) {
//         dispatch(getCurrentUser(data));
//       }
//     } catch (error) {
//       localStorage.clear();
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getUser();
//   });

//   if (localStorage.getItem("token")) {
//     return children;
//   } else {
//     return <Navigate to="/login" />;
//   }
// }

// export default ProtectedRoute;

import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../redux/Features/auth/authAction";

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      // Only fetch the user if the token exists and user data is not already in state
      dispatch(getCurrentUser());
    }
  }, [token, user, dispatch]);

  if (token) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
