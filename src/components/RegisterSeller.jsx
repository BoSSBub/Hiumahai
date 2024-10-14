import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './RegisterSeller.css'; 

function RegisterSeller() {
  const location = useLocation();
  const { userDetails } = location.state || {};  // Retrieve data from location.state

  const [form, setForm] = useState({
    firstName: userDetails ? userDetails.Userdetail_name || '' : '',
    lastName: userDetails ? userDetails.Userdetail_lastName || '' : '', // Ensure the correct field is used
    email: userDetails ? userDetails.Email || '' : '',
    userId: userDetails ? userDetails.Users_id || '' : '',
  });

  // Assume userimg is part of userDetails, otherwise define it accordingly
  const userimg = userDetails?.userimg; // Retrieve user image from userDetails
  const defaultProfileImg = 'path/to/default/image.jpg'; // Provide a default image path
  const profileImageSrc = userimg ? `data:image/jpeg;base64,${userimg}` : defaultProfileImg;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic here, e.g., API call
    console.log('Form submitted:', form);
  };

  return (
    <div className="mainform">
      <div className="username">{form.firstName} {form.lastName}</div>
      
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">ลงทะเบียนผู้รับหิ้ว</p>
        <img src={profileImageSrc} alt="Profile" className="profile-image" />
        <div className="flex">
          <div className="flex-name"> 
            <p>ชื่อ-นามสกุล</p>
          <label htmlFor="firstName">
            
            <input
              id="firstName"
              name="firstName"
              required
              placeholder=""
              type="text"
              className="input"
              value={form.firstName}
              onChange={handleChange}
            />
            <span>Firstname</span>
          </label>
          </div>
          <label htmlFor="lastName">
            
            <input
              id="lastName"
              name="lastName"
              required
              placeholder=""
              type="text"
              className="input"
              value={form.lastName}
              onChange={handleChange}
            />
            <span>Lastname</span>
          </label>
        </div>

        <label htmlFor="email">
          <input
            id="email"
            name="email"
            required
            placeholder=""
            type="email"
            className="input"
            value={form.email}
            onChange={handleChange}
          />
          <span>Email</span>
        </label>

        <input type="hidden" name="userId" value={form.userId} /> {/* Send userId without displaying */}

        <button className="submit" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RegisterSeller;
