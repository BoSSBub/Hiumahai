import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // นำเข้า useNavigate
import './Navbarmain.css';

const Navbarmain = () => {
  const navigate = useNavigate(); // สร้างตัวแปร navigate

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="src/img/image-removebg-preview (28).png" alt="HIUMAHI" className="logoImg" />
      </div>
      <ul className="menu">
        <li><Link to="/">หน้าหลัก</Link></li>
        <li><Link to="/promotions">โปรโมชั่น</Link></li> {/* Updated to link to promotions page */}
        <li><Link to="/contact">ติดต่อเรา</Link></li>
        <li><Link to="/orders">การซื้อของฉัน</Link></li>
      </ul>
      <div className="searchBar">
      <div class="search-container">
  <input
    placeholder="Search..."
    class="search-input"
    name="search"
    type="search"
  />
  <svg
    class="search-icon"
    stroke="currentColor"
    stroke-width="1.5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      stroke-linejoin="round"
      stroke-linecap="round"
    ></path>
  </svg>
</div>

      </div>
      <div className="icons">
        <button className="iconButton">🛒</button>
        <button className="iconButton" onClick={() => navigate('/login')}>👤</button> {/* เพิ่ม navigate ในปุ่มนี้ */}
        
      </div>
    </nav>
  );
};

export default Navbarmain;
