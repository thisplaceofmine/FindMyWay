import React from 'react';
import { NavLink } from 'react-router-dom';

const Dashbroad = () => {
  return (
    <div className='d-flex my-5'>
    <NavLink to='/user' style={{ textDecoration: 'none', width: '50%' }}>
      <button
        className='btn btn-warning btn-lg '
        style={{ fontSize: '50px', width: '100%' }}
      >
        <ion-icon name='person-outline' />
        <br />
        User
      </button>
    </NavLink>
    <NavLink to='/map' style={{ textDecoration: 'none', width: '50%' }}>
      <button
        className='btn btn-success btn-lg '
        style={{ fontSize: '50px', width: '100%' }}
      >
        <ion-icon name='map-outline' />
        <br />
        Map
      </button>
    </NavLink>
  </div>
  );
};

export default Dashbroad;
