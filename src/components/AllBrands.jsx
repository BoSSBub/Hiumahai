import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AllBrands.css';

const AllBrands = () => {
  const [brands, setBrands] = useState([]);

  // Fetch all brands from the API
  useEffect(() => {
    fetch('https://localhost:7078/api/Brand')
      .then((response) => response.json())
      .then((data) => setBrands(data))
      .catch((error) => console.error('Error fetching all brands:', error));
  }, []);

  return (
    <>
      <div className="back-button-container">
        <Link to="/">
          <img src="src/img/image-removebg-preview (29).png" alt="Back to Home" className="back-button-image" />
        </Link>
      </div>
      <div className="main">
      <h2 className="All-brand-title">แบรนด์</h2>
      <div className="All-brand-list-container">
        <div className="All-brand-list">
          {brands.map((brand) => (
            <div key={brand.brand_id} className="All-brand-item">
              <Link to={`/brands/${brand.brand_id}`}>
                <BrandImage id={brand.brand_id} />
              </Link>
              <p className="All-brand-name">{brand.brand_name}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
      
    </>
  );
};

// Reuse the BrandImage component from Brand.jsx
const BrandImage = ({ id }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    fetch(`https://localhost:7078/api/Brand/${id}/image`)
      .then((response) => {
        if (response.ok) {
          return response.blob();
        }
        throw new Error('Image not found');
      })
      .then((blob) => {
        setImageSrc(URL.createObjectURL(blob));
      })
      .catch((error) => console.error('Error fetching image:', error));
  }, [id]);

  return (
    <div className="brand-image-container">
      {imageSrc ? (
        <img src={imageSrc} alt={`Brand ${id}`} className="brand-image" />
      ) : (
        <div className="brand-placeholder">Image not available</div>
      )}
    </div>
  );
};

export default AllBrands;
