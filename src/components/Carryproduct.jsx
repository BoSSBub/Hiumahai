import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Carryproduct.css';
import mapIcon from '../img/map.png';
import dollarIcon from '../img/dollar.png';


function Carryproduct() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    procurement_Email,
    merchant_id,
    merchant_Product_ID,
    quantity,
    addressInfo: initialAddressInfo,
  } = location.state || {};

  const [procurementInfo, setProcurementInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addressInfo, setAddressInfo] = useState(initialAddressInfo || null);

  useEffect(() => {
    const fetchProcurementInfo = async () => {
      try {
        if (procurement_Email && merchant_id && merchant_Product_ID) {
          const response = await fetch(
            `https://localhost:7078/api/Procurement/by-email?email=${procurement_Email}&merchant_id=${merchant_id}&Product_id=${merchant_Product_ID}`
          );

          if (!response.ok) throw new Error('Failed to fetch procurement info');
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
      try {
        if (procurement_Email) {
          const response = await fetch(
            `https://localhost:7078/api/Procurement/address/${procurement_Email}`
          );

          if (!response.ok) throw new Error('Failed to fetch address info');
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

    if (!initialAddressInfo) fetchAddressInfo();
    fetchProcurementInfo();
  }, [procurement_Email, merchant_id, merchant_Product_ID, initialAddressInfo]);

  const handleEditAddress = () => {
    navigate('/editaddress', {
      state: {
        addressInfo,
        procurementDetails: { procurement_Email, merchant_id, merchant_Product_ID, quantity },
      },
    });
  };

  const handleMakePayment = async (event) => {
    event.preventDefault();

    try {
      for (const item of procurementInfo) {
        const totalPrice = (item.product_price + item.product_hiu + item.product_deliver) * quantity;

        const formData = new FormData();
        formData.append('Procurement_id', item.procurement_id);
        formData.append('Finance', totalPrice);
        formData.append('Amount', quantity);
        formData.append('OrderStatus', 0);

        const response = await fetch('https://localhost:7078/api/Procurement/status', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          navigate('/makepayment', {
            state: {
              procurement_Email,
              merchant_id,
              merchant_Product_ID,
              totalPrice,
              quantity,
              procurement_id: item.procurement_id,
            },
          });
        } else {
          console.error('Error:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="main_Waitingpaymentdetail">
      <h5>รายละเอียดฝากหิ้วสินค้า</h5>
      {addressInfo && (
        <div className="address-card">
          <div className="address-header">
            <img src={mapIcon} alt="Map Icon" className="address-icon" />
            <button className="address-edit-button" onClick={handleEditAddress}>แก้ไข</button>
          </div>
          <div className="address-content">
            <p className="address-name">{addressInfo.addres_name}</p>
            <p className="address-details">{addressInfo.addres}</p>
            <p className="address-phone">{addressInfo.addresl_Phone}</p>
          </div>
        </div>
      )}
      {procurementInfo && procurementInfo.length > 0 ? (
        <>
          <div className="procurement-card">
            <ul>
              {procurementInfo.map((item) => {
                const totalPrice = (item.product_price + item.product_hiu + item.product_deliver) * quantity;
                return (
                  <li key={item.procurement_id} className="procurement-item">
                    <div className="merchant-section">
                      <img
                        src={`data:image/png;base64,${item.merchant_Userimg}`}
                        alt="Merchant"
                        className="merchant-image"
                      />
                      <p className="merchant-name">{item.merchant_Product_Email}</p>
                    </div>

                    <div className="divider-thick"></div>

                    <div className="product-section">
                      <img
                        src={`data:image/png;base64,${item.product_img}`}
                        alt={item.product_name}
                        className="product-image"
                      />
                      <div className="product-info">
                        <p className="product-name">{item.product_name}</p>
                        <p className="product-select">ตัวเลือก: <span className="highlight">{item.procurement_select}</span></p>
                        <p className="product-amount">จำนวน <span className="highlight">{quantity}</span></p>
                      </div>
                      <p className="product-price">฿{item.product_price}</p>
                    </div>

                    <div className="divider-thick"></div>

                    <div className="pricing-summary">
                      <div className="pricing-item">
                        <span>ราคาสินค้า</span>
                        <span>฿{item.product_price}</span>
                      </div>
                      <div className="pricing-item">
                        <span>ค่าหิ้ว</span>
                        <span>฿{item.product_hiu}</span>
                      </div>
                      <div className="pricing-item">
                        <span>ค่าส่ง</span>
                        <span>฿{item.product_deliver}</span>
                      </div>

                      <div className="divider-thick"></div>

                      <div className="total-price">
                        <span>รวมทั้งหมด</span>
                        <span className="highlight-total">฿{totalPrice}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="payment-summary-card-carry">
            <div className="payment-icon-carry">
              <img src={dollarIcon} alt="Icon" className="icon-image-payment-carry" />
            </div>
            <p className="payment-label-carry">วิธีการชำระเงิน</p>
            <p className="payment-amount-carry">QR พร้อมเพย์</p>
          </div>
          <div className="container-button-carry">
            <button className="button-pay-carry" onClick={handleMakePayment}>ฝากหิ้วเลยย</button>
          </div>
        </>
      ) : (
        <p className="no-procurement-info">No procurement info found.</p>
      )}
    </div>
  );
}

export default Carryproduct;
