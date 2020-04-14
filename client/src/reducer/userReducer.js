import { FETCH_USER, UPDATE_USER, ERR_USER_MISSING } from '../actions/type';

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
    case UPDATE_USER:
      return action.payload || false;
    case ERR_USER_MISSING:
      return false;
    default:
      return state;
  }
};
