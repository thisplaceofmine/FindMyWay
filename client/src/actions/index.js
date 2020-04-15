import { query, server } from '../api';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import {
  FETCH_USER,
  FETCH_MAP_QUERY,
  UPDATE_USER,
  ERR_USER_MISSING,
  HANDLE_TOKEN,
} from './type';

export const fetchUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/auth/google/current_user');
    const decodeData = jwt.decode(res.data);
    dispatch({ type: FETCH_USER, payload: decodeData.user });
    dispatch({ type: HANDLE_TOKEN, payload: res.data });
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

export const updateUserFav = (userFav, errCB, token) => async (dispatch) => {
  // console.log({"action ": userFav});
  try {
    const res = await server.post('/map', userFav, {
      headers: { authorization: `Bearer ${token}` },
    });
    // console.log(res);
    dispatch({ type: UPDATE_USER, payload: res.data });
  } catch (error) {
    console.log(error.response);
    if (error.response.status === 401 || error.response.status === 403) {
      console.log(error.response.data);
      dispatch({type: ERR_USER_MISSING})
      return errCB(error.response.data);
    } else {
      console.log(error.response);
      console.log(error.request);
    }
  }
};

export const updateUserInfo = (userInfo, token)=> async dispatch=>{
  try{
    const res = await server.post('/user', userInfo, {headers:{authorization: `Bearer ${token}`}})
    const decodeData = jwt.decode(res.data);
    dispatch({ type: FETCH_USER, payload: decodeData.user });
    dispatch({ type: HANDLE_TOKEN, payload: res.data }); 
  } catch(err){
    console.log(err)
  }
}
