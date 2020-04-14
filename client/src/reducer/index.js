import { combineReducers } from 'redux';
import user from './userReducer';
import query from './queryReducer';
import token from './handleToken';

export default combineReducers({
  user,
  query,
  token,
});
