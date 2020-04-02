import { query } from '../api';
import axios from 'axios';
import { FETCH_USER, FETCH_MAP_QUERY } from './type';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/auth/google/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchQuery = id => async dispatch => {
  const res = await query.get(
    `/geoDataQuery?q=%7Bv%3A%221%2E0%2E0%22%2Cid%3A%22${id}%22%2Clang%3A%22ALL%22%7D`,
    { crossdomain: true }
  );
  dispatch({ type: FETCH_MAP_QUERY, payload: res.data });
};
