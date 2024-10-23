import React, { useState, useEffect } from 'react';
import './Manageproduct.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useLocation } from 'react-router-dom';
import binIcon from '../img/bin.png';

function Manageproduct() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [dateEnd, setDateEnd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { userDetails } = location.state || {};
  const email = userDetails?.email;

  // ฟังก์ชันสำหรับดึงข้อมูลสินค้าจาก API
  const fetchProducts = async () => {
    try {
      const response = await fetch(`https://localhost:7078/api/Merchant?email=${email}`);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Products data:", data);  // แสดงข้อมูลสินค้า
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      fetchProducts();
    }
  }, [email]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('https://localhost:7078/api/Brand');
        if (response.ok) {
          const data = await response.json();
          setBrands(data);
        } else {
          console.error('Error fetching brands:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []);

  // ฟังก์ชันสำหรับการลบสินค้า
  const handleDelete = async (productId, merchantId) => {
    const confirmDelete = window.confirm("คุณต้องการลบสินค้านี้ใช่หรือไม่?");
    if (confirmDelete) {
      try {
        const response = await fetch(`https://localhost:7078/api/Merchant/api/ProductMerchant/${productId}/${merchantId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('สินค้าถูกลบเรียบร้อยแล้ว');
          // อัปเดตข้อมูลสินค้าใหม่หลังจากลบ
          setProducts(products.filter((product) => product.productId !== productId));
        } else {
          const errorData = await response.json();
          alert('ไม่สามารถลบสินค้าได้: ' + JSON.stringify(errorData.errors));
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('เกิดข้อผิดพลาดในการลบสินค้า');
      }
    }
  };

  const handleEdit = (product) => {
    navigate(`/editproduct`, { state: { product } });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="manageproduct-container">
      <div className="filter-section">
        <div className="filter-group">
          <label htmlFor="brand-select">แบรนด์:</label>
          <select
            id="brand-select"
            className="product-input"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            required
          >
            <option value="">เลือกแบรนด์</option>
            {brands.map((brand) => (
              <option key={brand.brand_id} value={brand.brand_key}>
                {brand.brand_name}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="promotion-end">วันที่สิ้นสุดโปรโมชั่น:</label>
          <DatePicker
            selected={dateEnd}
            onChange={(date) => setDateEnd(date)}
            isClearable={true}
            placeholderText="เลือกวันที่สิ้นสุด"
            dateFormat="yyyy-MM-dd"
            className="product-input"
          />
        </div>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>แบรนด์</th>
            <th>รายการสินค้า</th>
            <th>ราคา</th>
            <th>วันที่</th> {/* รวมเป็นคอลัมน์เดียวสำหรับวันที่ */}
            <th>แก้ไขสินค้า</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.productId}>
                <td>{product.brandName}</td>
                <td>{product.productName}</td>
                <td>{product.productPrice} บาท</td>
                <td>
                  {product.dateEnd // ใช้ฟิลด์ที่คุณส่งจาก Addproduct
                    ? new Date(product.dateEnd).toLocaleDateString('th-TH')
                    : 'N/A'}
                </td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(product)}>
                    แก้ไข
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(product.productId, product.merchantId)}>
                    <img src={binIcon} alt="Delete" className="icon-bin" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">ไม่มีข้อมูลสินค้า</td> {/* ปรับ colSpan เป็น 5 เพื่อครอบคลุมทั้งตาราง */}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Manageproduct;
