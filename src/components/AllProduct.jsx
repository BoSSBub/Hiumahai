import React, { useEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard';
import './AllProduct.css';
const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const productsPerPage = 9;

  // Create a ref to track the title element
  const titleRef = useRef(null);

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

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    // Scroll to the title element smoothly
    titleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Attach the ref to the title element */}
      <h2 ref={titleRef} className="brand-title">สินค้าทั้งหมด</h2>

      <div className="product-list">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            productId={product.product_id}
            image={`data:image/jpeg;base64,${product.product_img}`}
            name={product.product_name}
            price={product.product_price}
            brandLogo={`data:image/jpeg;base64,${product.brand_img}`}
          />
        ))}
        {/* Pagination controls */}
        <div className="pagination-1"> 
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      </div>
      </div>

      
    </>
  );
};

export default AllProduct;
