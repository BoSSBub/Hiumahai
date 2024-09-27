import React from 'react';
import './Advise.css'; // Assuming your CSS is in this file

const Advise = ({ product }) => {
    return (
    <>
    
      <div className="Advise-card">
        <div className="Advise-image-section">
          {product.imageUrl && (
            <img src={product.imageUrl} alt={product.name} className="Advise-image" />
          )}
          <div className="Advise-price">
            <span>{product.price}</span>
          </div>
        </div>
  
        <div className="Advise-info-section">
          <h3>{product.name}</h3>
          <div className="Advise-brand-section">
            {product.brandLogo && (
              <img src={product.brandLogo} alt={product.brandName} className="Advise-logo" />
            )}
            <p className="Advise-name">{product.brandName}</p>
          </div>
        </div>
      </div>
      </>
    );
  };
  
  

export default Advise;
