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
        <div className="detail-box-1">
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
                  <p>{selectedUser.username}</p>
                </div>
              )}
            </>
          ) : (
            <p>ไม่มีข้อมูลผู้รับหิ้ว</p>
          )}
          <div className='selected-user-info-1'>
          <h4>ค่าหิ้ว</h4><h5>฿{product.product_hiu}</h5>
          <h4>ค่าส่ง</h4><h6> ฿{product.product_deliver}</h6>
          </div>
          <div className='selected-user-info-btn'>
          <button class="button101">
  <span class="button101-content">ฝากหิ้วสินค้า </span>
</button>
<button  class="button102">
  <div class="svg-wrapper-1">
    <div class="svg-wrapper">
    <svg
          viewBox="0 0 576 512"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
            fill="#009688"
          ></path>
        </svg>
    </div>
  </div>
  <span>ลงรถเข็น</span>
</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
