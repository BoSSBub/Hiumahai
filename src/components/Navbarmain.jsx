// Navbarmain.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext'; // Import UserContext
import './Navbarmain.css';

const Navbarmain = () => {
  const { userDetails } = useContext(UserContext); // Get userDetails from context
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="src/img/logo.png" alt="HIUMAHI" className="logoImg" />
      </div>
      <ul className="menu">
        <li><Link to="/">หน้าหลัก</Link></li>
        <li><Link to="/promotions">โปรโมชั่น</Link></li>
        <li><Link to="/contact">ติดต่อเรา</Link></li>
        <li><Link to="/orders">การซื้อของฉัน</Link></li>
      </ul>
      <div className="searchBar">
        <div className="search-container">
          <input
            placeholder="Search..."
            className="search-input"
            name="search"
            type="search"
          />
          <svg
            className="search-icon"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
          </svg>
        </div>
      </div>
      <div className="icons">
      <button className="iconButton" onClick={() => navigate('/basket')}>
          <img src="src/img/shop.png" alt="Shop" className="iconImg" />
        </button>
        {/* Display user name if logged in */}
        <p>{userDetails ? userDetails.username : ''}</p>
        <button className="iconButton" onClick={() => navigate('/login')}>
          <img src="src/img/user3.png" alt="User" className="iconImg" />
        </button>
      </div>
    </nav>
  );
};

export default Navbarmain;
