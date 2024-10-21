import React, { useContext, useEffect, useState } from 'react';
import './Nomember.css'; 
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';  // Import UserContext

function Nomember() {
    const location = useLocation();
    const navigate = useNavigate();
    const { userDetails, setUserDetails } = useContext(UserContext);  // Get user details and context setter
    const [userInfo, setUserInfo] = useState(userDetails || null);  

    const defaultProfileImg = "https://via.placeholder.com/150";  

    // Fetch user details if not available in context
    useEffect(() => {
        if (!userInfo && userDetails?.userId) {
            axios.get(`https://localhost:7078/api/Users/details/${userDetails.userId}`)
                .then(response => setUserInfo(response.data))
                .catch(error => console.error('Error fetching user details:', error));
        }
    }, [userInfo, userDetails]);

    if (!userInfo) return <div>Loading...</div>;

    const { username, email, userimg, role } = userInfo;
    const profileImageSrc = userimg
        ? `data:image/jpeg;base64,${userimg}`
        : defaultProfileImg;

    const handleLogout = () => {
        localStorage.removeItem('authToken');  // Clear token from local storage
        setUserDetails(null);  // Clear user details from context
        navigate('/login');  // Navigate to login page
    };

    const handleRegisterClick = () => {
        navigate('/register-seller', { state: { userDetails: userInfo } });
    };
    const handleNavigateToMyHiu = () => {
        navigate('/myhiu', { state: { userDetails: userInfo } });
    };

    return (
        <div className="outer-container">
            <div className="noprofile-container">
                <div className="profile-header">
                    <div className="username">{username}</div>
                    <img src={profileImageSrc} alt="Profile" className="profile-image1" />
                </div>

                <div className="buttons">
                    {role !== 'Merchant' ? (
                        <button className="btn-primary" onClick={handleRegisterClick}>
                            <img src="/src/img/shop1.png" alt="Shop" className="iconnomember" />
                            <span className="btn-text">สมัครเป็นผู้รับหิ้ว</span>
                        </button>
                    ) : (
                        <button className="btn-primary-merchant" onClick={handleNavigateToMyHiu}>
                            <img src="/src/img/shop1.png" alt="Shop" className="iconnomember-merchant" />
                            <span className="btn-text-merchant">รับหิ้วของฉัน</span>
                        </button>
                    )}

                    <button className="btn-secondary">
                        <img src="/src/img/problem.png" alt="Problem" className="iconnomember" />
                        <span className="btn-text">แจ้งปัญหา</span>
                    </button>
                </div>

                <div className="bottom-section">
                    <button className="btn-logout" onClick={handleLogout}>
                        <span className="btn-text">ออกจากระบบ</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Nomember;
