import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Selectstatus from './Selectstatus';

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
        <div className='main_Waitingpayment'>
          {error && <p>Error: {error}</p>}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              {procurementDetails.length > 0 ? (
                <ul>
                  {procurementDetails.map((detail) => (
                    <li key={detail.procurement_id}>
                      <h3>{detail.product_name}</h3>
                      {detail.product_img && (
                        <img src={`data:image/jpeg;base64,${detail.product_img}`} alt={detail.product_name} />
                      )}
                      <p>เสร้จสิ้น</p>
                      <button onClick={() => handlePayment(detail.procurement_id)}>เปลี่ยนด้วยนะเป็นกด class แทนเหมือนใน figma</button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No procurement details available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    );
}

export default Complete