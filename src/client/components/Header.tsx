import React from "react";

const Header: React.FC = () => {
  return (
      <div className='navbar bg-base-100 border-red-500'>
        <div className='navbar-start border-red-500'>
          <a className='btn btn-ghost text-xl'>NxtMove</a>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal px-1'>
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
