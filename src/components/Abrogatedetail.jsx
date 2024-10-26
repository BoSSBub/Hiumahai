import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Selectstatus from './Selectstatus';

function Abrogatedetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const { procurement_id, addressInfo: updatedAddressInfo } = location.state || {}; 
  
    const [procurementDetails, setProcurementDetails] = useState(null);
    const [additionalDetails, setAdditionalDetails] = useState(null);
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

          // Fetch additional details after getting procurement details
          const additionalResponse = await fetch(`https://localhost:7078/api/Procurement/cancellations/${procurement_id}`);
          if (!additionalResponse.ok) {
            throw new Error('Failed to fetch additional details');
          }
          const additionalData = await additionalResponse.json();
          setAdditionalDetails(additionalData);

        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProcurementDetails();
    }, [procurement_id]);
console.log(additionalDetails)
    return (
        <div>
            <Selectstatus />
            <div className='main_Waitingpaymentdetail'>
                <h1>รายละเอียดคำขอยกเลิก</h1>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {procurementDetails && (
                    <>
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
                {additionalDetails && (
                    <div>
                        <h2>ผู้ซื้อ</h2>
                        <p>เหตุผล: {additionalDetails.cancel_reason}</p>
                        {/* Add more fields as needed */}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Abrogatedetail;
