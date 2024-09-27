import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // นำเข้า Link จาก React Router
import './Brand.css';

const BrandList = () => {
  const [brands, setBrands] = useState([]);

  // ดึงข้อมูลแบรนด์ทั้งหมด
  useEffect(() => {
    fetch('https://localhost:7078/api/Brand/top5')
      .then((response) => response.json())
      .then((data) => setBrands(data))
      .catch((error) => console.error('Error fetching brands:', error));
  }, []);

  return (
    <div className="brand-list-container">
      <h2 className="brand-title">แบรนด์</h2>
      <div className="brand-list">
        {brands.map((brand) => (
          <div key={brand.brand_id} className="brand-item">
            <Link to={`/brands/${brand.brand_id}`}>  {/* ครอบรูปด้วย Link */}
              <BrandImage id={brand.brand_id} />
            </Link>
            <p className="brand-name">{brand.brand_name}</p>
          </div>
        ))}
      </div>
      <a href="/brands" className="view-all">ดูทั้งหมด &gt;</a>

    </div>
  );
};

const BrandImage = ({ id }) => {
  const [imageSrc, setImageSrc] = useState(null);

  // ดึงรูปสำหรับแต่ละแบรนด์
  useEffect(() => {
    fetch(`https://localhost:7078/api/Brand/${id}/image`)
      .then((response) => {
        if (response.ok) {
          return response.blob();
        }
        throw new Error('Image not found');
      })
      .then((blob) => {
        setImageSrc(URL.createObjectURL(blob));
      })
      .catch((error) => console.error('Error fetching image:', error));
  }, [id]);

  return (
    <div className="brand-image-container">
      {imageSrc ? (
        <img src={imageSrc} alt={`Brand ${id}`} className="brand-image" />
      ) : (
        <div className="brand-placeholder">Image not available</div>
      )}
    </div>
  );
};

export default BrandList;
