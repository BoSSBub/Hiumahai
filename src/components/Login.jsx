import React from 'react';
import './Login.css';  
import logo from "../assets/logo.png"; // ปรับให้เส้นทางถูกต้อง
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate

function Login() {
  const navigate = useNavigate(); // สร้างตัวแปร navigate

  return (
    <div className="outer-container"> {/* เพิ่ม div นี้เพื่อจัดกลาง */}
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Login</h2>
          <div className="login-logo">
            <img src={logo} alt="logo" />
          </div>
          <form className="login-form">
            <div className="input-container">
              <FontAwesomeIcon icon={faUser} className="iconlogin" />
              <input type="email" className="login-input" placeholder="กรุณกรอกอีเมล" required />
            </div>
            <div className="input-container">
              <FontAwesomeIcon icon={faLock} className="iconlogin" />
              <input type="password" className="login-input" placeholder="กรุณากรอกรหัสผ่าน" required />
            </div>
            <div className="button-group">
              <button type="submit" className="btn login-btn">เข้าสู่ระบบ</button>
              <button 
                type="button" 
                className="btn register-btn" 
                onClick={() => navigate('/register')}  // ใช้ navigate เพื่อเปลี่ยนหน้า
              >
                ลงทะเบียน
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
