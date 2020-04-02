import { combineReducers } from 'redux';
import user from './userReducer';
import query from './queryReducer';

export default combineReducers({
  user: user,
  query: query
});
