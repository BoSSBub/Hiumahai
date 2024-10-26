import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './RegisterSeller.css';
import shopIcon from "../img/shop2.png"; // ใช้ .. เพื่อขึ้นไปที่โฟลเดอร์ src
import carIcon from "../img/car2.png";

function RegisterSeller() {
  const location = useLocation();
  const navigate = useNavigate();
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

  const [emailExists, setEmailExists] = useState(false);
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
            setEmailExists(true);
          }
        }
      } catch (error) {
        console.error('Error checking email:', error);
      }
    };

    if (form.email) {
      checkEmailExists();
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
      return;
    }

    // Step 1: Show the first Swal with two icons and a confirm button
    await Swal.fire({
      title: 'วิธีคิดค่าหัวและค่าจัดส่ง',
      html: `
        <div style="display: flex; flex-direction: column; align-items: center;">
          <img src="${shopIcon}" alt="Icon" style="width: 50px; height: 50px; margin-bottom: 10px;" />
          <h3 style="font-weight: bold; font-size: 16px;">วิธีคิดค่าหิ้ว</h3>
          <p style="font-size: 14px;">ค่าหัวชั้นแรก/เริ่มต้น ถูกกำหนดโดยคนรับหิ้ว และการคำนวณราคาค่าหัวชั้นที่ 2 เป็นต้นไป จะคิดที่ประมาณ 30% ของราคาค่าหัวของสินค้าชิ้นนั้น โดยระบบจะคิดชั้นแรกจากราคาค่าหัวที่สูงที่สุด</p>
          <p style="font-size: 12px;">(ทั้งนี้คนรับหัวสามารถปรับลดราคาค่าหัวให้ต่ำกว่าการคำนวณของระบบ แต่จะไม่สามารถปรับให้สูงกว่าการคำนวณของระบบ)</p>
          <img src="${carIcon}" alt="Icon" style="width: 50px; height: 50px; margin-bottom: 10px;" />
          <h3 style="font-weight: bold; font-size: 16px;">วิธีคิดค่าจัดส่ง</h3>
          <p style="font-size: 14px;">ค่าจัดส่งจะคิดจากน้ำหนักของสินค้า</p>
          <p style="font-size: 12px;">หิ้วมาให้ขอสงวนสิทธิ์ในการเปลี่ยนแปลงการคำนวณค่าหัวและค่าจัดส่งได้ตามความเหมาะสม ในกรณีที่สถานที่จัดส่งอยู่ในเขตพื้นที่ห่างไกลหรือพื้นที่พิเศษสำหรับบริษัทขนส่งที่เลือกใช้ บริษัทขนส่งอาจจะมีการเก็บค่าจัดส่งเพิ่มเติม</p>
          <div style="display: flex; align-items: center; margin-top: 10px;">
            <input type="checkbox" id="agreeCheckbox" />
            <label for="agreeCheckbox" style="margin-left: 5px;">ตอบรับเงื่อนไขและกฎ</label>
          </div>
        </div>
      `,
      confirmButtonText: 'ยืนยัน',
      confirmButtonColor: '#3085d6',
      preConfirm: () => {
        const agreeCheckbox = Swal.getPopup().querySelector('#agreeCheckbox');
        if (!agreeCheckbox.checked) {
          Swal.showValidationMessage('กรุณายอมรับเงื่อนไขและกฎก่อนกดยืนยัน');
        }
      }
    });

    // Step 2: Show the second Swal with a toggle to show more content
    await Swal.fire({
      title: 'รายการสินค้าที่ไม่สามารถนำเสนอ ซื้อ หรือจัดส่ง ผ่านแพลตฟอร์มแอพพลิเคชั่นของ หิ้วมาให้',
      html: `
        <div>
          <div id="shortContent" style="display: block;">
            <h3 style="font-weight: bold; font-size: 16px;">1. สินค้าที่ผิดกฎหมายไทย</h3>
            <p style="font-size: 14px;">1.1 สินค้าที่เกี่ยวข้องกับเรื่องเพศหรือสิ่งอนาจารทุกประเภท</p>
            <p style="font-size: 14px;">1.2 ปืนและอาวุธทุกประเภท</p>
            <p style="font-size: 14px;">1.3 ยาและเภสัชภัณฑ์...</p>
          </div>
          <div id="fullContent" style="display: none;">
            <h3 style="font-weight: bold; font-size: 16px;">1. สินค้าที่ผิดกฎหมายไทย</h3>
            <p style="font-size: 14px;">1.1 สินค้าที่เกี่ยวข้องกับเรื่องเพศหรือสิ่งอนาจารทุกประเภท</p>
            <p style="font-size: 14px;">1.2 ปืนและอาวุธทุกประเภท</p>
            <p style="font-size: 14px;">1.3 ยาและเภสัชภัณฑ์ รวมถึงอุปกรณ์ที่ออกแบบมาเพื่อผลิตหรือใช้ร่วมกับยาเสพติดผิดกฎหมายทุกชนิด</p>
            <p style="font-size: 14px;">1.4 ยาสูบและบุรี่ไฟฟ้า</p>
            <p style="font-size: 14px;">1.5 สารพิษหรือสารเคมีอันตราย</p>
            <p style="font-size: 14px;">1.6 อุปกรณ์สำหรับการพนัน ล็อตเตอรี่ และการเสี่ยง</p>
            <p style="font-size: 14px;">1.7 พันธ์พืชและสัตว์คุ้มครอง</p>
            <p style="font-size: 14px;">1.8 โบราณวัตถุ และศาสนวัตถุ</p>
            <p style="font-size: 14px;">1.9 เงินตรารวมถึงเงินสกุลดิจิตอล</p>

            <h3 style="font-weight: bold; font-size: 16px;">2. สินค้าที่มีเจตนาแฝง กดขี่ หรือผิดจรรยาบรรณ</h3>
            <p style="font-size: 14px;">2.1 ผลิตภัณฑ์ปลอมหรือละเมิดลิขสิทธิ์</p>
            <p style="font-size: 14px;">2.2 สินค้าที่มีลิขสิทธิ์ โดยไม่ได้รับอนุญาต</p>
            <p style="font-size: 14px;">2.3 สินค้าลักลอบนำเข้า หรือได้มาโดยผิดกฎหมาย</p>
            <p style="font-size: 14px;">2.4 สินค้าที่มีการโฆษณาเกินจริง เช่นสินค้าที่มีการจูงใจด้วยของรางวัล</p>
            <p style="font-size: 14px;">2.5 สินค้าเกี่ยวกับการลงทุนที่ไม่ได้รับอนุณาต</p>
            <p style="font-size: 14px;">2.6 เครื่องรางหรือเครื่องนำโชคที่มีราคาสูง</p>
            <p style="font-size: 14px;">2.7 สัตว์มีชีวิต</p>
            <p style="font-size: 14px;">2.8 ยาหรือเภสัชภัณฑ์เทียม เช่นยาชะลอวัย ยาบำรุงกำลังทางเพศ</p>

            <h3 style="font-weight: bold; font-size: 16px;">3. สินค้าที่อาจเข้าข่ายการฟอกเงินหรือเป็นสินค้าที่ผิดกฎหมาย</h3>
            <p style="font-size: 14px;">3.1 ทองคำ หุ้น กองทุน หรือเงินทุกหลักทรัพย์</p>
            <p style="font-size: 14px;">3.2 โลหะมีค่าและแร่ธาตุหายาก</p>
            <p style="font-size: 14px;">3.3 ผลิตภัณฑ์การเงิน รวมถึงเงินตาต่างประเทศ</p>
            <p style="font-size: 14px;">3.4 สินค้าสิ่งที่ไม่มีมูลค่า</p>
            <p style="font-size: 14px;">3.5 เงินในเกมออนไลน์</p>

            <h3 style="font-weight: bold; font-size: 16px;">4. สินค้าที่อาจมีการควบคุม หรือเสี่ยงต่อการควบคุม</h3>
            <p style="font-size: 14px;">4.1 น้ำมันดิบ หรือผลิตภัณฑ์ปิโตรเลียม</p>
            <p style="font-size: 14px;">4.2 อุปกรณ์การแพทย์</p>
          </div>
          <button id="toggleButton" style="margin-top: 10px;">ดูเพิ่มเติม</button>
          <div style="display: flex; align-items: center; margin-top: 10px;">
            <input type="checkbox" id="agreeCheckbox2" />
            <label for="agreeCheckbox2" style="margin-left: 5px;">ตอบรับเงื่อนไขและกฎ</label>
          </div>
        </div>
      `,
      confirmButtonText: 'ยืนยัน',
      confirmButtonColor: '#3085d6',
      didOpen: () => {
        const toggleButton = document.getElementById('toggleButton');
        const shortContent = document.getElementById('shortContent');
        const fullContent = document.getElementById('fullContent');
        toggleButton.addEventListener('click', () => {
          if (shortContent.style.display === 'block') {
            shortContent.style.display = 'none';
            fullContent.style.display = 'block';
            toggleButton.textContent = 'ดูน้อยลง';
          } else {
            shortContent.style.display = 'block';
            fullContent.style.display = 'none';
            toggleButton.textContent = 'ดูเพิ่มเติม';
          }
        });
      },
      preConfirm: () => {
        const agreeCheckbox2 = Swal.getPopup().querySelector('#agreeCheckbox2');
        if (!agreeCheckbox2.checked) {
          Swal.showValidationMessage('กรุณายอมรับเงื่อนไขและกฎก่อนกดยืนยัน');
        }
      }
    });

    // ส่งข้อมูลไปยังเซิร์ฟเวอร์
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
          confirmButtonColor: '#3085d6',
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
      {emailExists ? (
        <div className="email-exists-message">
          <p style={{ color: 'red' }}>ระบบกำลังตรวจสอบ</p>
          <button className="back-btn" onClick={() => navigate(-1)}>back</button>
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
            <button className="cancel-btn1" type="button" onClick={() => navigate(-1)}>ยกเลิก</button>
            <button className="submit-btn1" type="submit">ยืนยัน</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default RegisterSeller;
