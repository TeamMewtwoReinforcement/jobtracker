import React from "react";

const Header: React.FC = () => {
  return (
      <div className='navbar bg-base-100'>
        <div className='navbar-start'>
          <a className='btn btn-ghost text-3xl'>NxtMove</a>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal px-1 text-xl'>
          <li>
              <a>My Dashboard</a>
            </li>
            <li>
              <a>My Job List</a>
            </li>
            <li>
              <a>Contacts</a>
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
