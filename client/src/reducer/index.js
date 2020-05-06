import { combineReducers } from 'redux';
import user from './userReducer';
import query from './queryReducer';
import token from './handleToken';
import errorRedirect from './errorRedirect';

export default combineReducers({
  user,
  query,
  token,
  errorRedirect,
});
