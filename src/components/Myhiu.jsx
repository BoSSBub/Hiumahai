import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faShoppingBag, faCopy } from '@fortawesome/free-solid-svg-icons';
import './Myhiu.css';

function Myhiu() {
    const location = useLocation();
    const navigate = useNavigate();  
    const { userDetails } = location.state || {};
    const { username, userimg } = userDetails || {}; 

    const defaultProfileImg = "https://via.placeholder.com/60";
    const profileImageSrc = userimg 
        ? `data:image/jpeg;base64,${userimg}` 
        : defaultProfileImg;

    const handleNavigateToAllhiu = () => {
        navigate('/allhiu', { state: { userDetails } }); 
    };

    const handleNavigateToAddProduct = () => {
        navigate('/addproduct', { state: { userDetails } });
    };
    const handleNavigateTomanageproduct = () => {
        navigate('/manageproduct', { state: { userDetails } });
    };

    const handleCopy = () => {
        const link = "https://hiumahai.co.th/nongbosssy";
        navigator.clipboard.writeText(link);
    };

    const handleStatusClick = (page) => {
        navigate(page, { state: { userDetails } });
    };

    return (
        <div className="container">
            {/* Profile Section */}
            <div className="profile-section">
                <div className="profile-info">
                    <img
                        src={profileImageSrc}
                        alt="Profile"
                        className="profile-image"
                    />
                    <div className="profile-details">
                        <h2 className="profile-name">{username || 'User'}</h2>
                        <div className="profile-link-container">
                            <a
                                href="https://hiumahai.co.th/nongbosssy"
                                className="profile-link"
                            >
                                hiumahai.co.th/nongbosssy
                            </a>
                            <button className="copy-button" onClick={handleCopy}>
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                    </div>
                </div>
                <button className="store-button" onClick={handleNavigateToAllhiu}>
                    ดูร้านค้า
                </button>
            </div>

            {/* Order Status Section */}
            <div className="order-status-section">
                <div className="status-header">
                    <h3 className="section-title">สถานะคำสั่งซื้อ</h3>
                    <div className="view-history">ดูประวัติรายการ &gt;</div>
                </div>

                <div className="status-grid">
                    <div className="status-item" onClick={() => handleStatusClick('/delivery')}>
                        <div className="status-count">0</div>
                        <p className="status-label">ที่ต้องจัดส่ง</p>
                    </div>
                    <div className="status-item" onClick={() => handleStatusClick('/cancelled')}>
                        <div className="status-count">0</div>
                        <p className="status-label">ที่ถูกยกเลิก</p>
                    </div>
                    <div className="status-item" onClick={() => handleStatusClick('/returns')}>
                        <div className="status-count">0</div>
                        <p className="status-label">ที่คืนเงิน/คืนสินค้า</p>
                    </div>
                    <div className="status-item" onClick={() => handleStatusClick('/reviews')}>
                        <div className="status-count review">3</div>
                        <p className="status-label">รีวิว</p>
                    </div>
                </div>
            </div>

            {/* Actions Section */}
            <div className="action-section">
                <button className="action-item" onClick={handleNavigateToAddProduct}> 
                    <div className="action-icon">
                        <FontAwesomeIcon icon={faBoxOpen} className="iconmyhiu" />
                    </div>
                    <p className="action-label">เพิ่มสินค้าใหม่</p>
                </button>
                <button className="action-item" onClick={handleNavigateTomanageproduct}>
                    <div className="action-icon">
                        <FontAwesomeIcon icon={faShoppingBag} className="iconmyhiu" />
                    </div>
                    <p className="action-label">จัดการสินค้า</p>
                </button>
            </div>
        </div>
    );
}

export default Myhiu;
