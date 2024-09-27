import React, { useEffect, useState } from 'react';
import './MainPromotion.css'; // Make sure to have your CSS in place

const MainPromotion = () => {
  const [promotions, setPromotions] = useState([]); // To store promotions data
  const [loading, setLoading] = useState(true); // To manage loading state

  useEffect(() => {
    // Fetch promotion data from API
    const fetchPromotions = async () => {
      try {
        const response = await fetch('https://localhost:7078/api/PromotionPhotos'); // Replace with your actual API URL
        const data = await response.json();
        setPromotions(data); // Set the fetched data into the state
        setLoading(false); // Data is loaded
      } catch (error) {
        console.error('Error fetching promotions:', error);
        setLoading(false); // Stop loading in case of error
      }
    };

    fetchPromotions();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while data is being fetched
  }

  return (
    <div className="main-promotion">
      <h2>โปรโมชั่น</h2>
      <div className="promotion-grid">
        {promotions.map((promotion) => (
          <div key={promotion.imgpt_id} className="promotion-card">
            {/* Render the image using base64 string */}
            <img 
              src={`data:image/jpeg;base64,${promotion.imgpt_img}`} 
              alt={promotion.imgpt_name} 
              className="promotion-image" 
            />
            <div className="promotion-info">
              <h2>{promotion.imgpt_detail}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPromotion;
