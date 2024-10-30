import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Selectstatus from './Selectstatus';
import mapIcon from '../img/map.png';
import dollarIcon from '../img/dollar.png';

function Completedetail() {
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
        if (!response.ok) throw new Error('Failed to fetch procurement details');
        
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
          if (!response.ok) throw new Error('Address not found');
          
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

  return (
    <div>
      <Selectstatus />
      <div className="main_Waitingpaymentdetail">
        <h5>รายละเอียดฝากหิ้วสินค้า</h5>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {address && (
          <div className="address-card">
            <div className="address-header">
              <img src={mapIcon} alt="Map Icon" className="address-icon" />
              <h3 className="address-title">ที่อยู่</h3>
            </div>
            <div className="address-content">
              <p className="address-name">{address.addres_name || "N/A"}</p>
              <p className="address-details">{address.addres || "N/A"}</p>
              <p className="address-phone">{address.addresl_Phone || "N/A"}</p>
            </div>
          </div>
        )}
        {procurementDetails && (
          <div className="procurement-card">
            <div className="merchant-section">
              <img
                src={`data:image/jpeg;base64,${procurementDetails[0].merchant_img}`}
                alt="Merchant"
                className="merchant-image"
              />
              <p className="merchant-name">{procurementDetails[0].merchant_Email}</p>
            </div>

            <div className="divider-thick"></div>

            <div className="product-section">
              <img
                src={`data:image/jpeg;base64,${procurementDetails[0].product_img}`}
                alt={procurementDetails[0].product_name}
                className="product-image"
              />
              <div className="product-info">
                <p className="product-name">{procurementDetails[0].product_name}</p>
                <p className="product-select">ตัวเลือก: <span className="highlight">{procurementDetails[0].procurement_select}</span></p>
                <p className="product-amount">จำนวน: <span className="highlight">{procurementDetails[0].amount}</span></p>
              </div>
              <p className="product-price">฿{procurementDetails[0].product_price}</p>
            </div>
            <div className="divider-thick"></div>

            <div className="pricing-summary">
              <div className="pricing-item">
                <span>ราคาสินค้า</span>
                <span>฿{procurementDetails[0].product_price}</span>
              </div>
              <div className="pricing-item">
                <span>ราคาหิ้ว</span>
                <span>฿{procurementDetails[0].product_hiu}</span>
              </div>
              <div className="pricing-item">
                <span>ราคาส่ง</span>
                <span>฿{procurementDetails[0].product_deliver}</span>
              </div>
              <div className="divider-thick"></div>
              <div className="total-price">
                <span>รวมทั้งหมด</span>
                <span className="highlight-total">฿{procurementDetails[0].finance}</span>
              </div>
            </div>
          </div>
        )}
        <div className="payment-summary-card">
          <div className="payment-icon">
            <img src={dollarIcon} alt="Icon" className="icon-image-payment" />
          </div>
          <p className="payment-label">ชำระแล้ว</p>
          <p className="payment-amount">฿{procurementDetails?.[0]?.finance || 0}</p>
        </div>
      </div>
    </div>
  );
}

export default Completedetail;
