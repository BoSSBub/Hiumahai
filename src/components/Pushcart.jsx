import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Pushcart.css';

const Pushcart = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { email, merchantId, productId } = location.state || {};
  const [procurementInfo, setProcurementInfo] = useState([]);
  const [quantities, setQuantities] = useState({}); // Store quantity per product
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

        // Initialize quantities for all products
        const initialQuantities = data.reduce((acc, item) => {
          acc[item.procurement_id] = 1; // Default quantity to 1
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

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Increment quantity for a specific product
  const handleIncrement = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: prevQuantities[id] + 1,
    }));
  };

  // Decrement quantity for a specific product
  const handleDecrement = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(prevQuantities[id] - 1, 1), // Ensure quantity stays >= 1
    }));
  };

  // Handle carry action and navigate to the next page
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
    <div className="pushcart-container">
      {procurementInfo.length > 0 ? (
        <ul>
          {procurementInfo.map((item) => {
            const quantity = quantities[item.procurement_id];
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
                  <h4>จำนวน:</h4>
                  <button
                    onClick={() => handleDecrement(item.procurement_id)}
                    className="decrement-btn"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => handleIncrement(item.procurement_id)}
                    className="increment-btn"
                  >
                    +
                  </button>
                </div>
                <p>ราคาสินค้า: {item.product_price}</p>
                <p>ค่าหิ้ว: {item.product_hiu}</p>
                <p>ค่าส่ง: {item.product_deliver}</p>
                <p>รวมยอดทั้งหมด: {totalPrice}</p>
                <button onClick={() => handleCarry(item)}>ฝากหิ้วเลย</button>
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
