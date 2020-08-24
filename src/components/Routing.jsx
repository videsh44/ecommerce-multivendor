import React, { useEffect } from "react";
import { Switch, Router, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "../Login";
import MenuIndex from "./Menu";

import { loginUser } from "../actions/authActions";
import history from "../history";
import { connect } from "react-redux";
import Home from "../components/home/Home";

const PrivateRoute = ({ component: Component, user, dispatch, ...rest }) => {
  {
    /*if (user.isSignedIn === true) {
    document.location.assign("/home");
  } */
  }
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

const Routing = (props) => {
  const dispatch = useDispatch();
  //const user = useSelector(state => state.userAuth);
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

          {/*  <Route path="/home" component={Home} /> */}
          {/*  <Route path="/login" component={Login} /> */}
          <Route path="/" exact component={Login} user={user} />
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
