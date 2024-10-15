import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import './RegisterSeller.css'; 

function RegisterSeller() {
  const location = useLocation();
  const { userDetails } = location.state || {}; // รับข้อมูลจาก location.state

  // ตั้งค่าฟอร์มด้วยข้อมูลจาก userDetails
  const [form, setForm] = useState({
    firstName: userDetails ? userDetails.userdetail_name || '' : '',
    age: userDetails ? userDetails.userdetail_age || '' : '',
    gender: userDetails ? userDetails.userdetail_sex || '' : '',
    phone: userDetails ? userDetails.userdetail_Phone || '' : '',
    email: userDetails ? userDetails.email || '' : '',
    address: userDetails ? userDetails.address || '' : '',
    bankAccount: userDetails ? userDetails.bankAccount || '' : '',
    idNumber: userDetails ? userDetails.idNumber || '' : '',
    accountNumber: '', // สำหรับหมายเลขบัญชี
  });

  const userimg = userDetails?.userimg || null; // ตรวจสอบ user image
  const defaultProfileImg = 'path/to/default/image.jpg'; // Default image ถ้าไม่มีรูป
  const profileImageSrc = userimg ? `data:image/jpeg;base64,${userimg}` : defaultProfileImg;

  // ฟังก์ชันจัดการเมื่อมีการเปลี่ยนแปลงข้อมูลในฟอร์ม
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // ฟังก์ชันแสดง Swal เมื่อกดปุ่มยืนยัน
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      // ถ้าฟอร์มสมบูรณ์ ให้แสดง SweetAlert
      Swal.fire({
        html: `
          <div style="display: flex; flex-direction: column; align-items: center;">
            <h2 style="margin-bottom: 20px;">ดำเนินการตรวจสอบข้อมูล</h2>
            <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="Icon" style="width: 50px; height: 50px; margin-bottom: 20px;" />
            <p style="margin-top: 10px;">หลังจากดำเนินการตรวจสอบข้อมูลเสร็จเรียบร้อยแล้ว คุณจะได้รับอีเมลยืนยันตัวตนจาก หิ้วมาให้ (Hiumahai) ภายใน 2-3 วันทำการ ขอบคุณค่ะ</p>
          </div>
        `,
        confirmButtonText: 'ยืนยัน',
        customClass: {
          confirmButton: 'btn-primary',
        }
      }).then(() => {
        // เมื่อผู้ใช้กดปุ่มยืนยัน
        console.log('Form submitted:', form); // ส่งฟอร์มหรือทำการ submit ข้อมูล
      });
    } else {
      console.log('Please fill out all required fields.');
    }
  };

  return (
    <div className="outer-container1">
      <form className="register-form1" onSubmit={handleSubmit}>
        <div className="profile-picture1">
          <img src={profileImageSrc} alt="Profile" className="circle1" />
        </div>

        <div className="form-row1">
          <label htmlFor="firstName">ชื่อ-นามสกุล</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={form.firstName} // แสดงชื่อ-นามสกุล
            readOnly  // ไม่ให้แก้ไข
            required
          />
        </div>
        <div className="form-row1 age-gender-row1">
          <div className="age-field1">
            <label htmlFor="age">อายุ</label>
            <input
              id="age"
              name="age"
              type="text"
              value={form.age} // แสดงอายุ
              readOnly  // ไม่ให้แก้ไข
              className="input-age1"
              required
            />
          </div>
          <div className="gender-field1">
            <label htmlFor="gender">เพศ</label>
            <select
              id="gender"
              name="gender"
              value={form.gender} // แสดงเพศ
              disabled  // ไม่ให้แก้ไข
              className="input-gender1"
              required
            >
              <option value="male">ชาย</option>
              <option value="female">หญิง</option>
              <option value="other">อื่นๆ</option>
            </select>
          </div>
        </div>
        <div className="form-row1">
          <label htmlFor="phone">เบอร์โทรศัพท์</label>
          <input
            id="phone"
            name="phone"
            type="text"
            value={form.phone} // แสดงเบอร์โทรศัพท์
            readOnly  // ไม่ให้แก้ไข
            required
          />
        </div>
        <div className="form-row1">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email} // แสดงอีเมล
            readOnly  // ไม่ให้แก้ไข
            required
          />
        </div>
        <div className="form-row1">
          <label htmlFor="idNumber">เลขประจำตัวประชาชน</label>
          <input
            id="idNumber"
            name="idNumber"
            placeholder="เลขบัตร"
            type="text"
            value={form.idNumber} // แสดงเลขประจำตัวประชาชน
            onChange={handleChange}  // ให้สามารถแก้ไขได้
            required
          />
        </div>
        <div className="form-row1">
          <label htmlFor="address">ที่อยู่</label>
          <input
            id="address"
            name="address"
            placeholder="ที่อยู่"
            type="text"
            value={form.address} // แสดงที่อยู่
            onChange={handleChange}  // ให้สามารถแก้ไขได้
            required
          />
        </div>
        
        <div className="form-row1">
          <label htmlFor="bankAccount">บัญชีธนาคาร</label>
          <select
            id="bankAccount"
            name="bankAccount"
            value={form.bankAccount} // แสดงบัญชีธนาคาร
            onChange={handleChange}  // ให้สามารถแก้ไขได้
            required
          >
            <option value="">เลือกบัญชีธนาคาร</option>
            <option value="ธนาคารกสิกรไทย">ธนาคารกสิกรไทย</option>
            <option value="ธนาคารกรุงไทย">ธนาคารกรุงไทย</option>
            <option value="ธนาคารกรุงเทพ">ธนาคารกรุงเทพ</option>
            <option value="ธนาคารไทยพาณิชย์">ธนาคารไทยพาณิชย์</option>
          </select>
        </div>

        <div className="form-row1">
          <label htmlFor="accountNumber">หมายเลขบัญชี</label>
          <input
            id="accountNumber"
            name="accountNumber"
            placeholder="หมายเลขบัญชี"
            type="text"
            value={form.accountNumber} // แสดงหมายเลขบัญชี
            onChange={handleChange}  // ให้สามารถแก้ไขได้
            required
          />
        </div>

        <div className="buttons-register1">
          <button className="cancel-btn1" type="button">ยกเลิก</button>
          <button className="submit-btn1" type="submit">ยืนยัน</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterSeller;
