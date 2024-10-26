import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Pushcart.css';

const Pushcart = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { email, merchantId, productId } = location.state || {};
  const [procurementInfo, setProcurementInfo] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProcurementInfo = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://localhost:7078/api/Procurement/by-email?email=${email}&merchant_id=${merchantId}&Product_id=${productId}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch procurement info');
        }

        const data = await response.json();
        setProcurementInfo(data);

        const initialQuantities = data.reduce((acc, item) => {
          acc[item.procurement_id] = 1;
          return acc;
        }, {});
        setQuantities(initialQuantities);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (email && merchantId && productId) {
      fetchProcurementInfo();
    }
  }, [email, merchantId, productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleIncrement = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: prevQuantities[id] + 1,
    }));
  };

  const handleDecrement = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(prevQuantities[id] - 1, 1),
    }));
  };

  const handleCarry = (item) => {
    const quantity = quantities[item.procurement_id];
    const totalPrice = (item.product_price + item.product_hiu + item.product_deliver) * quantity;

    navigate('/carryproduct', {
      state: {
        procurement_Email: item.procurement_Email,
        merchant_id: item.merchant_id,
        merchant_Product_ID: item.merchant_Product_ID,
        quantity,
        totalPrice,
      },
    });
  };

  return (
    <div className="pushcart-container-pushcart">
      {procurementInfo.length > 0 ? (
        <ul>
          {procurementInfo.map((item) => {
            const quantity = quantities[item.procurement_id];
            const totalPrice = (item.product_price + item.product_hiu + item.product_deliver) * quantity;

            return (
              <li key={item.procurement_id} className="pushcart-card-pushcart">
                <div className="merchant-info-pushcart">
                  <div className="merchant-center-pushcart">
                    <img
                      src={`data:image/png;base64,${item.merchant_Userimg}`}
                      alt={item.merchant_Product_Email}
                      className="merchant-Userimg-pushcart"
                    />
                    <div className="merchant-details-pushcart">
                      <h3>{item.merchant_Product_Email}</h3>
                    </div>
                  </div>
                </div>
                <hr className="divider-pushcart" />
                <div className="product-info-pushcart">
                  <img
                    src={`data:image/png;base64,${item.product_img}`}
                    alt={item.product_name}
                    className="product-img-pushcart"
                  />
                  <div className="product-details-pushcart">
                    <h4>{item.product_name}</h4>
                    <p>ตัวเลือก: {item.procurement_select}</p>
                    <p className="product-price-pushcart">฿{item.product_price}</p>
                    <div className="quantity-section-pushcart">
                      <p className="quantity-label-pushcart">จำนวน</p>
                      <div className="quantity-control-pushcart">
                        <button onClick={() => handleDecrement(item.procurement_id)} className="decrement-btn-pushcart">
                          -
                        </button>
                        <span>{quantity}</span>
                        <button onClick={() => handleIncrement(item.procurement_id)} className="increment-btn-pushcart">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="divider-pushcart" />
                <div className="price-summary-pushcart">
                  <div className="price-summary-row-pushcart">
                    <p>ราคาสินค้า</p>
                    <p>฿{item.product_price}</p>
                  </div>
                  <div className="price-summary-row-pushcart">
                    <p>ค่าหิ้ว</p>
                    <p>฿{item.product_hiu}</p>
                  </div>
                  <div className="price-summary-row-pushcart">
                    <p>ค่าส่ง</p>
                    <p>฿{item.product_deliver}</p>
                  </div>
                  <div className="price-summary-row-pushcart">
                    <p className="total-price-label-pushcart">รวมทั้งหมด</p>
                    <p className="total-price-pushcart">฿{totalPrice}</p>
                  </div>
                </div>
                <button onClick={() => handleCarry(item)} className="carry-btn-pushcart">ฝากหิ้ว</button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No procurement info found.</p>
      )}
    </div>
  );
};

export default Pushcart;
