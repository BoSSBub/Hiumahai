import React from 'react';
import { useNavigate } from 'react-router-dom'; // Changed from useHistory to useNavigate
import './ProductCard.css';

const ProductCard = ({ image, name, price, brandLogo, productId }) => {
  const navigate = useNavigate(); // Updated to useNavigate

  const handleCardClick = () => {
    navigate(`/product/${productId}`); // Use navigate to go to the product detail page
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="image-container">
        <img src={image} alt={name} className="product-image" />
      </div>
      <div className="product-info">
        <p className="product-name">{name}</p>
        <p className="product-price">฿{price}</p>
        <div className="product-logo">
          {brandLogo ? (
            <img src={brandLogo} alt="Brand Logo" className="product-brand-logo" />
          ) : (
            <div className="brand-placeholder">Logo not available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
