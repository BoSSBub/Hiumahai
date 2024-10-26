import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import './Cancelpayment.css';

function Cancelpayment() {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize the navigate function
  const { procurement_id } = location.state || {};
  const [reason, setReason] = useState('');
  const [paymentStatus] = useState('ยังไม่ได้ชำระเงิน'); // Default payment status in Thai

  const handleCancel = async () => {
    console.log("Cancelled");
  };

  const handleConfirm = async () => {
    console.log("Confirmed", { reason, paymentStatus });

    // Show confirmation dialog
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
      // Prepare the cancel object
      const cancelData = {
        Procurement_id: procurement_id, // Adjusted case if necessary
        Cancel_reason: reason, // Adjusted case if necessary
        OrderStatus: 5 // Adjust this if your API expects a different name
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
          const errorText = await response.text(); // Capture the error response
          throw new Error(`Network response was not ok: ${errorText}`);
        }

        const data = await response.json();
        console.log(data); // Handle the response as needed

        // Show success message
        Swal.fire('สำเร็จ!', 'คำสั่งซื้อของคุณถูกยกเลิกแล้ว.', 'success').then(() => {
          // Redirect to the Abrogate page after the alert is closed
          navigate('/abrogate', {
            state: {
                id: procurement_id,
            },
          }); // Update the route to your specific route
      });

      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        Swal.fire('สำเร็จ!', 'คำสั่งซื้อของคุณถูกยกเลิกแล้ว.', 'success').then(() => {
            // Redirect to the Abrogate page after the alert is closed
            navigate('/abrogate', {
                state: {
                    id: procurement_id,
                },
              }); // Update the route to your specific route
          });
      }
    }
  };

  return (
    <div className="main_Cancelpayment">
      <h2>ยกเลิกคำสั่งซื้อ</h2>
      <div className="form-group">
        <label>เหตุผล</label>
        <input
          type="text"
          placeholder="ต้องการแก้ไขรายละเอียดคำสั่งซื้อ (สี, จำนวน, ขนาด)"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>ช่องทางการชำระเงิน</label>
        <input
          type="text"
          value={paymentStatus}
          readOnly
        />
      </div>
      <div className="button-group">
        <button className="cancel-button" onClick={handleCancel}>ยกเลิก</button>
        <button className="confirm-button" onClick={handleConfirm}>ยืนยัน</button>
      </div>
    </div>
  );
}

export default Cancelpayment;
