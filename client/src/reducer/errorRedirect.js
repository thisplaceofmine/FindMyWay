import { ERR_REDIRECT, ERR_REDIRECT_RESET } from '../actions/type';

const initErrState = { origin: '/', message: '' };

export default (state = initErrState, action) => {
  switch (action.type) {
    case ERR_REDIRECT:
      return action.payload || initErrState;
    case ERR_REDIRECT_RESET:
      return initErrState;
    default:
      return state;
  }
};
