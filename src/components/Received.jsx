import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Received.css';
import Selectstatus from './Selectstatus';

function Received() {
  const location = useLocation();
  const navigate = useNavigate();
  const { procurement_id } = location.state || {};

  const [procurementDetails, setProcurementDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProcurementDetails = async () => {
      try {
        const response = await fetch(`https://localhost:7078/api/Procurement/procurementsreceived?offset=0&limit=1000`);
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
    navigate('/receiveddetail', { state: { procurement_id: id } });
  };

  return (
    <div>
      <Selectstatus />
      <div className="main-received">
        {error && <p className="error-received">Error: {error}</p>}
        {loading ? (
          <p className="loading-received">Loading...</p>
        ) : (
          <div className="procurement-list-received">
            {procurementDetails.length > 0 ? (
              <ul>
                {procurementDetails.map((detail) => (
                  <li key={detail.procurement_id} className="procurement-item-received">
                    <img
                      src={`data:image/jpeg;base64,${detail.product_img}`}
                      alt={detail.product_name}
                      className="product-image-received"
                    />
                    <div className="product-info-received">
                      <h3 className="product-name-received">
                        {detail.product_name} <span className="arrow-icon">{'>'}</span>
                      </h3>
                      <p className="product-status-received">ที่ต้องได้รับ</p>
                    </div>
                    <button
                      className="payment-button-received"
                      onClick={() => handlePayment(detail.procurement_id)}
                    >
                      ได้รับสินค้าแล้ว
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-details-received">No procurement details available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Received;
