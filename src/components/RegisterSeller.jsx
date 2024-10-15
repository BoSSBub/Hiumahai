import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import Swal from 'sweetalert2';
import './RegisterSeller.css';

function RegisterSeller() {
  const location = useLocation();
  const navigate = useNavigate(); // Create a navigate function
  const { userDetails } = location.state || {};

  const [form, setForm] = useState({
    firstName: userDetails?.userdetail_name || '',
    age: userDetails?.userdetail_age || '',
    gender: userDetails?.userdetail_sex || '',
    phone: userDetails?.userdetail_Phone || '',
    email: userDetails?.email || '',
    address: userDetails?.address || '',
    bankAccount: userDetails?.bankAccount || '',
    idNumber: userDetails?.idNumber || '',
    accountNumber: '',
  });

  const [emailExists, setEmailExists] = useState(false); // State to track email existence
  const userimg = userDetails?.userimg || null;
  const defaultProfileImg = 'path/to/default/image.jpg';
  const profileImageSrc = userimg ? `data:image/jpeg;base64,${userimg}` : defaultProfileImg;

  useEffect(() => {
    const checkEmailExists = async () => {
      try {
        const response = await fetch(`https://localhost:7078/api/Users/email/${form.email}`);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setEmailExists(true); // Email exists in the database
          }
        }
      } catch (error) {
        console.error('Error checking email:', error);
      }
    };

    if (form.email) {
      checkEmailExists(); // Check email existence when the email is set
    }
  }, [form.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailExists) {
      Swal.fire('คุณมีข้อมูลอยู่ในระบบ', 'กรุณาเข้าสู่ระบบหรือใช้ข้อมูลอื่น', 'info');
      return; // Prevent submission if email already exists
    }

    try {
      const response = await fetch('https://localhost:7078/api/Users/register-merchant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          usermerchant_national: form.idNumber,
          usermerchant_address: form.address,
          usermerchant_bank: form.bankAccount,
          usermerchant_number: form.accountNumber,
        }),
      });

      if (response.ok) {
        Swal.fire({
          html: `
              <div style="display: flex; flex-direction: column; align-items: center;">
                  <h2 style="margin-bottom: 20px;">ดำเนินการตรวจสอบข้อมูล</h2>
                  <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" 
                       alt="Icon" style="width: 50px; height: 50px; margin-bottom: 20px;" />
                  <p>หลังจากดำเนินการตรวจสอบข้อมูลเสร็จเรียบร้อยแล้ว คุณจะได้รับอีเมลยืนยันตัวตนภายใน 2-3 วันทำการ</p>
              </div>
          `,
          confirmButtonText: 'ยืนยัน',
          customClass: { confirmButton: 'btn-primary' },
        }).then(() => {
          navigate('/nomember', { state: { userId: userDetails.id, userDetails } });
        });
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถลงทะเบียนได้', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์', 'error');
    }
  };

  return (
    <div className="outer-container1">
      {/* Display message if email exists */}
      {emailExists ? (
        <div className="email-exists-message">
          <p style={{ color: 'red' }}>ระบบกำลังตรวจสอบ</p>
          <button className="back-btn" onClick={() => navigate(-1)}>back</button> {/* Back button */}
        </div>
      ) : (
        <form className="register-form1" onSubmit={handleSubmit}>
          <div className="profile-picture1">
            <img src={profileImageSrc} alt="Profile" className="circle1" />
          </div>

          <div className="form-row1">
            <label htmlFor="firstName">ชื่อ-นามสกุล</label>
            <input id="firstName" name="firstName" type="text" value={form.firstName} readOnly required />
          </div>

          <div className="form-row1 age-gender-row1">
            <div className="age-field1">
              <label htmlFor="age">อายุ</label>
              <input id="age" name="age" type="text" value={form.age} readOnly required />
            </div>
            <div className="gender-field1">
              <label htmlFor="gender">เพศ</label>
              <select id="gender" name="gender" value={form.gender} disabled required>
                <option value="male">ชาย</option>
                <option value="female">หญิง</option>
                <option value="other">อื่นๆ</option>
              </select>
            </div>
          </div>

          <div className="form-row1">
            <label htmlFor="phone">เบอร์โทรศัพท์</label>
            <input id="phone" name="phone" type="text" value={form.phone} readOnly required />
          </div>

          <div className="form-row1">
            <label htmlFor="email">E-mail</label>
            <input id="email" name="email" type="email" value={form.email} readOnly required />
          </div>

          <div className="form-row1">
            <label htmlFor="idNumber">เลขประจำตัวประชาชน</label>
            <input id="idNumber" name="idNumber" type="text" value={form.idNumber} onChange={handleChange} required />
          </div>

          <div className="form-row1">
            <label htmlFor="address">ที่อยู่</label>
            <input id="address" name="address" type="text" value={form.address} onChange={handleChange} required />
          </div>

          <div className="form-row1">
            <label htmlFor="bankAccount">บัญชีธนาคาร</label>
            <select id="bankAccount" name="bankAccount" value={form.bankAccount} onChange={handleChange} required>
              <option value="">เลือกบัญชีธนาคาร</option>
              <option value="ธนาคารกสิกรไทย">ธนาคารกสิกรไทย</option>
              <option value="ธนาคารกรุงไทย">ธนาคารกรุงไทย</option>
              <option value="ธนาคารกรุงเทพ">ธนาคารกรุงเทพ</option>
              <option value="ธนาคารไทยพาณิชย์">ธนาคารไทยพาณิชย์</option>
            </select>
          </div>

          <div className="form-row1">
            <label htmlFor="accountNumber">หมายเลขบัญชี</label>
            <input id="accountNumber" name="accountNumber" type="text" value={form.accountNumber} onChange={handleChange} required />
          </div>

          <div className="buttons-register1">
            <button className="cancel-btn1" type="button" onClick={() => navigate(-1)}>ยกเลิก</button> {/* Back button */}
            <button className="submit-btn1" type="submit">ยืนยัน</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default RegisterSeller;
