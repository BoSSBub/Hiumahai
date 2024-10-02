import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://localhost:7078/api/Product/all');
        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className="brand-title">สินค้าทั้งหมด</h2>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard 
            key={product.product_id}  // Use product_id as the key
            productId={product.product_id}  // Pass the productId prop
            image={`data:image/jpeg;base64,${product.product_img}`} 
            name={product.product_name}
            price={product.product_price}
            brandLogo={`data:image/jpeg;base64,${product.brand_img}`} 
          />
        ))}
      </div>
    </>
  );
};

export default AllProduct;
