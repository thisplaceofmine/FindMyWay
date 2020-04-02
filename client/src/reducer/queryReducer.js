import { FETCH_MAP_QUERY } from '../actions/type';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_MAP_QUERY:
      return { ...action.payload };
    default:
      return state;
  }
};
