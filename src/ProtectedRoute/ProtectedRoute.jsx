import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        userInfo ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
// import React from "react";
// import { useSelector } from "react-redux";
// import { Redirect } from "react-router";
// export const ProtectedRoute = ({ children }) => {
//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   if (!userInfo) {
//     return <Redirect to="/login" replace={false} />;
//   }

//   return children;
// };
