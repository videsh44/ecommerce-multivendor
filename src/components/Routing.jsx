import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Login from '../Login';
import MenuIndex from './Menu';
import { connect } from 'react-redux';
import Home from '../components/home/Home';
import AdminIndex from './admin/AdminIndex';
import ProductIndex from './admin/products/ProductIndex';
import ProductDetails from './home/product/ProductDetails';
import CategoryIndex from './home/category/CategoryIndex';
import CartIndex from './home/cart/CartIndex';

const PrivateRoute = ({ component: Component, user, dispatch, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        user.isSignedIn === true ? (
          <MenuIndex>
            <Component {...props} />
          </MenuIndex>
        ) : (
          <Redirect to={{ pathname: '/login' }} />
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
  return (
    <Route
      {...rest}
      render={(props) =>
        user.user_type === 'admin' ? (
          <AdminIndex>
            <Component {...props} />
          </AdminIndex>
        ) : (
          <Redirect to={{ pathname: '/home' }} />
        )
      }
    />
  );
};

const Routing = (props) => {
  const dispatch = useDispatch();

  const userType =
    localStorage.getItem('user_type') === null ||
    localStorage.getItem('user_type') === undefined
      ? ''
      : localStorage.getItem('user_type');
  const user = props.userAuth;
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

          <PrivateRoute
            path="/ecommerce-multivendor"
            exact
            component={Home}
            user={user}
            dispatch={dispatch}
          />

          <PrivateRoute
            path="/product/:id"
            exact
            component={ProductDetails}
            user={user}
            dispatch={dispatch}
          />

          <PrivateRoute
            path="/product/category/:category"
            exact
            component={CategoryIndex}
            user={user}
            dispatch={dispatch}
          />

          <PrivateRoute
            path="/cart"
            exact
            component={CartIndex}
            user={user}
            dispatch={dispatch}
          />

          <AdminPrivateRoute
            path="/admin/product"
            exact
            component={ProductIndex}
            user={user}
            dispatch={dispatch}
            userType={userType}
          />
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
