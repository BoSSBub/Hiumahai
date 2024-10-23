import React, { useState } from 'react';
import './Register.css'; // Ensure this CSS file is created
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Register() {
    const [formData, setFormData] = useState({
        fullname: '',
        age: '',
        gender: '',
        phone: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        profilePicture: null,
        role: 'user',
    });

    // State to hold the image URL for preview
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle file input
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log('Selected file:', file); // ตรวจสอบไฟล์ที่เลือก
        setFormData({
            ...formData,
            profilePicture: file,
        });
        
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
                console.log('Image URL:', reader.result); // ตรวจสอบลิงก์ของรูปภาพที่โหลด
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('Userdetail_name', formData.fullname);
        data.append('Userdetail_age', formData.age);
        data.append('Userdetail_sex', formData.gender);
        data.append('Userdetail_Phone', formData.phone);
        data.append('Email', formData.email);
        data.append('Username', formData.username);
        data.append('Password', formData.password);
        data.append('Role', formData.role);
        if (formData.profilePicture) {
            data.append('Userimg', formData.profilePicture);
        }

        try {
            const response = await fetch('https://localhost:7078/api/Users', {
                method: 'POST',
                body: data,
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Registration successful:', result);
                alert('ลงทะเบียนสำเร็จแล้ว!');
                navigate('/login');
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData);
                setErrorMessage("ลงทะเบียนไม่สำเร็จ");
                setFormData({
                    fullname: '',
                    age: '',
                    gender: '',
                    phone: '',
                    email: '',
                    username: '',
                    password: '',
                    confirmPassword: '',
                    profilePicture: null,
                    role: 'user',
                });
                setImagePreviewUrl(null);  // Clear image preview
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setErrorMessage("เกิดข้อผิดพลาด");
        }
    };

    return (
        <div className="outer-container">
            <div className="register-container">
                <div className="register-form">
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className="profile-picture2">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            id="profilePicture2"
                        />
                        <label htmlFor="profilePicture2" className="circle2">
                            {imagePreviewUrl ? (
                                <img
                                    src={imagePreviewUrl}
                                    alt="Profile Preview"
                                    className="profile-image2"
                                    style={{ display: 'block' }} // Ensure that image is always displayed
                                />
                            ) : (
                                <span className="upload-text1">+ เพิ่มรูปภาพ</span>
                            )}
                        </label>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <label htmlFor="fullname">ชื่อ-นามสกุล:</label>
                            <input
                                id="fullname"
                                name="fullname"
                                type="text"
                                className="register-input"
                                placeholder="ชื่อ-นามสกุล"
                                value={formData.fullname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-row age-gender">
                            <div className="age">
                                <label htmlFor="age">อายุ:</label>
                                <input
                                    id="age"
                                    name="age"
                                    type="text"
                                    className="register-input input-age"
                                    placeholder="อายุ"
                                    value={formData.age}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="gender-select">
                                <label htmlFor="gender" style={{ marginRight: 10 }}>เพศ:</label>
                                <select
                                    id="gender"
                                    name="gender"
                                    className="register-input"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">เลือก</option>
                                    <option value="male">ชาย</option>
                                    <option value="female">หญิง</option>
                                    <option value="LGBTQ">LGBTQ+</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <label htmlFor="phone">เบอร์โทรศัพท์:</label>
                            <input
                                id="phone"
                                name="phone"
                                type="text"
                                className="register-input"
                                placeholder="เบอร์โทรศัพท์"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-row">
                            <label htmlFor="email">E-mail:</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="register-input"
                                placeholder="E-mail"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-row">
                            <label htmlFor="username">Username:</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                className="register-input"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-row">
                            <label htmlFor="password">Password:</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="register-input"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-row">
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                className="register-input"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="buttonsregister">
                            <button type="button" className="cancel-btn">ยกเลิก</button>
                            <button type="submit" className="submit-btn">ยืนยัน</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
