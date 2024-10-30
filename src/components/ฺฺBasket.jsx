import React, { useEffect, useState, useContext } from 'react';
 import { useNavigate } from "react-router-dom";
 import { UserContext } from "../components/UserContext";
 import './Baskets.css';
function Basket() {
  const { userDetails } = useContext(UserContext);
  const [procurementInfo, setProcurementInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProcurementInfo = async () => {
      if (!userDetails || !userDetails.email) {
        setError('User email is not available.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://localhost:7078/api/Procurement/by-email?email=${userDetails.email}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch procurement info');
        }

        const data = await response.json();
        const initialQuantities = {};
        data.forEach(item => {
          initialQuantities[item.procurement_id] = 1;
        });
        setQuantities(initialQuantities);
        setProcurementInfo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProcurementInfo();
  }, [userDetails]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleIncrement = (procurement_id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [procurement_id]: prevQuantities[procurement_id] + 1
    }));
  };

  const handleDecrement = (procurement_id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [procurement_id]: Math.max(1, prevQuantities[procurement_id] - 1)
    }));
  };

  const handleCarry = (item) => {
    const { procurement_Email, merchant_id, merchant_Product_ID } = item;
    const quantity = quantities[item.procurement_id];
    const totalPrice = (item.product_price + item.product_hiu + item.product_deliver) * quantity;

    navigate('/carryproduct', {
      state: {
        procurement_Email,
        merchant_id,
        merchant_Product_ID,
        quantity,
        totalPrice
      }
    });
  };

  return (
    <div className="pushcart-container-basket">
      {procurementInfo && procurementInfo.length > 0 ? (
        <div className="pushcart-list-basket">
          {procurementInfo.map(item => {
            const totalPrice = (item.product_price + item.product_hiu + item.product_deliver) * quantities[item.procurement_id];
            return (
              <div key={item.procurement_id} className="pushcart-card-basket">
                <div className="merchant-info-basket">
                  <div className="merchant-center-basket">
                    <img 
                      src={`data:image/png;base64,${item.merchant_Userimg}`} 
                      alt={item.merchant_Product_Email} 
                      className="merchant-Userimg-basket" 
                    />
                    <div className="merchant-details-basket">
                      <h3>{item.merchant_Product_Email}</h3>
                    </div>
                  </div>
                </div>
                <div className="divider-thick"></div>
                <div className="product-info-basket">
                  <img 
                    src={`data:image/png;base64,${item.product_img}`} 
                    alt={item.product_name} 
                    className="product-img-basket" 
                  />
                  <div className="product-details-basket">
                    <h4>{item.product_name}</h4>
                    <p>ตัวเลือก: {item.procurement_select}</p>
                    <p1 className="product-price-basket">ราคา: ฿{item.product_price}</p1>
                    <div className="quantity-section-basket">
                      <p className="quantity-label-basket">จำนวน:</p>
                      <div className="quantity-control-basket">
                        <button onClick={() => handleDecrement(item.procurement_id)} className="decrement-btn-basket">-</button>
                        <span>{quantities[item.procurement_id]}</span>
                        <button onClick={() => handleIncrement(item.procurement_id)} className="increment-btn-basket">+</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="divider-thick"></div>
                <div className="price-summary-basket">
                  <div className="price-summary-row-basket">
                    <p>ราคาสินค้า</p>
                    <p>฿{item.product_price}</p>
                  </div>
                  <div className="price-summary-row-basket">
                    <p>ค่าหิ้ว</p>
                    <p>฿{item.product_hiu}</p>
                  </div>
                  <div className="price-summary-row-basket">
                    <p>ค่าส่ง</p>
                    <p>฿{item.product_deliver}</p>
                  </div>
                  <div className="divider-thick"></div>
                  <div className="price-summary-row-basket">
                    <p className="total-price-label-basket">รวมทั้งหมด</p>
                    <p className="total-price-basket">฿{totalPrice}</p>
                  </div>
                </div>
                <button onClick={() => handleCarry(item)} className="carry-btn-basket">ฝากหิ้วเลย</button>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No procurement info found.</p>
      )}
    </div>
  );
}

export default Basket;
