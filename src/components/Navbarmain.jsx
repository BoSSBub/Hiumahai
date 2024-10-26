// Navbarmain.jsx
import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext'; // Import UserContext
import './Navbarmain.css';

const Navbarmain = () => {
  const { userDetails } = useContext(UserContext); // Get userDetails from context
  const navigate = useNavigate();
  const [itemCount, setItemCount] = useState(0); // Item count state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchProcurementInfo = async () => {
      if (!userDetails || !userDetails.email) {
        setError('');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://localhost:7078/api/Procurement/by-email?email=${userDetails.email}`);
        
        if (!response.ok) {
          throw new Error('');
        }

        const data = await response.json();
        
        // Calculate the count of items
        const itemCount = data.length;

        // Set the state with the item count
        setItemCount(itemCount);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProcurementInfo();
  }, [userDetails]);

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
          {/* Show item count in the basket icon */}
          <span className="itemCount">{itemCount}</span>
        </button>
        {/* Display user name if logged in */}
        <div className='accout'>{userDetails ? userDetails.username : ''}</div>
        <button className="iconButton" onClick={() => navigate('/login')}>
          <img src="src/img/user3.png" alt="User" className="iconImg" />
        </button>
      </div>
    </nav>
  );
};

export default Navbarmain;
