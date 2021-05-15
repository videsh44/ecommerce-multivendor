import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productCategory from './productCategory';
import productDataAdmin from './productDataAdmin';
import productReducer from './productReducer';

export default combineReducers({
  userAuth: authReducer,
  products: productReducer,
  productCategory: productCategory,
  productDataAdmin: productDataAdmin,
});
