import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Cancelpayment.css';

function Cancelpayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { procurement_id } = location.state || {};
  const [reason, setReason] = useState('');
  const [paymentStatus] = useState('ยังไม่ได้ชำระเงิน');

  const handleCancel = () => {
    console.log("Cancelled");
  };

  const handleConfirm = async () => {
    const result = await Swal.fire({
      title: 'ยืนยันการยกเลิก?',
      text: "คุณต้องการยกเลิกคำสั่งซื้อนี้หรือไม่?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    });

    if (result.isConfirmed) {
      const cancelData = {
        Procurement_id: procurement_id,
        Cancel_reason: reason,
        OrderStatus: 5
      };

      try {
        const response = await fetch('https://localhost:7078/api/Procurement/cancel', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cancelData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${errorText}`);
        }

        Swal.fire('สำเร็จ!', 'คำสั่งซื้อของคุณถูกยกเลิกแล้ว.', 'success').then(() => {
          navigate('/abrogate', { state: { id: procurement_id } });
        });

      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        Swal.fire('ไม่สำเร็จ!', 'การยกเลิกคำสั่งซื้อมีปัญหา. กรุณาลองใหม่.', 'error');
      }
    }
  };

  return (
    <div className="cancelpayment-container">
      <h2 className="cancelpayment-title">ยกเลิกคำสั่งซื้อ</h2>
      <div className="cancelpayment-form-group">
        <label className="cancelpayment-label">เหตุผล</label>
        <input
          type="text"
          placeholder="ต้องการแก้ไขรายละเอียดคำสั่งซื้อ (สี, จำนวน, ขนาด)"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="cancelpayment-input"
        />
      </div>
      <div className="cancelpayment-form-group">
        <label className="cancelpayment-label">ช่องทางการชำระเงิน</label>
        <input
          type="text"
          value={paymentStatus}
          readOnly
          className="cancelpayment-input"
        />
      </div>
      <div className="cancelpayment-button-group">
        <button className="cancelpayment-cancel-button" onClick={handleCancel}>ยกเลิก</button>
        <button className="cancelpayment-confirm-button" onClick={handleConfirm}>ยืนยัน</button>
      </div>
    </div>
  );
}

export default Cancelpayment;
