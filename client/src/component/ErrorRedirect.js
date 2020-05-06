import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { ERR_REDIRECT_RESET } from '../actions/type';
const ErrorRedirect = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.errorRedirect);

  useEffect(() => {
    setTimeout(() => {
      history.push(error.origin);
    }, 5000);
    return () => {
      dispatch({ type: ERR_REDIRECT_RESET });
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className='container my-3'>
      <div className='card text-center'>
        <div className='card-body'>
          <div>{error.message}</div>
          <Link to={error.origin} className='card-link'>
            You will be redirected in 5 seconds, or click here if your browser
            does not redirect you.
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ErrorRedirect;
