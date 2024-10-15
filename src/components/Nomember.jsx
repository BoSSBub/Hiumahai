import React, { useEffect, useState } from 'react';
import './Nomember.css'; 
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import axios for API call

function Nomember() {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { userId } = location.state || {};  // Get userId from location state
  const [userDetails, setUserDetails] = useState(null);  // State for storing user details
  const defaultProfileImg = "default-profile-image-url"; 

  // Fetch user details when component mounts
  useEffect(() => {
    if (userId) {
      axios.get(`https://localhost:7078/api/Users/details/${userId}`)
        .then(response => {
          setUserDetails(response.data);
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
        });
    }
  }, [userId]);

  if (!userDetails) {
    return <div>Loading...</div>;  // Show loading if data is not available yet
  }

  const { username, email, userimg, role } = userDetails;
  const profileImageSrc = userimg ? `data:image/jpeg;base64,${userimg}` : defaultProfileImg;

  const handleRegisterClick = () => {
    navigate('/register-seller', {
      state: { userDetails },  // ส่ง userDetails ทั้งหมด
    });
  };

  return (
    <div className="outer-container">
      <div className="noprofile-container">
        <div className="profile-header">
          <div className="username">{username}</div>
          <img src={profileImageSrc} alt="profile" className="profile-image1" />
        </div>
        <div className="buttons">
          {role !== 'Merchant' ? (
            <button className="btn-primary" onClick={handleRegisterClick}>
              <img src="src/img/shop1.png" alt="Shop" className="iconnomember" /> {/* เปลี่ยนเป็น shop1.png */}
              <span className="btn-text">สมัครเป็นผู้รับหิ้ว</span>
            </button>
          ) : (
            <button className="btn-primary-merchant">
              <img src="src/img/shop1.png" alt="Shop" className="iconnomember-merchant" /> {/* เปลี่ยนเป็น shop1.png */}
              <span className="btn-text-merchant">รับหิ้วของฉัน</span>
            </button>
          )}

          <button className="btn-secondary">
            <img src="src/img/problem.png" alt="Problem" className="iconnomember" /> {/* เปลี่ยนเป็น problem.png */}
            <span className="btn-text">แจ้งปัญหา</span>
          </button>
        </div>
        <div className="bottom-section">
          <button className="btn-logout">
          {/* คุณสามารถเปลี่ยนเป็นไอคอน logout */}
            <span className="btn-text">ออกจากระบบ</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Nomember;
