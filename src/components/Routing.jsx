import React, { useEffect } from "react";
import { Switch, Router, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "../Login";
import MenuIndex from "./Menu";

import { loginUser } from "../actions/authActions";
import history from "../history";
import { connect } from "react-redux";
import Home from "../components/home/Home";
import AdminIndex from "./admin/AdminIndex";
import ProductIndex from "./admin/products/ProductIndex";
import { useState } from "react";

const PrivateRoute = ({ component: Component, user, dispatch, ...rest }) => {
  //  console.log("user", user);
  return (
    <Route
      {...rest}
      render={(props) =>
        user.isSignedIn === true ? (
          <MenuIndex>
            <Component {...props} />
          </MenuIndex>
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
};

const AdminPrivateRoute = ({
  component: Component,
  user,
  userType,
  dispatch,
  ...rest
}) => {
  //  console.log("userType", userType);
  return (
    <Route
      {...rest}
      render={(props) =>
        user.user_type === "admin" ? (
          <AdminIndex>
            <Component {...props} />
          </AdminIndex>
        ) : (
          <Redirect to={{ pathname: "/home" }} />
        )
      }
    />
  );
};

const Routing = (props) => {
  const dispatch = useDispatch();
  //const user = useSelector(state => state.userAuth);

  const userType =
    localStorage.getItem("user_type") === null ||
    localStorage.getItem("user_type") === undefined
      ? ""
      : localStorage.getItem("user_type");
  const user = props.userAuth;

  // console.log(props.userAuth.isSignedIn);
  return (
    <div>
      <React.Fragment>
        <Switch>
          <PrivateRoute
            path="/home"
            exact
            component={Home}
            user={user}
            dispatch={dispatch}
          />

          {/**
          <PrivateRoute
            path="/admin"
            exact
            component={AdminIndex}
            user={user}
            dispatch={dispatch}
          />
           */}

          <AdminPrivateRoute
            path="/admin/product"
            exact
            component={ProductIndex}
            user={user}
            dispatch={dispatch}
            userType={userType}
          />

          {/*  <Route path="/home" component={Home} /> */}
          {/*  <Route path="/login" component={Login} /> */}
          <Route path="/" exact component={Login} user={user} />
          {/** <Route path="/admin" exact component={AdminIndex} />  */}
        </Switch>
      </React.Fragment>
      <Route path="/login" render={() => <Login cookies={props.cookies} />} />
    </div>
  );
};
const mapStateToProps = (state) => {
  return { userAuth: state.userAuth };
};
export default connect(mapStateToProps)(Routing);
