import React from 'react'
import './Nomember.css'; // Ensure this CSS file has the styles as outlined below.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faExclamationCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Import icons

function Nomember() {
  return (
    <div className="outer-container">
    <div className="noprofile-container">
      <div className="profile-header">
      <div className="username">nongbosssy</div>
        <img src="profile-image-url" alt="profile" className="profile-image" />
      </div>
      <div className="buttons">
        <button className="btn-primary">
          <FontAwesomeIcon icon={faShoppingCart} className="iconnomember" />
          <span className="btn-text">สมัครเป็นผู้รับหิ้ว</span>
        </button>
        <button className="btn-secondary">
          <FontAwesomeIcon icon={faExclamationCircle} className="iconnomember" />
          <span className="btn-text">แจ้งปัญหา</span>
        </button>
      </div>
      <div className="bottom-section">
        <button className="btn-logout">
          <span className="btn-text">ออกจากระบบ</span>
        </button>
      </div>
    </div>
  </div>
);
}

export default Nomember