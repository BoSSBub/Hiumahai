import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
    <div>
      <h1>Edit Address</h1>
      {addressInfo ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div>
            <label>Address Name:</label>
            <input
              type="text"
              value={addressName}
              onChange={(e) => setAddressName(e.target.value)}
            />
          </div>

          <button type="submit">Update Address</button>
        </form>
      ) : (
        <p>No address info available.</p>
      )}
    </div>
  );
}

export default Editaddress;
