import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Waitingpayment.css';
import Selectstatus from './Selectstatus';

function Waitingpayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { procurement_id } = location.state || {};

  const [procurementDetails, setProcurementDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProcurementDetails = async () => {
      try {
        const response = await fetch(`https://localhost:7078/api/Procurement/procurements?offset=0&limit=1000`);
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
    navigate('/waitingpaymentdetail', { state: { procurement_id: id } });
  };

  return (
    <div>
      <Selectstatus />
      <div className="main-waitingpayment">
        {error && <p className="error-waitingpayment">Error: {error}</p>}
        {loading ? (
          <p className="loading-waitingpayment">Loading...</p>
        ) : (
          <div className="procurement-list-waitingpayment">
            {procurementDetails.length > 0 ? (
              <ul>
                {procurementDetails.map((detail) => (
                  <li key={detail.procurement_id} className="procurement-item-waitingpayment">
                    <img
                      src={`data:image/jpeg;base64,${detail.product_img}`}
                      alt={detail.product_name}
                      className="product-image-waitingpayment"
                    />
                    <div className="product-info-waitingpayment">
                      <h3 className="product-name-waitingpayment">{detail.product_name}</h3>
                    </div>
                    <div className="action-container-waitingpayment">
                      <button
                        className="payment-button-waitingpayment"
                        onClick={() => handlePayment(detail.procurement_id)}
                      >
                        &gt;
                      </button>
                      <p className="product-status-waitingpayment">รอจ่ายเงิน</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-details-waitingpayment">No procurement details available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Waitingpayment;
