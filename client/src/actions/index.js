import { query } from '../api';
import axios from 'axios';
import { isUndefined } from 'lodash';
import history from '../component/History';

import {
  FETCH_USER,
  FETCH_MAP_QUERY,
  UPDATE_USER,
  ERR_USER_MISSING,
  HANDLE_TOKEN,
  ERR_REDIRECT,
} from './type';

export const fetchUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/auth/google/current_user');
    console.log(res);
    dispatch({ type: FETCH_USER, payload: res.data.data });
    dispatch({ type: HANDLE_TOKEN, payload: res.data.token });
  } catch (error) {
    console.log(error);
  }
};

export const fetchQuery = (id) => async (dispatch) => {
  try {
    const res = await query.get(
      `/geoDataQuery?q=%7Bv%3A%221%2E0%2E0%22%2Cid%3A%22${id}%22%2Clang%3A%22ALL%22%7D`,
      { crossdomain: true }
    );
    dispatch({ type: FETCH_MAP_QUERY, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const updateUserFav = (userFav, token, origin) => async (dispatch) => {
  try {
    const res = await axios.post('/map', userFav, {
      headers: { authorization: `Bearer ${token}` },
    });
    // console.log(res);
    dispatch({ type: UPDATE_USER, payload: res.data });
  } catch (error) {
    errorHandleHelper(error, dispatch, origin);
  }
};

export const updateUserInfo = (userInfo, token, origin) => async (dispatch) => {
  try {
    const res = await axios.post('/user', userInfo, {
      headers: { authorization: `Bearer ${token}` },
    });
    dispatch({ type: FETCH_USER, payload: res.data.data });
    dispatch({ type: HANDLE_TOKEN, payload: res.data.token });
    dispatch({
      type: ERR_REDIRECT,
      payload: {
        origin,
        message: 'User Data has been updated!',
      },
    });
    history.push('/errorredirect');
  } catch (error) {
    errorHandleHelper(error, dispatch, origin);
  }
};

const errorHandleHelper = async (error, dispatch, origin) => {
  if (!isUndefined(error.response.data.Error)) {
    // Token missing or invalid
    dispatch({ type: ERR_USER_MISSING });
    // console.log(origin);
    isUndefined(origin) ||
      dispatch({
        type: ERR_REDIRECT,
        payload: {
          origin,
          message: 'Login credential is invalid, Please re-login. ',
        },
      });
    history.push('/errorredirect');
    // await axios.get('/auth/google/errorredirect');
  } else {
    // Catch all
    console.log(error.response);
    console.log(error.request);
  }
};
