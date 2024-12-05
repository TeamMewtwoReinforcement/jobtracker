import React from "react";
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
      <div className='navbar bg-base-100'>
        <div className='navbar-start'>
          <a className='btn btn-ghost text-3xl'>NxtMove</a>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal px-1 text-xl'>
          <li>
              <Link to="/dashboard">My Dashboard</Link>
            </li>
            <li>
              <Link to="/job-list">My Job List</Link>
            </li>
            <li>
              <Link to="/contacts">Contacts</Link>
            </li>
          </ul>
        </div>
        <div className='navbar-end'>
          <a className='btn'>Login</a>
        </div>
      </div>
  );
};

export default Header;
