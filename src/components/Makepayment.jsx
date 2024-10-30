import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Makepayment.css';
import dollarIcon from '../img/dollar.png';
import imageIcon from '../img/image1.png';

function Makepayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { procurement_Email, merchant_id, merchant_Product_ID, totalPrice, procurement_id, quantity } = location.state || {};
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('Procurement_id', procurement_id);
    formData.append('Finance', totalPrice);
    formData.append('Amount', quantity);
    formData.append('OrderStatus', 1);
    if (selectedImage) {
      formData.append('ImgFile', selectedImage);
    }

    try {
      const response = await fetch(`https://localhost:7078/api/Procurement/status/${procurement_id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
        navigate('/delivery', { state: { procurement_id } });
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    navigate('/waitingpayment', { state: { procurement_id } });
  };

  return (
    <div className='main_Makepayment'>
      <div className="payment-summary-card-make">
        <div className="payment-icon-make">
          <img src={dollarIcon} alt="Icon" className="icon-image-payment-make" />
        </div>
        <p className="payment-label-make">วิธีการชำระเงิน</p>
        <p className="payment-amount-make">QR พร้อมเพย์</p>
      </div>
      <h1 className='payment-title'></h1>
      <div className='qr-code-container'>
        <img src="src/img/image-removebg-preview (31).png" alt="QR Code" className='qr-code' />
        {totalPrice !== undefined ? (
          <div className='total-price-make'>
            <span>รวมทั้งหมด</span>
            <span className='price'>฿{totalPrice}</span>
          </div>
        ) : (
          <div>Error: Total price not available.</div>
        )}
      </div>

      <div className="upload-container">
        <label className="upload-button">
          <img src={imageIcon} alt="Icon" className="icon-image" />
          {selectedImage ? (
            <p className="file-name">{selectedImage.name}</p> // แสดงชื่อไฟล์
          ) : (
            <span>แบบหลักฐานการชำระเงิน</span> // ข้อความเริ่มต้น
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
        </label>
      </div>
      <div>
      <button onClick={handleCancel} className='cancel-button'>ยกเลิก</button>
      <button onClick={handleSubmit} className='confirm-button'>ยืนยัน</button>
      </div>
    </div>
  );
}

export default Makepayment;
