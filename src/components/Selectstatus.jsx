// Selectstatus.js
import React from 'react';
import { Link } from 'react-router-dom';

function StatusIcon({ icon, label, linkTo }) {
  return (
    <Link to={linkTo} style={{ textDecoration: 'none', color: 'inherit', textAlign: 'center' }}>
      <div style={{ cursor: 'pointer', textAlign: 'center' }}>
        <img src={icon} alt={label} style={{ width: '50px', height: '50px' }} />
        <p>{label}</p>
      </div>
    </Link>
  );
}

function Selectstatus() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' , color: 'black' }}>
      <StatusIcon icon="/path/to/icon1.png" label="รอจ่ายเงิน" linkTo="/waitingpayment" />
      <StatusIcon icon="/path/to/icon2.png" label="ที่ต้องจัดส่ง" linkTo="/delivery" />
      <StatusIcon icon="/path/to/icon3.png" label="ที่ต้องได้รับ" linkTo="/received" />
      <StatusIcon icon="/path/to/icon4.png" label="รับเงินคืน" linkTo="/refund" />
      <StatusIcon icon="/path/to/icon5.png" label="สำเร็จ" linkTo="/complete" />
      <StatusIcon icon="/path/to/icon6.png" label="ยกเลิก" linkTo="/abrogate" />
    </div>
  );
}

export default Selectstatus;
