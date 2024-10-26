import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Selectstatus from './Selectstatus';
function Deliverydetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const { procurement_id, addressInfo: updatedAddressInfo } = location.state || {}; 
  
    const [procurementDetails, setProcurementDetails] = useState(null);
    const [address, setAddress] = useState(updatedAddressInfo || null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchProcurementDetails = async () => {
        if (!procurement_id) {
          setError("No Procurement ID available.");
          setLoading(false);
          return;
        }
  
        try {
          const response = await fetch(`https://localhost:7078/api/Procurement/procurementsid?procurementId=${procurement_id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch procurement details');
          }
          const data = await response.json();
          setProcurementDetails(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProcurementDetails();
    }, [procurement_id]);
  
    useEffect(() => {
      if (!updatedAddressInfo && procurementDetails && procurementDetails[0]?.merchant_Email) {
        const fetchAddress = async () => {
          try {
            setLoading(true);
            setError(null);
            const response = await fetch(`https://localhost:7078/api/Procurement/address/${procurementDetails[0].merchant_Email}`);
            if (!response.ok) {
              throw new Error('Address not found');
            }
            const data = await response.json();
            setAddress(data);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
        fetchAddress();
      }
    }, [procurementDetails, updatedAddressInfo]);
  
    const handleEditAddress = () => {
      navigate('/editaddresspaymentdelivery', { 
        state: { 
          addressInfo: address, 
          procurementDetails 
        } 
      });
    };
  
    return (
        <div>
            <Selectstatus/>
      <div className='main_Waitingpaymentdetail'>
        <h1>Waiting Payment Detail</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {address && (
          <div>
            <h3>Merchant Address</h3>
            <p><strong>ชื่อ:</strong> {address.addres_name}</p>
            <p><strong>ที่อยู่:</strong> {address.addres}</p>
            <p><strong>เบอร์:</strong> {address.addresl_Phone}</p>
            <button onClick={handleEditAddress}>แก้ไข</button>
          </div>
        )}
        {procurementDetails && (
          <>
            <div>
              <img src={`data:image/jpeg;base64,${procurementDetails[0].merchant_img}`} alt="Merchant" />
              <p>Merchant Email: {procurementDetails[0].merchant_Email}</p>
            </div>
            <div>
              <img src={`data:image/jpeg;base64,${procurementDetails[0].product_img}`} alt={procurementDetails[0].product_name} />
              <p>Product Name: {procurementDetails[0].product_name}</p>
              <p>ตัวเลือก: {procurementDetails[0].procurement_select}</p>
              <p>จำนวน: {procurementDetails[0].amount}</p>
              <p>ราคาสินค้า: {procurementDetails[0].product_price}</p>
              <p>ราคาหิ้ว: {procurementDetails[0].product_hiu}</p>
              <p>ราคาส่ง: {procurementDetails[0].product_deliver}</p>
              <p>รวม: {procurementDetails[0].finance}</p>
            </div>
          </>
        )}
      </div>
      </div>
    );
}

export default Deliverydetail