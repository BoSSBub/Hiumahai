import React from 'react'
import './Register.css'; // Ensure this CSS file is createdimport './Register.css'; // Ensure this CSS file is created
function Register() {
    return (
        <div className="outer-container">
            <div className="register-container">
                <div className="register-form">
                    <div className="profile-picture">
                        <button className="circle">
                            + เพิ่มรูปภาพ
                        </button>
                    </div>
                    <form>
                        <div className="form-row">
                            <label htmlFor="fullname">ชื่อ-นามสกุล:</label>
                            <input id="fullname" type="text" className="register-input" placeholder="ชื่อ-นามสกุล" required />
                        </div>
                        <div className="form-row age-gender">
                            <div className='age'>
                                <label htmlFor="age">อายุ:</label>
                                <input id="age" type="text" className="register-input input-age" placeholder="อายุ" required />
                            </div>

                            <div className="gender-select">
                                <label htmlFor="gender" style={{ marginRight: 10 }}>เพศ:</label>
                                <select id="gender" className="register-input" required>
                                    <option value="">เลือก</option>
                                    <option value="male">ชาย</option>
                                    <option value="female">หญิง</option>
                                    <option value="LGBTQ">LGBTQ+</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <label htmlFor="phone">เบอร์โทรศัพท์:</label>
                            <input id="phone" type="text" className="register-input" placeholder="เบอร์โทรศัพท์" required />
                        </div>
                        <div className="form-row">
                            <label htmlFor="email">E-mail:</label>
                            <input id="email" type="email" className="register-input" placeholder="E-mail" required />
                        </div>
                        <div className="form-row">
                            <label htmlFor="username">Username:</label>
                            <input id="username" type="text" className="register-input" placeholder="Username" required />
                        </div>
                        <div className="form-row">
                            <label htmlFor="password">Password:</label>
                            <input id="password" type="password" className="register-input" placeholder="Password" required />
                        </div>
                        <div className="form-row">
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <input id="confirmPassword" type="password" className="register-input" placeholder="Confirm Password" required />
                        </div>
                        <div className="buttonsregister">
                            <button type="button" className="cancel-btn">ยกเลิก</button>
                            <button type="submit" className="submit-btn">ยืนยัน</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register