import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './editproduct.css';

function Editproduct() {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state;

  // เก็บข้อมูลสินค้าที่แก้ไขใน state
  const [editedProduct, setEditedProduct] = useState({
    productName: product.productName || '',
    productDetail: product.productDetail || '',
    productPrice: product.productPrice || '',
    productHiu: product.productHiu || '',
    productDeliver: product.productDeliver || '',
    date: product.date || '',
    email: product.email || '',
    brandKey: product.brandKey || '',
    productId: product.productId,
    merchantId: product.merchantId,
    productImg: product.productImg || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="outer-container-editproduct">
      <div className="addproduct-container-editproduct">
        <div className="addproduct-form-editproduct">
          <div className="profile-picture-editproduct">
            {editedProduct.productImg ? (
              <img
                src={editedProduct.productImg ? `data:image/png;base64,${editedProduct.productImg}` : ''}
                alt="Product"
                className="circle-editproduct"
              />
            ) : (
              <button
                className="circle-editproduct"
                onClick={() => document.getElementById('productImgInput').click()}
              >
                + เพิ่มรูปภาพสินค้า
              </button>
            )}
            <input
              id="productImgInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>
          <form>
            <div className="form-row-editproduct">
              <label htmlFor="productname-editproduct">ชื่อสินค้า:</label>
              <input
                id="productname-editproduct"
                name="productName"
                type="text"
                className="product-input-editproduct"
                value={editedProduct.productName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row-editproduct">
              <label htmlFor="price-editproduct">ราคาสินค้า:</label>
              <input
                id="price-editproduct"
                name="productPrice"
                type="number"
                className="product-input-editproduct"
                value={editedProduct.productPrice}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row-editproduct">
              <label htmlFor="producthiu-editproduct">ค่าหิ้ว:</label>
              <input
                id="producthiu-editproduct"
                name="productHiu"
                type="number"
                className="product-input-editproduct"
                value={editedProduct.productHiu}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row-editproduct">
              <label htmlFor="productdeliver-editproduct">ค่าส่ง:</label>
              <input
                id="productdeliver-editproduct"
                name="productDeliver"
                type="number"
                className="product-input-editproduct"
                value={editedProduct.productDeliver}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row-editproduct">
              <label htmlFor="dateend-editproduct">วันที่สิ้นสุด:</label>
              <input
                id="dateend-editproduct"
                name="date"
                type="date"
                className="product-input-editproduct"
                value={new Date(editedProduct.date).toISOString().substring(0, 10)}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="buttonsaddproduct-editproduct">
              <button
                type="button"
                className="cancel-btn-editproduct"
                onClick={() => navigate('/')}
              >
                ยกเลิก
              </button>
              <button
                type="button"
                className="save-btn-editproduct"
              >
                บันทึก
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Editproduct;
