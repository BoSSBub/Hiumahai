import './Abrogate.css';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Selectstatus from './Selectstatus';

function Abrogate() {
  const location = useLocation();
  const navigate = useNavigate();
  const { procurement_id } = location.state || {};

  const [procurementDetails, setProcurementDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProcurementDetails = async () => {
      try {
        const response = await fetch(`https://localhost:7078/api/Procurement/procurementsabrogate?offset=0&limit=1000`);
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
    navigate('/Abrogatedetail', { state: { procurement_id: id } });
  };

  return (
    <div>
      <Selectstatus />
      <div className="main-abrogate">
        {error && <p className="error-abrogate">Error: {error}</p>}
        {loading ? (
          <p className="loading-abrogate">Loading...</p>
        ) : (
          <div className="procurement-list-abrogate">
            {procurementDetails.length > 0 ? (
              <ul>
                {procurementDetails.map((detail) => (
                  <li key={detail.procurement_id} className="procurement-item-abrogate">
                    <img
                      src={`data:image/jpeg;base64,${detail.product_img}`}
                      alt={detail.product_name}
                      className="product-image-abrogate"
                    />
                    <div className="product-info-abrogate">
                      <h3 className="product-name-abrogate">{detail.product_name}</h3>
                    </div>
                    <div className="action-container-abrogate">
                      <button
                        className="action-button-abrogate"
                        onClick={() => handlePayment(detail.procurement_id)}
                      >
                        &gt;
                      </button>
                      <p className="product-status-abrogate">ยกเลิก</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-details-abrogate">No procurement details available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Abrogate;
