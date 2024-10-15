import React, { useState } from 'react';
import './Login.css';
import logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';

// นำเข้ารูปภาพจากโฟลเดอร์ src/img
import userIcon from "../img/user2.png";
import lockIcon from "../img/lock.png";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload
    try {
      const response = await fetch('https://localhost:7078/api/Users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // If login is successful, pass user data to Nomember page
        if (data.message === "Login successful") {
          navigate('/nomember', {
            state: {
              userId: data.users_id,
              username: data.username,
              email: data.email,
              userimg: data.userimg,
              role: data.role,
            }
          });
        } else {
          setErrorMessage("Invalid login credentials");
        }
      } else {
        setErrorMessage("Failed to login");
      }
    } catch (error) {
      setErrorMessage("An error occurred");
    }
  };

  return (
    <div className="outer-container">
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Login</h2>
          <div className="login-logo">
            <img src={logo} alt="logo" />
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-container">
              <img src={userIcon} alt="User" className="iconlogin" /> {/* ใช้รูปภาพ user2.png */}
              <input
                type="email"
                className="login-input"
                placeholder="กรุณกรอกอีเมล"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <img src={lockIcon} alt="Lock" className="iconlogin" /> {/* ใช้รูปภาพ lock.png */}
              <input
                type="password"
                className="login-input"
                placeholder="กรุณากรอกรหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="button-group">
              <button type="submit" className="btn login-btn">เข้าสู่ระบบ</button>
              <a
                href="#"
                className="register-link"
                onClick={() => navigate('/register')}
              >
                ลงทะเบียน
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
