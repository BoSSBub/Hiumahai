import React, { useState, useContext, useEffect } from 'react'; 
import './Login.css';
import logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import userIcon from "../img/user2.png";
import lockIcon from "../img/lock.png";
import { UserContext } from './UserContext';  

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { userDetails, setUserDetails } = useContext(UserContext);  // Access userDetails from context
  const navigate = useNavigate();

  // Redirect if userDetails already exist
  useEffect(() => {
    if (userDetails) {
      console.log('User already logged in:', userDetails);  // Optional: For debugging
      navigate('/nomember', { state: { userDetails } });  // Redirect with user details
    }
  }, [userDetails, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:7078/api/Users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === 'Login successful') {
          localStorage.setItem('authToken', data.tokenString);

          const user = {
            userId: data.users_id,
            username: data.username,
            email: data.email,
            userimg: data.userimg,
            role: data.role,
          };

          setUserDetails(user);  // Store user details in context
          navigate('/nomember', { state: { userDetails: user } });  // Redirect after login
        } else {
          setErrorMessage('Invalid login credentials');
        }
      } else {
        setErrorMessage('Failed to login');
      }
    } catch (error) {
      setErrorMessage('An error occurred');
      console.error('Error during login:', error);
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
              <img src={userIcon} alt="User" className="iconlogin" />
              <input
                type="email"
                className="login-input"
                placeholder="กรุณากรอกอีเมล"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <img src={lockIcon} alt="Lock" className="iconlogin" />
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
