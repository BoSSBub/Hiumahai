import React, { useEffect, useState } from 'react';
import './Promotion.css';
import axios from 'axios';

const Promotion = () => {
  const [images, setImages] = useState([]);
  const [sideImages, setSideImages] = useState([]); // State สำหรับ promotion-side-section
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    // ดึงข้อมูลสำหรับสไลด์โชว์ (ฝั่งซ้าย)
    axios.get('https://localhost:7078/api/PromotionPhotos')
      .then(response => {
        const data = response.data;
        const formattedImages = data.map(item => ({
          id: item.imgpt_id,
          src: `data:image/jpeg;base64,${item.imgpt_img}`,
          alt: item.imgpt_name || `Promotion ${item.imgpt_id}`,
        }));
        setImages(formattedImages);

        // ดึงภาพที่จะแสดงใน promotion-side-section โดยสุ่มจากข้อมูลที่ได้
        const shuffledImages = [...formattedImages].sort(() => 0.5 - Math.random());
        setSideImages(shuffledImages.slice(0, 2)); // ใช้แค่ 2 รูปสำหรับฝั่งขวา
      })
      .catch(error => {
        console.error('Error fetching the images:', error);
      });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsSliding(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        setIsSliding(false);
      }, 500);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [images]);

  const handleImageClick = (index) => {
    setIsSliding(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsSliding(false);
    }, 500);
  };

  return (
    <div className="promotion-container">
      {/* Left section: Image slider */}
      <div className="promotion-slider">
        {images.length > 0 ? (
          <>
            <div className={`image-container ${isSliding ? 'sliding' : ''}`}>
              <div
                className="slider-track"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {images.map((image) => (
                  <img key={image.id} src={image.src} alt={image.alt} className="slide-image" />
                ))}
              </div>
            </div>
            <div className="dots-container">
              {images.map((image, index) => (
                <span
                  key={image.id}
                  className={`dot ${currentIndex === index ? 'active' : ''}`}
                  onClick={() => handleImageClick(index)}
                ></span>
              ))}
            </div>
          </>
        ) : (
          <p>Loading images...</p>
        )}
      </div>

      {/* Right section: Static images from the same API */}
      <div className="promotion-side-section">
        {sideImages.length > 0 ? (
          sideImages.map((image) => (
            <div key={image.id} className="promo-item">
              <img src={image.src} alt={image.alt} className="side-promo-image" />
            </div>
          ))
        ) : (
          <p>Loading side promotions...</p>
        )}
      </div>
    </div>
  );
};

export default Promotion;
