import React, { useEffect, useState } from 'react';
import Advise from './Advise'; // Import the Advise component

const AdviseProduct = () => {
  const [products, setProducts] = useState([]); // State to store fetched products
  const [loading, setLoading] = useState(true); // State to show loading status

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://localhost:7078/api/Advise/all');
        const data = await response.json();
        console.log(data); // Check if `Advise_img` and `Brand_img` fields have valid values
        const transformedData = data.map(item => ({
          imageUrl: item.advise_img ? `data:image/png;base64,${item.advise_img}` : 'default-image-url.png',
          name: item.advise_detail,
          description: `Price: ${item.advise_price} THB`,
          price: `${item.advise_price} THB`,
          brandLogo: item.brand_img ? `data:image/png;base64,${item.brand_img}` : 'default-brand-logo.png',
          brandName: item.brand_name,
        }));
        setProducts(transformedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  return (
    <div className="advise-product">
        <h2 className="brand-title">สินค้าแนะนำ</h2>
      {products.map((product, index) => (
        <Advise key={index} product={product} />
      ))}
    </div>
  );
};

export default AdviseProduct;
