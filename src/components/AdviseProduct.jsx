import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Ensure you have Link imported
import Advise from './Advise'; // Import the Advise component

const AdviseProduct = () => {
  const [products, setProducts] = useState([]); // State to store fetched products
  const [loading, setLoading] = useState(true); // State to show loading status
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://localhost:7078/api/Advise/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); // Check if `Advise_img` and `Brand_img` fields have valid values

        const transformedData = data.map(item => ({
          imageUrl: item.advise_img ? `data:image/png;base64,${item.advise_img}` : 'default-image-url.png',
          name: item.advise_detail,
          description: `Price: ${item.advise_price} THB`,
          price: `${item.advise_price} THB`,
          brandLogo: item.brand_img ? `data:image/png;base64,${item.brand_img}` : 'default-brand-logo.png',
          brandName: item.brand_name,
          brandid: item.brand_id
        }));

        setProducts(transformedData);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products. Please try again later.'); // Set error state
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);

  console.log(products);

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Show error message if fetching fails
  }

  return (
    <div className="advise-product">
      <h2 className="brand-title">สินค้าแนะนำ</h2>
      {products.map((product) => (
        <Link to={`/brands/${product.brandid}`} key={product.brandid}>
          <Advise product={product} />
        </Link>
      ))}
    </div>
  );
};

export default AdviseProduct;
