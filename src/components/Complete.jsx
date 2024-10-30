import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Selectstatus from './Selectstatus';
import './Complete.css';

function Complete() {
  const location = useLocation();
  const navigate = useNavigate();
  const { procurement_id } = location.state || {};

  const [procurementDetails, setProcurementDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProcurementDetails = async () => {
      try {
        const response = await fetch(`https://localhost:7078/api/Procurement/procurementscomplete?offset=0&limit=1000`);
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
    navigate('/completedetail', { state: { procurement_id: id } });
  };

  return (
    <div>
      <Selectstatus />
      <div className="main-complete">
        {error && <p className="error-complete">Error: {error}</p>}
        {loading ? (
          <p className="loading-complete">Loading...</p>
        ) : (
          <div className="procurement-list-complete">
            {procurementDetails.length > 0 ? (
              <ul>
                {procurementDetails.map((detail) => (
                  <li key={detail.procurement_id} className="procurement-item-complete">
                    <img
                      src={`data:image/jpeg;base64,${detail.product_img}`}
                      alt={detail.product_name}
                      className="product-image-complete"
                    />
                    <div className="product-info-complete">
                      <h3 className="product-name-complete">{detail.product_name}</h3>
                    </div>
                    <div className="action-container-complete">
                      <button
                        className="payment-button-complete"
                        onClick={() => handlePayment(detail.procurement_id)}
                      >
                        &gt;
                      </button>
                      <p className="status-complete">เสร็จสิ้น</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-details-complete">No procurement details available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Complete;
