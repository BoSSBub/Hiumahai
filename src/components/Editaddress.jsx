import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Editaddresspayment.css'; // Ensure to use the correct CSS file

function Editaddress() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addressInfo, procurementDetails } = location.state || {};

  const [email, setEmail] = useState(addressInfo?.email || '');
  const [phone, setPhone] = useState(addressInfo?.addresl_Phone || '');
  const [address, setAddress] = useState(addressInfo?.addres || '');
  const [addressName, setAddressName] = useState(addressInfo?.addres_name || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedAddress = {
      email,
      addres: address,
      addres_name: addressName,
      addresl_Phone: phone,
    };
  
    try {
      const response = await fetch('https://localhost:7078/api/Procurement/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAddress),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update address');
      }

      // Ensure to include procurement parameters when navigating back
      navigate('/carryproduct', { 
        state: { 
          addressInfo: updatedAddress, 
          procurement_Email: procurementDetails?.procurement_Email,
          merchant_id: procurementDetails?.merchant_id,
          merchant_Product_ID: procurementDetails?.merchant_Product_ID,
          quantity: procurementDetails?.quantity
        } 
      });
    } catch (err) {
      console.error('Error updating address:', err);
    }
  };

  return (
    <div className="editaddress-container">
      <div className="editaddress-form-container">
        <div className="editaddress-title">
          ที่อยู่สำหรับจัดส่ง
        </div>
        {addressInfo ? (
          <form onSubmit={handleSubmit} className="editaddress-form">
            <div className="editaddress-field">
              <span className="editaddress-label">หมายเลขโทรศัพท์:</span>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="editaddress-input"
              />
            </div>
            <div className="editaddress-field">
              <span className="editaddress-label">ที่อยู่:</span>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="editaddress-input"
              />
            </div>
            <div className="editaddress-field">
              <span className="editaddress-label">ชื่อ-นามสกุล:</span>
              <input
                type="text"
                value={addressName}
                onChange={(e) => setAddressName(e.target.value)}
                className="editaddress-input"
              />
            </div>
            <button type="submit" className="editaddress-submit-button">ยืนยัน</button>
          </form>
        ) : (
          <p className="editaddress-noinfo">No address info available.</p>
        )}
      </div>
    </div>
  );
}

export default Editaddress;
