import React from 'react';
import Navbarmain from './components/Navbarmain';
import './App.css';
import Promotion from './components/Promotion';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BrandList from './components/Brand';
import BrandDetail from './components/BrandDetail';
import AllBrands from './components/AllBrands';  // Import the new AllBrands component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllProduct from './components/AllProduct';
import AdviseProduct from './components/AdviseProduct';
import ContactUs from './components/ContactUs'; // Import the new ContactUs component
import MainPromotion from './components/MainPromotion';
function App() {
  return (
    <Router>
      <>
        <Navbarmain />
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Promotion />  
                <BrandList />
                <AdviseProduct/>
                <AllProduct/>
              </>
            } 
          />
          <Route path="/brands/:id" element={<BrandDetail />} />  
          <Route path="/brands" element={<AllBrands />} />  {/* Route for showing all brands */}
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/promotions" element={<MainPromotion />} /> {/* New route for mainPromotion */}
        </Routes>
      </>
    </Router>
  );
}

export default App;
