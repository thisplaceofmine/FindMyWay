import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Form, Col, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import { updateUserInfo } from '../actions';

const UserInfoPage = (props) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState();

  const storedata = useSelector((state) => ({
    user: state.user,
    token: state.token,
  }));

  useEffect(() => {
    setUser(storedata.user);
  }, [storedata.user]);

  const handleFormSubmit = () => {
    dispatch(updateUserInfo(user, storedata.token));
  };

  const userinfo = () => {
    return (
      <div className='container-fluid my-auto'>
        <h2 className='text-center my-6'> PlaceHolder Header</h2>
        {/* <button
          className='btn btn-danger'
          onClick={() => {
            console.log(user);
          }}
        >
          Debug
        </button> */}
        <Form autoComplete=''>
          <Form.Row>
            <Form.Group as={Col} md='6' controlId='validationCustom01'>
              <Form.Label>Given Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Given Name'
                value={user.name.givenName || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  setUser((prevState) => ({
                    ...prevState,
                    name: { ...prevState.name, givenName: value },
                  }));
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md='6' controlId='validationCustom02'>
              <Form.Label>Family Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Family Name'
                value={user.name.familyName || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  setUser((prevState) => ({
                    ...prevState,
                    name: { ...prevState.name, familyName: value },
                  }));
                }}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md='4' controlId='validationCustom03'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='text'
                placeholder='Email'
                disabled
                value={user.email}
              />
            </Form.Group>
            <Form.Group as={Col} md='4' controlId='validationCustom03'>
              <Form.Label>Profile Created</Form.Label>
              <Form.Control
                type='text'
                placeholder='Profile Created'
                disabled
                value={dayjs(user.createdAt).format('DD MMMM YYYY hh:mm:ss a')}
              />
            </Form.Group>
            <Form.Group as={Col} md='4' controlId='validationCustom03'>
              <Form.Label>Profile Last Edited </Form.Label>
              <Form.Control
                type='text'
                placeholder='Profile Last Edited '
                disabled
                value={dayjs(user.updatedAt).format('DD MMMM YYYY hh:mm:ss a')}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group
              as={Col}
              md='11'
              controlId='validationCustom04'
            ></Form.Group>
            <Form.Group as={Col} md='1' controlId='validationCustom05'>
              <Button varient='primary' onClick={handleFormSubmit}>
                Submit
              </Button>
            </Form.Group>
          </Form.Row>
        </Form>
      </div>
    );
  };

  const requestLogin = () => {
    return (
      <div className='container-fluid'>
        <div className=' mx-auto my-4 '>
          <h2 className='text-center'>You must Login to continue.</h2>
        </div>
      </div>
    );
  };

  return !isEmpty(user) ? userinfo() : requestLogin();
};
export default UserInfoPage;
