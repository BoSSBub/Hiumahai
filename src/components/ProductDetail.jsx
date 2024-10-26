import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import { UserContext } from './UserContext'; // Import UserContext

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { userDetails } = useContext(UserContext); // Access userDetails from context
  const [product, setProduct] = useState(null);
  const [userDetailsList, setUserDetailsList] = useState([]); // Rename to avoid confusion
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
console.log(productId);
console.log(userDetails.email);
console.log(selectedOption);
  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://localhost:7078/api/Merchant/${productId}`);
        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
        const data = await response.json();
        setProduct(data);
        
        // Set the default selected option if available
        const firstOption = data.select_choice.split(',')[0].trim().replace(/\D/g, '');
        setSelectedOption(firstOption); // Set the first option as the default selected option
  
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };
  
    fetchProduct();
  }, [productId]);
  

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://localhost:7078/api/Merchant/GetUserDetailsByProduct/${productId}`);
        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
        const data = await response.json();
        setUserDetailsList(data);

        // Automatically select the first user if there's one
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
    const user = userDetailsList.find(user => user.username === username);
    setSelectedUser(user);
    console.log('Selected user:', user);
  };

  const handleOptionSelect = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAddToCart = async () => {
    if (userDetails) { // Check if userDetails exist
      if (selectedUser && product) {
        // Create the procurement DTO
        const procurementDto = {
          Email: userDetails.email,
          MerchantId: selectedUser.merchant_id,
          ProductId: productId, // Use the productId for the product
          Procurement_select: selectedOption
        };
  
        try {
          const response = await fetch('https://localhost:7078/api/Procurement', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(procurementDto),
          });
  
          if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
  
          // Handle successful response if needed
          const result = await response.json();
          console.log('Procurement created:', result);
  
          // Navigate to the pushcart page with the selected information
          navigate('/pushcart', {
            state: {
              email: userDetails.email,
              merchantId: selectedUser.merchant_id,
              productId,
              
            },
          });
        } catch (error) {
          console.error('Failed to create procurement:', error);
          alert('Failed to add to cart. Please try again.'); // Show an error message to the user
        }
      } else {
        alert('กรุณาเลือกผู้รับหิ้วก่อน');
      }
    } else {
      navigate('/login'); // Redirect to login if no userDetails
    }
  };
  

  const handlePushcart = () => {
    if (userDetails) { // Check if userDetails exist
      // Logic for adding to cart can be added here
      console.log('Added to cart'); // Example action
    } else {
      navigate('/login'); // Redirect to login if no userDetails
    }
  };

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

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
            <select className="product-options-select" onChange={handleOptionSelect}>
              {product.select_choice.split(',').map((option, index) => {
                const cleanedOption = option.trim().replace(/\D/g, '');
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
          {userDetailsList.length === 1 ? (
            <div className="selected-user-info">
              <img src={`data:image/jpeg;base64,${userDetailsList[0].userimg}`} alt={userDetailsList[0].username} className="selected-user-image" />
              <p>ชื่อ: {userDetailsList[0].username}</p>
            </div>
          ) : userDetailsList.length > 1 ? (
            <>
              <select className="user-select" onChange={(e) => handleUserSelect(e.target.value)}>
                {userDetailsList.map((user, index) => (
                  <option key={index} value={user.username}>
                    {user.username}
                  </option>
                ))}
              </select>
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
            <button className="button101" onClick={handleAddToCart}>
              <span className="button101-content">ฝากหิ้วสินค้า </span>
            </button>
            <button className="button102" onClick={handlePushcart}>
              <div className="svg-wrapper-1">
                <div className="svg-wrapper">
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
