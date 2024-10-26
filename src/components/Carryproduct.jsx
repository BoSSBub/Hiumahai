import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Carryproduct.css';

function Carryproduct() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const {
    procurement_Email,
    merchant_id,
    merchant_Product_ID,
    quantity,
    addressInfo: initialAddressInfo
  } = location.state || {};

  const [procurementInfo, setProcurementInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addressInfo, setAddressInfo] = useState(initialAddressInfo || null);

  useEffect(() => {
    const fetchProcurementInfo = async () => {
      setLoading(true);
      try {
        if (procurement_Email && merchant_id && merchant_Product_ID) {
          const response = await fetch(`https://localhost:7078/api/Procurement/by-email?email=${procurement_Email}&merchant_id=${merchant_id}&Product_id=${merchant_Product_ID}`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch procurement info');
          }

          const data = await response.json();
          setProcurementInfo(data);
        } else {
          throw new Error('Missing parameters');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    const fetchAddressInfo = async () => {
      setLoading(true);
      try {
        if (procurement_Email) {
          const response = await fetch(`https://localhost:7078/api/Procurement/address/${procurement_Email}`);

          if (!response.ok) {
            throw new Error('Failed to fetch address info');
          }

          const data = await response.json();
          setAddressInfo(data);
        } else {
          throw new Error('Email is required to fetch address info');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (!initialAddressInfo) {
      fetchAddressInfo();
    }

    fetchProcurementInfo();
  }, [procurement_Email, merchant_id, merchant_Product_ID, initialAddressInfo]);

  const handleEditAddress = () => {
    navigate('/editaddress', { 
      state: { 
        addressInfo, 
        procurementDetails: { 
          procurement_Email, 
          merchant_id, 
          merchant_Product_ID, 
          quantity 
        } 
      } 
    });
  };

  // New function to handle payment
  const handleMakePayment = async (event, totalPrice, procurement_id) => {
    event.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append('Procurement_id', procurement_id);
    formData.append('Finance', totalPrice); // Assuming Finance is the field name in your API
    formData.append('Amount', quantity); // Assuming Amount is the field name in your API
    formData.append('OrderStatus', 0); // Assuming OrderStatus is the field name in your API

    try {
      const response = await fetch('https://localhost:7078/api/Procurement/status', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
        // Redirect to the make payment page with necessary data
        navigate('/makepayment', { state: {  procurement_Email,merchant_id,merchant_Product_ID,totalPrice, quantity, procurement_id } });
      } else {
        console.error('Error:', response.statusText);
        // Handle error response
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network errors
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="pushcart-container">
      <h1>รายละเอียดฝากหิ้วสินค้า</h1>
      {addressInfo && (
        <div>
          <h2>ที่อยู่:</h2>
          <p>อีเมล์: {addressInfo.email}</p>
          <p>เบอร์: {addressInfo.addresl_Phone}</p>
          <p>ที่อยู่: {addressInfo.addres}</p>
          <button onClick={handleEditAddress}>แก้ไข</button>
        </div>
      )}
      {procurementInfo && procurementInfo.length > 0 ? (
        <ul>
          {procurementInfo.map(item => {
            const totalPrice = (item.product_price + item.product_hiu + item.product_deliver) * quantity;
            return (
              <li key={item.procurement_id}>
                <div>
                  <h3>{item.merchant_Product_Email}</h3>
                  <img 
                    src={`data:image/png;base64,${item.merchant_Userimg}`} 
                    alt={item.merchant_Product_Email} 
                    className="merchant_Userimg" 
                  />
                </div>
                <div>
                  <img 
                    src={`data:image/png;base64,${item.product_img}`} 
                    alt={item.product_name} 
                    className="product_img" 
                  />
                  <h4>{item.product_name}</h4>
                  <h4>ตัวเลือก: {item.procurement_select}</h4>
                  <h4>ราคา: {item.product_price}</h4>
                  <p>จำนวน: {quantity}</p>
                </div>
                <p>ราคาสินค้า: {item.product_price}</p>
                <p>ค่าหิ้ว: {item.product_hiu}</p>
                <p>ค่าส่ง: {item.product_deliver}</p>
                <p>รวมทั้งหมด: {totalPrice}</p>
                <button onClick={(event) => handleMakePayment(event, totalPrice, item.procurement_id)}>ฝากหิ้วเลยย</button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No procurement info found.</p>
      )}
    </div>
  );
}

export default Carryproduct;
