import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { UserContext } from '../components/UserContext'; // Import UserContext
import './Baskets.css';

function Basket() {
  const { userDetails } = useContext(UserContext); // Get userDetails from context
  const [procurementInfo, setProcurementInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({}); // State to hold quantities for each item
  const navigate = useNavigate(); // Initialize useNavigate

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
        // Initialize quantities for each item
        const initialQuantities = {};
        data.forEach(item => {
          initialQuantities[item.procurement_id] = 1; // Set default quantity to 1
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

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Function to handle incrementing quantity
  const handleIncrement = (procurement_id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [procurement_id]: prevQuantities[procurement_id] + 1
    }));
  };

  // Function to handle decrementing quantity
  const handleDecrement = (procurement_id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [procurement_id]: Math.max(1, prevQuantities[procurement_id] - 1) // Prevent quantity from going below 1
    }));
  };

  // Function to handle navigation to Carryproduct
  const handleCarry = (item) => {
    const { procurement_Email, merchant_id, merchant_Product_ID } = item; // Extract necessary fields
    const quantity = quantities[item.procurement_id]; // Get quantity for this item
    const totalPrice = (item.product_price + item.product_hiu + item.product_deliver) * quantity; // Calculate total price

    navigate('/carryproduct', {
      state: {
        procurement_Email,
        merchant_id,    
        merchant_Product_ID,
        quantity, // Pass the quantity
        totalPrice // Pass the total price
      }
    });
  };

  return (
    <div className="basket-container">
      {procurementInfo && procurementInfo.length > 0 ? (
        <ul>
          {procurementInfo.map(item => {
            const totalPrice = (item.product_price + item.product_hiu + item.product_deliver) * quantities[item.procurement_id]; // Calculate total price
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
                  <button onClick={() => handleDecrement(item.procurement_id)} className="decrement-btn">-</button>
                  <span>{quantities[item.procurement_id]}</span>
                  <button onClick={() => handleIncrement(item.procurement_id)} className="increment-btn">+</button>
                </div>
                <p>ราคาสินค้า: {item.product_price}</p>
                <p>ค่าหิ้ว: {item.product_hiu}</p>
                <p>ค่าส่ง: {item.product_deliver}</p>
                <p>รวมยอดทั้งหมด: {totalPrice}</p> {/* New paragraph for total cost */}
                <button onClick={() => handleCarry(item)}>ฝากหิ้วเลย</button> {/* Handle carry */}
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

export default Basket;
