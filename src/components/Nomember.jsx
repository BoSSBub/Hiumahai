import React, { useContext, useEffect, useState } from 'react';
import './Nomember.css'; 
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';  // Import UserContext
import Swal from 'sweetalert2';  // Import Swal

function Nomember() {
    const location = useLocation();
    const navigate = useNavigate();
    const { userDetails, setUserDetails } = useContext(UserContext);  // Get user details and context setter
    const [userInfo, setUserInfo] = useState(userDetails || null);  

    const defaultProfileImg = "https://via.placeholder.com/150";  

    // Fetch user details if not available in context
    useEffect(() => {
        if (!userInfo && userDetails?.userId) {
            axios.get(`https://localhost:7078/api/Users/details/${userDetails.userId}`)
                .then(response => setUserInfo(response.data))
                .catch(error => console.error('Error fetching user details:', error));
        }
    }, [userInfo, userDetails]);

    if (!userInfo) return <div>Loading...</div>;

    const { username, email, userimg, role } = userInfo;
    const profileImageSrc = userimg
        ? `data:image/jpeg;base64,${userimg}`
        : defaultProfileImg;

    const handleLogout = () => {
        localStorage.removeItem('authToken');  // Clear token from local storage
        setUserDetails(null);  // Clear user details from context
        navigate('/login');  // Navigate to login page
    };

    const handleRegisterClick = () => {
        navigate('/register-seller', { state: { userDetails: userInfo } });
    };
    const handleNavigateToMyHiu = () => {
        navigate('/myhiu', { state: { userDetails: userInfo } });
    };

    // ฟังก์ชัน Swal สำหรับวิธีคิดค่าหัวและค่าจัดส่ง
    const showHiuInfoSwal = async () => {
        await Swal.fire({
            title: 'วิธีคิดค่าหัวและค่าจัดส่ง',
            html: `
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <img src="/src/img/shop1.png" alt="Icon" style="width: 50px; height: 50px; margin-bottom: 10px;" />
                    <h3 style="font-weight: bold; font-size: 16px;">วิธีคิดค่าหิ้ว</h3>
                    <p style="font-size: 14px;">ค่าหัวชั้นแรก/เริ่มต้น ถูกกำหนดโดยคนรับหิ้ว และการคำนวณราคาค่าหัวชั้นที่ 2 เป็นต้นไป จะคิดที่ประมาณ 30% ของราคาค่าหัวของสินค้าชิ้นนั้น โดยระบบจะคิดชั้นแรกจากราคาค่าหัวที่สูงที่สุด</p>
                    <p style="font-size: 12px;">(ทั้งนี้คนรับหัวสามารถปรับลดราคาค่าหัวให้ต่ำกว่าการคำนวณของระบบ แต่จะไม่สามารถปรับให้สูงกว่าการคำนวณของระบบ)</p>
                    <img src="/src/img/car2.png" alt="Icon" style="width: 50px; height: 50px; margin-bottom: 10px;" />
                    <h3 style="font-weight: bold; font-size: 16px;">วิธีคิดค่าจัดส่ง</h3>
                    <p style="font-size: 14px;">ค่าจัดส่งจะคิดจากน้ำหนักของสินค้า</p>
                    <p style="font-size: 12px;">หิ้วมาให้ขอสงวนสิทธิ์ในการเปลี่ยนแปลงการคำนวณค่าหัวและค่าจัดส่งได้ตามความเหมาะสม ในกรณีที่สถานที่จัดส่งอยู่ในเขตพื้นที่ห่างไกลหรือพื้นที่พิเศษสำหรับบริษัทขนส่งที่เลือกใช้ บริษัทขนส่งอาจจะมีการเก็บค่าจัดส่งเพิ่มเติม</p>
                </div>
            `,
            confirmButtonText: 'ยืนยัน',
            confirmButtonColor: '#3085d6',
        });
    };

    const showProductInfoSwal = async () => {
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
                        <p style="font-size: 14px;">1.6 อุปกรณ์สำหรับการพนัน ล็อตเตอรี่ และการเสี่ยงโชค</p>
                        <p style="font-size: 14px;">1.7 พันธ์พืชและสัตว์คุ้มครอง</p>
                        <p style="font-size: 14px;">1.8 โบราณวัตถุ และศาสนวัตถุ</p>
                        <p style="font-size: 14px;">1.9 เงินตรารวมถึงเงินสกุลดิจิตอล</p>
    
                        <h3 style="font-weight: bold; font-size: 16px;">2. สินค้าที่มีเจตนาแฝง กดขี่ หรือผิดจรรยาบรรณ</h3>
                        <p style="font-size: 14px;">2.1 ผลิตภัณฑ์ปลอมหรือละเมิดลิขสิทธิ์</p>
                        <p style="font-size: 14px;">2.2 สินค้าที่มีลิขสิทธิ์ โดยไม่ได้รับอนุญาต</p>
                        <p style="font-size: 14px;">2.3 สินค้าลักลอบนำเข้า หรือได้มาโดยผิดกฎหมาย</p>
                        <p style="font-size: 14px;">2.4 สินค้าที่มีการโฆษณาเกินจริง เช่นสินค้าที่มีการจูงใจด้วยของรางวัล</p>
                        <p style="font-size: 14px;">2.5 สินค้าเกี่ยวกับการลงทุนที่ไม่ได้รับอนุญาต</p>
                        <p style="font-size: 14px;">2.6 เครื่องรางหรือเครื่องนำโชคที่มีราคาสูง</p>
                        <p style="font-size: 14px;">2.7 สัตว์มีชีวิต</p>
                        <p style="font-size: 14px;">2.8 ยาหรือเภสัชภัณฑ์เทียม เช่นยาชะลอวัย ยาบำรุงกำลังทางเพศ</p>
    
                        <h3 style="font-weight: bold; font-size: 16px;">3. สินค้าที่อาจเข้าข่ายการฟอกเงินหรือเป็นสินค้าที่ผิดกฎหมาย</h3>
                        <p style="font-size: 14px;">3.1 ทองคำ หุ้น กองทุน หรือเงินทุกหลักทรัพย์</p>
                        <p style="font-size: 14px;">3.2 โลหะมีค่าและแร่ธาตุหายาก</p>
                        <p style="font-size: 14px;">3.3 ผลิตภัณฑ์การเงิน รวมถึงเงินต่างประเทศ</p>
                        <p style="font-size: 14px;">3.4 สินค้าสิ่งที่ไม่มีมูลค่า</p>
                        <p style="font-size: 14px;">3.5 เงินในเกมออนไลน์</p>
    
                        <h3 style="font-weight: bold; font-size: 16px;">4. สินค้าที่อาจมีการควบคุม หรือเสี่ยงต่อการควบคุม</h3>
                        <p style="font-size: 14px;">4.1 น้ำมันดิบ หรือผลิตภัณฑ์ปิโตรเลียม</p>
                        <p style="font-size: 14px;">4.2 อุปกรณ์การแพทย์</p>
                        <p style="font-size: 14px;">4.3 อาหารและเครื่องดื่มที่ไม่ได้รับการรับรองจากองค์การอาหารและยา (อย.)</p>
                        <p style="font-size: 14px;">4.4 สินค้าที่มีวัตถุอันตราย เช่น สารเคมี สารกัดกร่อน หรือวัตถุไวไฟ</p>
                    </div>
    
                    <button id="toggleButton" style="margin-top: 10px;">ดูเพิ่มเติม</button>
                </div>
            `,
            confirmButtonText: 'ยืนยัน',
            confirmButtonColor: '#3085d6',
            didOpen: () => {
                const toggleButton = Swal.getHtmlContainer().querySelector('#toggleButton');
                let isExpanded = false;  // สถานะเริ่มต้นของการขยาย
                toggleButton.addEventListener('click', () => {
                    const shortContent = Swal.getHtmlContainer().querySelector('#shortContent');
                    const fullContent = Swal.getHtmlContainer().querySelector('#fullContent');
    
                    if (isExpanded) {
                        shortContent.style.display = 'block';  // แสดงเนื้อหาสั้น
                        fullContent.style.display = 'none';  // ซ่อนเนื้อหาเต็ม
                        toggleButton.textContent = 'ดูเพิ่มเติม';  // เปลี่ยนข้อความปุ่ม
                    } else {
                        shortContent.style.display = 'none';  // ซ่อนเนื้อหาสั้น
                        fullContent.style.display = 'block';  // แสดงเนื้อหาเต็ม
                        toggleButton.textContent = 'ดูน้อยลง';  // เปลี่ยนข้อความปุ่ม
                    }
                    isExpanded = !isExpanded;  // สลับสถานะการขยาย
                });
            }
        });
    };
    
    

    return (
        <div className="outer-container">
            <div className="noprofile-container">
                <div className="profile-header">
                    <div className="username">{username}</div>
                    <img src={profileImageSrc} alt="Profile" className="profile-image1" />
                </div>

                <div className="buttons">
                    {role !== 'Merchant' ? (
                        <button className="btn-primary" onClick={handleRegisterClick}>
                            <img src="/src/img/shop1.png" alt="Shop" className="iconnomember" />
                            <span className="btn-text">สมัครเป็นผู้รับหิ้ว</span>
                        </button>
                    ) : (
                        <>
                            <button className="btn-primary-merchant" onClick={handleNavigateToMyHiu}>
                                <img src="/src/img/shop1.png" alt="Shop" className="iconnomember-merchant" />
                                <span className="btn-text-merchant">รับหิ้วของฉัน</span>
                            </button>

                            {/* ปุ่มที่แสดง Swal */}
                            <button className="btn-secondary" onClick={showHiuInfoSwal}>
                                <img src="/src/img/problem.png" alt="Contract" className="iconnomember" />
                                <span className="btn-text">ข้อตกลงการรับหิ้ว</span>
                            </button>

                            <button className="btn-secondary" onClick={showProductInfoSwal}>
                                <img src="/src/img/problem.png" alt="Rules" className="iconnomember" />
                                <span className="btn-text">ข้อกำหนดเกี่ยวกับสินค้า</span>
                            </button>
                        </>
                    )}

                    <button className="btn-secondary">
                        <img src="/src/img/problem.png" alt="Problem" className="iconnomember" />
                        <span className="btn-text">แจ้งปัญหา</span>
                    </button>
                </div>

                <div className="bottom-section">
                    <button className="btn-logout" onClick={handleLogout}>
                        <span className="btn-text">ออกจากระบบ</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Nomember;
