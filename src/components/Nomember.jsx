import React, { useEffect, useState } from 'react';
import './Nomember.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faExclamationCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; 
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
          <img src={profileImageSrc} alt="profile" className="profile-image" />
        </div>
        <div className="buttons">
          {role !== 'Merchant' ? (
            <button className="btn-primary" onClick={handleRegisterClick}>
              <FontAwesomeIcon icon={faShoppingCart} className="iconnomember" />
              <span className="btn-text">สมัครเป็นผู้รับหิ้ว</span>
            </button>
          ) : (
            <button className="btn-primary-merchant">
              <FontAwesomeIcon icon={faShoppingCart} className="iconnomember-merchant" />
              <span className="btn-text-merchant">รับหิ้วของฉัน</span>
            </button>
          )}

          <button className="btn-secondary">
            <FontAwesomeIcon icon={faExclamationCircle} className="iconnomember" />
            <span className="btn-text">แจ้งปัญหา</span>
          </button>
        </div>
        <div className="bottom-section">
          <button className="btn-logout">
            <FontAwesomeIcon icon={faSignOutAlt} className="iconnomember" />
            <span className="btn-text">ออกจากระบบ</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Nomember;
