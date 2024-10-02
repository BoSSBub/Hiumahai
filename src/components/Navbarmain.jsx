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
        <input type="text" placeholder="ค้นหาสินค้า, แบรนด์" className="input" />
        <button type="submit" className="searchButton">🔍</button>
      </div>
      <div className="icons">
        <button className="iconButton">🛒</button>
        <button className="iconButton" onClick={() => navigate('/login')}>👤</button> {/* เพิ่ม navigate ในปุ่มนี้ */}
      </div>
    </nav>
  );
};

export default Navbarmain;
