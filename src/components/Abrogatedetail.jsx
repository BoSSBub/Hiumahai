import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Selectstatus from './Selectstatus';
import './Abrogatedetail.css';

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
        <h5>รายละเอียดคำขอยกเลิก</h5>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {procurementDetails && (
          <>
            <div className="procurement-card">
              <div className="product-section">
                <img
                  src={`data:image/jpeg;base64,${procurementDetails[0].product_img}`}
                  alt={procurementDetails[0].product_name}
                  className="product-image"
                />
                <div className="product-info">
                  <p className="product-name">{procurementDetails[0].product_name}</p>
                  <p className="product-select">ตัวเลือก: <span className="highlight">{procurementDetails[0].procurement_select}</span></p>
                  <p className="product-amount">จำนวน <span className="highlight">{procurementDetails[0].amount}</span></p>
                </div>
                <p className="product-price">฿{procurementDetails[0].product_price}</p>
              </div>

              <div className="divider-thick"></div> {/* Thicker divider before total */}

              <div className="pricing-summary">
                <div className="pricing-item">
                  <span>ราคาสินค้า</span>
                  <span>฿{procurementDetails[0].product_price}</span>
                </div>
                <div className="pricing-item">
                  <span>ค่าหิ้ว</span>
                  <span>฿{procurementDetails[0].product_hiu}</span>
                </div>
                <div className="pricing-item">
                  <span>ค่าส่ง</span>
                  <span>฿{procurementDetails[0].product_deliver}</span>
                </div>

                <div className="divider-thick"></div> {/* Thicker divider before total */}

                <div className="total-price">
                  <span>รวมทั้งหมด</span>
                  <span className="highlight-total">฿{procurementDetails[0].finance}</span>
                </div>
              </div>
            </div>
          </>
        )}
        {additionalDetails && (
          <div className="additional-info-abrogate">
            <h2 className="section-label-abrogate">ผู้ร้องเรียน</h2>
            <h2 className="section-title-abrogate">ผู้ซื้อ</h2>
            <div className="divider-thick"></div> {/* Thicker divider before total */}
            <div className="row-abrogate">
              <span className="column-label-abrogate">เหตุผล:</span>
              <span className="column-value-abrogate">{additionalDetails.cancel_reason}</span>
            </div>
            {/* Add more fields as needed */}
          </div>
        )}


      </div>
    </div>
  );
}

export default Abrogatedetail;
