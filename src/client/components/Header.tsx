import React, { useState } from "react";
import { Link } from 'react-router-dom';
import SignUpForm from "./SignUp.tsx";

const Header: React.FC = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const openModal = () => setIsPopUpOpen(true);

  const closeModal = () => setIsPopUpOpen(false);

  return (
    <div>
      {/* Navbar */}
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <a className="btn btn-ghost text-3xl">NxtMove</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-xl">
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
        <div className="navbar-end">
          <div className="flex space-x-2">
            <Link to="/login" className="btn">
              Login
            </Link>
            <button onClick={openModal} className="btn">
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Conditionally render the Sign Up modal */}
      {isPopUpOpen && <SignUpForm closeModal={closeModal} />}
    </div>
  );
};

export default Header;
