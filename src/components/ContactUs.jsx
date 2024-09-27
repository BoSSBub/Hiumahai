import React from 'react';
import './ContactUs.css'; // We'll create a CSS file for styling

const ContactUs = () => {
  return (
    <div className="contact-container">
      <h2>ติดต่อเรา</h2>

      <div className="contact-section">
        <h3>บริษัท ฮิ้วมาให้ (HiuMaHai) จำกัด</h3>
        <p><i className="fas fa-map-marker-alt"></i> 199 ม.6 ต.ทุ่งสุขลา อ.ศรีราชา จ.ชลบุรี 20230</p>
      </div>

      <div className="contact-sections">
        <h3>ติดต่อโฆษณา</h3>
        <p><i className="fas fa-envelope"></i> contact@hiumahai.com</p>
      </div>

      <div className="contact-section">
        <h3>ติดต่อสมัครงานเท่านั้น</h3>
        <p><i className="fas fa-phone"></i> 099-980-9999</p>
        <p><i className="fas fa-envelope"></i> hr@hiumahai.com</p>
      </div>
    </div>
  );
};

export default ContactUs;
