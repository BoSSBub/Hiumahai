import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BrandDetail.css';
import ProductCard from './ProductCard';

const BrandDetail = () => {
  const { id } = useParams();
  const [brand, setBrand] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [bgImageSrc, setBgImageSrc] = useState(null);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  // Fetch brand details
  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await fetch(`https://localhost:7078/api/Brand/${id}`);
        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
        const data = await response.json();
        setBrand(data);

        // Fetch products based on brand_key
        const productResponse = await fetch(`https://localhost:7078/api/Product/by-brand?brand_key=${data.brand_key}`);
        if (!productResponse.ok) throw new Error(`Error fetching products: ${productResponse.status} - ${productResponse.statusText}`);
        const productData = await productResponse.json();
        setProducts(productData);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchBrand();
  }, [id]);

  // Fetch brand logo image
  useEffect(() => {
    const fetchBrandLogo = async () => {
      try {
        const response = await fetch(`https://localhost:7078/api/Brand/${id}/image`);
        if (!response.ok) throw new Error(`Image not found: ${response.status} - ${response.statusText}`);
        const blob = await response.blob();
        setImageSrc(URL.createObjectURL(blob));
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchBrandLogo();
  }, [id]);

  // Fetch brand background image
  useEffect(() => {
    const fetchBgImage = async () => {
      try {
        const response = await fetch(`https://localhost:7078/api/Brand/${id}/image_bg`);
        if (!response.ok) throw new Error(`Background image not found: ${response.status} - ${response.statusText}`);
        const blob = await response.blob();
        setBgImageSrc(URL.createObjectURL(blob));
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchBgImage();
  }, [id]);

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!brand) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="frame">
        {bgImageSrc ? (
          <img src={bgImageSrc} alt="background" className="background-image" />
        ) : (
          <div className="background-placeholder">Background image not available</div>
        )}

        <div className="brand-detail-content">
          <div className="logo-frame">
            {imageSrc ? (
              <img src={imageSrc} alt={`Brand ${brand.brand_name}`} className="brand-detail-image" />
            ) : (
              <div className="brand-placeholder">Image not available</div>
            )}
            <h1>{brand.brand_name}</h1>
          </div>
        </div>
      </div>
      
      {/* Product List */}
      <div className="product-list">
      {products.map((product, index) => (
  <ProductCard 
    key={index} 
    image={`data:image/jpeg;base64,${product.product_img}`} 
    name={product.product_name}
    price={product.product_price}
    brandLogo={imageSrc}
    productId={product.product_id} // Pass the productId here
  />
))}

      </div>
    </div>
  );
};

export default BrandDetail;
