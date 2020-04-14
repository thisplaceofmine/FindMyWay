import { HANDLE_TOKEN } from '../actions/type';

export default (state = '', action) => {
  switch (action.type) {
    case HANDLE_TOKEN:
      return action.payload || '';
    default:
      return state;
  }
};
