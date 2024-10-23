import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Makepayment.css';

function Makepayment() {
  const location = useLocation();
  const { totalPrice, procurement_id, quantity } = location.state || {};
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(file); // Store the file object instead of the data URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append('Procurement_id', procurement_id);
    formData.append('Finance', totalPrice); // Assuming Finance is the field name in your API
    formData.append('Amount', quantity); // Assuming Amount is the field name in your API
    formData.append('OrderStatus', 0); // Assuming Amount is the field name in your API
    if (selectedImage) {
      formData.append('ImgFile', selectedImage); // Append the selected image
    }

    try {
      const response = await fetch('https://localhost:7078/api/Procurement/status', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
        // Handle successful submission, e.g., redirect or show a success message
      } else {
        console.error('Error:', response.statusText);
        // Handle error response
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network errors
    }
  };

  return (
    <div className='main_Makepayment'>
      <h1>Make Payment</h1>
      <img src="src/img/image-removebg-preview (31).png" alt="" />
      
      {/* Input for selecting an image */}
      <input type="file" accept="image/*" onChange={handleImageChange} />
      
      {/* Display selected image */}
      {selectedImage && (
        <img src={URL.createObjectURL(selectedImage)} alt="Uploaded" style={{ width: '200px', marginTop: '10px' }} />
      )}

      {totalPrice !== undefined ? (
        <div>
          <h2>Total Price: {totalPrice}</h2>
          {/* Additional payment options can go here */}
        </div>
      ) : (
        <div>Error: Total price not available.</div>
      )}

      {/* Submit button to send the data */}
      <button onClick={handleSubmit}>Submit Payment</button>
    </div>
  );
}

export default Makepayment;
