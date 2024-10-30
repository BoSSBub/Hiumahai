import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Delivery.css';
import Selectstatus from './Selectstatus';

function Delivery() {
  const location = useLocation();
  const navigate = useNavigate();
  const { procurement_id } = location.state || {};

  const [procurementDetails, setProcurementDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProcurementDetails = async () => {
      try {
        const response = await fetch(`https://localhost:7078/api/Procurement/procurementsdelivery?offset=0&limit=1000`);
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
  }, []);

  const handlePayment = (id) => {
    navigate('/Deliverydetail', { state: { procurement_id: id } });
  };

  return (
    <div>
      <Selectstatus />
      <div className="main-delivery">
        {error && <p className="error-delivery">Error: {error}</p>}
        {loading ? (
          <p className="loading-delivery">Loading...</p>
        ) : (
          <div className="procurement-list-delivery">
            {procurementDetails.length > 0 ? (
              <ul>
                {procurementDetails.map((detail) => (
                  <li key={detail.procurement_id} className="procurement-item-delivery">
                    <img
                      src={`data:image/jpeg;base64,${detail.product_img}`}
                      alt={detail.product_name}
                      className="product-image-delivery"
                    />
                    <div className="product-info-delivery">
                      <h3 className="product-name-delivery">{detail.product_name}</h3>
                    </div>
                    <div className="action-container-delivery">
                      <button
                        className="payment-button-delivery"
                        onClick={() => handlePayment(detail.procurement_id)}
                      >
                        &gt;
                      </button>
                      <p className="product-status-delivery">ที่ต้องจัดส่ง</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-details-delivery">No procurement details available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Delivery;
