import React from 'react'
import './Allhiubrand.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons'; // นำเข้าไอคอน copy
function Allhiubrand() {// ฟังก์ชันสำหรับก็อปปี้ลิงก์
const handleCopy = () => {
  const link = "https://hiumahai.co.th/nongbosssy";
  navigator.clipboard.writeText(link);
}

return (
  <div className="container">
    {/* Profile Section */}
    <div className="profile-section">
      <div className="profile-info">
        <img
          src="https://via.placeholder.com/60"
          alt="Profile"
          className="profile-image"
        />
        <div className="profile-details">
          <h2 className="profile-name">nongbosssy</h2>
          <div className="profile-link-container">
            <a href="https://hiumahai.co.th/nongbosssy" className="profile-link">hiumahai.co.th/nongbosssy</a>
            <button className="copy-button" onClick={handleCopy}>
              <FontAwesomeIcon icon={faCopy} />
            </button>
          </div>
        </div>
      </div>
      <button className="edit-button">แก้ไข</button>
    </div>

    {/* Grid Section for Images */}
    <div className='title'><h2>แบรนด์</h2></div>
    
    <div className='orderhiu'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  )
}

export default Allhiubrand