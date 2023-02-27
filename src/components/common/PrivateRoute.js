import React, { useLayoutEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../store/features/authSlice";
import jwt_decode from "jwt-decode";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const history = useHistory();

  const token = localStorage.getItem("jwtToken");
  useLayoutEffect(() => {
    console.log(token, "token ");
    if (token) {
      const decoded = jwt_decode(token.replace("Bearer ", ""));
      console.log(decoded, "decoded");
      dispatch(setAuth({ isAuthenticated: true, user: decoded }));
    }
  }, []);

  const isAuth = () => {
    if (token) {
      const decoded = jwt_decode(token.replace("Bearer ", ""));
      console.log(decoded, "decoded");
      dispatch(setAuth({ isAuthenticated: true, user: decoded }));
      return true;
    }
  };

  if (!token) {
    history.push("/login");
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated === true || isAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
