import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [userDetails, setUserDetails] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Store selected user object
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://localhost:7078/api/Merchant/${productId}`);
        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://localhost:7078/api/Merchant/GetUserDetailsByProduct/${productId}`);
        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
        const data = await response.json();
        setUserDetails(data);

        // Automatically select the first user if there's only one or more than one
        if (data.length > 0) {
          setSelectedUser(data[0]);
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchUserDetails();
  }, [productId]);

  const handleUserSelect = (username) => {
    const user = userDetails.find(user => user.username === username);
    setSelectedUser(user); // Store the entire user object
    console.log('Selected user:', user);
  };

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  console.log(selectedUser);
  console.log(product);

  return (
    <div className="productDetail-detail-container">
      <div className="productDetail-image-container">
        <img src={`data:image/jpeg;base64,${product.product_img}`} alt={product.product_name} className="productDetail-image" />
      </div>
      <div className="productDetail-info">
        <div className="productDetail-info-1">
          <img src={`data:image/jpeg;base64,${product.brand_img}`} alt={product.brand_name} className="brandDetail-image" />
          <h2 className="brandDetail-name">{product.brand_name}</h2>
        </div>
        <div className="productDetail-info-2">
          <h2 className="productDetail-name">{product.product_name}</h2>
          <p className="productDetail-price">฿{product.product_price}</p>
        </div>
      </div>

      <div className="detail-box-container">
        <div className="detail-box">
          <h3>ชื่อสินค้า</h3>
          <p className="productDetail-name">{product.product_name}</p>
          <h3>รายละเอียด</h3>
          <p className="productDetail-name">{product.product_detail}</p>
          <div className="product-options">
            <h3>ตัวเลือก</h3>
            <select className="product-options-select">
              {product.select_choice.split(',').map((option, index) => {
                const cleanedOption = option.trim().replace(/[^0-9]/g, '');
                return (
                  <option key={index} value={cleanedOption}>
                    {cleanedOption}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        
        {/* User Details (คนรับหิ้ว) */}
        <div className="detail-box">
          <h3>คนรับหิ้ว</h3>
          {userDetails.length === 1 ? ( // Check if there is only one user
            <div className="selected-user-info">
              <img src={`data:image/jpeg;base64,${userDetails[0].userimg}`} alt={userDetails[0].username} className="selected-user-image" />
              <p>ชื่อ: {userDetails[0].username}</p>
            </div>
          ) : userDetails.length > 1 ? ( // If there are multiple users
            <>
              <select className="user-select" onChange={(e) => handleUserSelect(e.target.value)}>
                {userDetails.map((user, index) => (
                  <option key={index} value={user.username}>
                    {user.username} {/* Removed Rating display */}
                  </option>
                ))}
              </select>
              {/* Show selected user image and name */}
              {selectedUser && (
                <div className="selected-user-info">
                  <img src={`data:image/jpeg;base64,${selectedUser.userimg}`} alt={selectedUser.username} className="selected-user-image" />
                  <p>ชื่อ: {selectedUser.username}</p>
                </div>
              )}
            </>
          ) : (
            <p>ไม่มีข้อมูลผู้รับหิ้ว</p>
          )}
          <div>
          <p>ค่าหิ้ว: {product.product_hiu}</p>
          <p>ค่าส่ง: {product.product_deliver}</p>
          </div>
          <div>
          <button class = "iconbutton101">
  <div class="svg-wrapper-1">
    <div class="svg-wrapper">
    <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  width="24"
  height="24"
  fill="currentColor"
>
  <path d="M7 4h14l-1.5 9H8.5L7 4zM1 1h4l2 12h13l1-6H5.8L4 1H1zm2 22c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm16 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
</svg>

    </div>
  </div>
  <span>ลงรถเข็น</span>
</button>
/* From Uiverse.io by Madflows */ 
<button class="iconbutton102">
  <span class="iconbutton102-content">ฝากหิ้วสินค้า </span>
</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
