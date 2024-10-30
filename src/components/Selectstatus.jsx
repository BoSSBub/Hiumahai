import React from 'react';
import { Link } from 'react-router-dom';

// Import รูปภาพ
import waitIcon from '../img/wait.png';
import dailIcon from '../img/dail.png';
import cardailIcon from '../img/cardail.png';
import refundIcon from '../img/refun.png';
import paymentIcon from '../img/playment.png';
import cancelIcon from '../img/cancle.png';

function StatusIcon({ icon, label, linkTo }) {
  return (
    <Link to={linkTo} style={{ textDecoration: 'none', color: 'inherit', textAlign: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          border: '2px solid #000',
          marginBottom: '0.5rem'
        }}>
          <img src={icon} alt={label} style={{ width: '40px', height: '40px' }} />
        </div>
        <p style={{ fontSize: '0.875rem', color: 'black', textAlign: 'center' }}>{label}</p>
      </div>
    </Link>
  );
}

function Selectstatus() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px', color: 'black' }}>
      <StatusIcon icon={waitIcon} label="รอจ่ายเงิน" linkTo="/waitingpayment" />
      <StatusIcon icon={dailIcon} label="ที่ต้องจัดส่ง" linkTo="/delivery" />
      <StatusIcon icon={cardailIcon} label="ที่ต้องได้รับ" linkTo="/received" />
      <StatusIcon icon={refundIcon} label="รับเงินคืน" linkTo="/refund" />
      <StatusIcon icon={paymentIcon} label="สำเร็จ" linkTo="/complete" />
      <StatusIcon icon={cancelIcon} label="ยกเลิก" linkTo="/abrogate" />
    </div>
  );
}

export default Selectstatus;
