import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isNull, isUndefined } from 'lodash';
import { Nav, Navbar, Dropdown } from 'react-bootstrap';

import { fetchUser } from '../actions';
import history from './History';

const Header = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    // eslint-disable-next-line
  }, []);

  const storedata = useSelector((state) => ({
    user: state.user,
  }));

  const initialList = [
    { active: false, direction: '/', name: 'Home' },
    { active: false, direction: '/users', name: 'User' },
    { active: false, direction: '/maps', name: 'Map' },
  ];

  const [list, setList] = useState(initialList);

  const handleHeaderclick = (e) => {
    let value = Number(e.currentTarget.getAttribute('value'));
    let tempArray = [...list];
    tempArray.forEach((e) => (e.active = false));
    tempArray[value].active = true;
    setList(tempArray);
  };

  const renderLoginBotton = () => {
    if (!isNull(storedata.user)) {
      switch (storedata.user) {
        case false:
          return (
            <div className='button'>
              <a href='/auth/google'>Login with google</a>
            </div>
          );
        default:
          return (
            <Dropdown>
              <Dropdown.Toggle>
                Welcome back{' '}
                {isUndefined(storedata.user.name.givenName)
                  ? storedata.user.email
                  : storedata.user.name.givenName}
              </Dropdown.Toggle>
              <Dropdown.Menu className='dropdown-menu-right'>
                <Dropdown.Item
                  onClick={() => {
                    history.push('/users');
                  }}
                >
                  User
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href='/auth/google/logout'>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          );
      }
    } else {
      return <div className='button'>Loading</div>;
    }
  };

  const renderheader = () => {
    return list.map((data, i) => {
      return (
        <Nav.Item className='' key={i}>
          <Link
            className='nav-link'
            to={data.direction}
            value={i}
            onClick={handleHeaderclick}
          >
            {data.name}
          </Link>
        </Nav.Item>
      );
    });
  };

  return (
    <div className='container'>
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand>Find My Way</Navbar.Brand>
        <Navbar.Collapse id='header'>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Nav className='mr-auto'>{renderheader()}</Nav>
        </Navbar.Collapse>
        <div>{renderLoginBotton()}</div>
      </Navbar>
    </div>
  );
};

export default Header;
