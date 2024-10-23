import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Addproduct.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

function Addproduct() { 
    const location = useLocation();
    const navigate = useNavigate();
    const { userDetails } = location.state || {};
    const userEmail = userDetails?.email || '';

    const [productName, setProductName] = useState('');
    const [productDetail, setProductDetail] = useState('');
    const [productSelect, setProductSelect] = useState('');
    const [price, setPrice] = useState('');
    const [priceHiu, setPriceHiu] = useState('');
    const [priceShip, setPriceShip] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [brands, setBrands] = useState([]);

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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log('Selected file:', file);  // ตรวจสอบว่าไฟล์ถูกเลือก
            setProductImage(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);  // แสดง preview ของรูปภาพ
            console.log('Image Preview URL:', previewUrl);  // ตรวจสอบ URL ของ preview
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('Product.Product_name', productName);
        formData.append('Product.Product_detail', productDetail);
        formData.append('Product.Product_price', price);
        formData.append('Product.Product_hiu', priceHiu);
        formData.append('Product.Product_deliver', priceShip);
        formData.append('Product.Brand_key', productSelect);
        formData.append('Merchant.Email', userEmail);
        const formattedDate = dateEnd ? new Date(dateEnd).toISOString().split('T')[0] : '';
        formData.append('Merchant.Date', formattedDate);

        if (productImage) {
            formData.append('Product.Productimg', productImage);
        }

        try {
            const response = await fetch('https://localhost:7078/api/Merchant/api/ProductMerchant', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Product added successfully!');
                
                // Reset form values
                setProductName('');
                setProductDetail('');
                setProductSelect('');
                setPrice('');
                setPriceHiu('');
                setPriceShip('');
                setDateEnd('');
                setProductImage(null);
                setImagePreview(null);

                // Navigate back to the previous page (Myhiu page)
                navigate('/myhiu', { state: { userDetails } });
            } else {
                const errorData = await response.json();
                alert('Error: ' + JSON.stringify(errorData.errors));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the product.');
        }
    };

    return (
        <div className="outer-container">
            <div className="addproduct-container">
                <div className="addproduct-form">
                    <div className="profile-picture2">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                            id="profilePicture2"
                        />
                        <label htmlFor="profilePicture2" className="circle2">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Product Preview"
                                    className="profile-image2"
                                    style={{ display: 'block' }}
                                />
                            ) : (
                                <span className="upload-text1">+ เพิ่มรูปภาพสินค้า</span>
                            )}
                        </label>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row1">
                            <label htmlFor="productname">ชื่อสินค้า:</label>
                            <input
                                id="productname"
                                type="text"
                                className="product-input"
                                placeholder="ชื่อสินค้า"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-row1">
                            <label htmlFor="productdetail">รายละเอียดสินค้า:</label>
                            <input
                                id="productdetail"
                                type="text"
                                className="product-input"
                                placeholder="รายละเอียดสินค้า"
                                value={productDetail}
                                onChange={(e) => setProductDetail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-row1">
                            <label htmlFor="productselect">แบรนด์:</label>
                            <select
                                id="productselect"
                                className="product-input"
                                value={productSelect}
                                onChange={(e) => setProductSelect(e.target.value)}
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
                        <div className="form-row1">
                            <label htmlFor="price">ราคาสินค้า:</label>
                            <input
                                id="price"
                                type="number"
                                className="product-input"
                                placeholder="ราคาสินค้า"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-row1">
                            <label htmlFor="pricehiu">ค่าหิ้ว:</label>
                            <input
                                id="pricehiu"
                                type="number"
                                className="product-input"
                                placeholder="ค่าหิ้ว"
                                value={priceHiu}
                                onChange={(e) => setPriceHiu(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-row1">
                            <label htmlFor="priceship">ค่าส่ง:</label>
                            <input
                                id="priceship"
                                type="number"
                                className="product-input"
                                placeholder="ค่าส่ง"
                                value={priceShip}
                                onChange={(e) => setPriceShip(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-row1">
                            <label htmlFor="dateend">วันที่สิ้นสุด:</label>
                            <DatePicker
                                selected={dateEnd ? new Date(dateEnd) : null}
                                onChange={(date) => setDateEnd(date)}
                                dateFormat="yyyy-MM-dd"
                                className="product-input"
                                placeholderText="เลือกวันที่"
                            />
                        </div>
                        <div className="buttonsaddproduct">
                            <button type="button" className="cancel-btn">ยกเลิก</button>
                            <button type="submit" className="save-btn">บันทึก</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Addproduct;
