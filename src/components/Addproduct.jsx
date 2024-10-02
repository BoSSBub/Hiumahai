import React from 'react'
import './Addproduct.css';
function Addproduct() {
    return (
        <div className="outer-container">
            <div className="addproduct-container">
                <div className="addproduct-form">
                    <div className="profile-picture">
                        <button className="circle">
                            + เพิ่มรูปภาพสินค้า
                        </button>
                    </div>
                    <form>
                        <div className="form-row1">
                            <label htmlFor="productname">ชื่อสินค้า:</label>
                            <input id="productname" type="text" className="product-input" placeholder="ชื่อสินค้า" required />
                        </div>
                        <div className="form-row1">
                            <label htmlFor="productdetail">รายละเอียดสินค้า:</label>
                            <input id="productdetail" type="text" className="product-input" placeholder="รายละเอียดสินค้า" required />
                        </div>
                        <div className="form-row1">
                            <label htmlFor="productselect">ตัวเลือกสินค้า</label>
                            <select id="productselect" className="product-input" required>
                                <option value="">เลือกสินค้า</option>
                                <option value="product1">สินค้า 1</option>
                                <option value="product2">สินค้า 2</option>
                                <option value="product3">สินค้า 3</option>
                            </select>
                        </div>

                        <div className="form-row1">
                            <label htmlFor="price">ราคาสินค้า:</label>
                            <input id="price" type="number" className="product-input" placeholder="ราคาสินค้า" required />
                        </div>
                        <div className="form-row1">
                            <label htmlFor="pricehiu">ค่าหิ้ว:</label>
                            <input id="pricehiu" type="number" className="product-input" placeholder="ค่าหิ้ว" required />
                        </div>
                        <div className="form-row1">
                            <label htmlFor="priceship">ค่าส่ง:</label>
                            <input id="priceship" type="number" className="product-input" placeholder="ค่าส่ง" required />
                        </div>
                        <div className="form-row1">
                            <label htmlFor="dateend">วันที่สิ้นสุด:</label>
                            <input id="dateend" type="text" className="product-input" placeholder="วันที่สิ้นสุด" required />
                        </div>
                        <div className="buttonsaddproduct">
                            <button type="button" className="cancel-btn">ยกเลิก</button>
                            <button type="save" className="save-btn">บันทึก</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Addproduct