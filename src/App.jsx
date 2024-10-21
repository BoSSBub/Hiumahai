import React from 'react';
import Navbarmain from './components/Navbarmain';
import './App.css';
import Promotion from './components/Promotion';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BrandList from './components/Brand';
import BrandDetail from './components/BrandDetail';
import AllBrands from './components/AllBrands';  
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllProduct from './components/AllProduct';
import AdviseProduct from './components/AdviseProduct';
import ContactUs from './components/ContactUs'; 
import MainPromotion from './components/MainPromotion';
import Login from './components/Login';  // ใช้ตัว L พิมพ์ใหญ่
import Register from './components/Register';
import Nomember from './components/Nomember';
import Myhiu from './components/Myhiu';
import Allhiu from './components/Allhiu';
import Addproduct from './components/Addproduct';
import Allhiubrand from './components/Allhiubrand';
import ProductDetail from './components/ProductDetail';
import RegisterSeller from './components/RegisterSeller';
import Footer from './components/Footer';
import { UserProvider } from './components/UserContext';  // Import UserProvider
function App() {
  return (
    <UserProvider>
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
                <AdviseProduct />
                <AllProduct />
              </>
            } 
          />
          <Route path="/brands/:id" element={<BrandDetail />} />  
          <Route path="/brands" element={<AllBrands />} />  
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/promotions" element={<MainPromotion />} /> {/* New route for mainPromotion */}
          <Route path="/login" element={<Login />} />  {/* ใช้ Login ที่ถูกต้อง */}
          <Route path="/register" element={<Register />} />  
          <Route path="/nomember" element={<Nomember/>} />
          <Route path="/myhiu" element={<Myhiu/>} />
          <Route path="/allhiu" element={<Allhiu/>} />
          <Route path="/allhiubrands" element={<Allhiubrand/>} />
          <Route path="/addproduct" element={<Addproduct/>} />
          <Route path="/product/:productId" element={<ProductDetail />} /> {/* Corrected here */}
          <Route path="/nomember" element={<Nomember />} />
          <Route path="/register-seller" element={<RegisterSeller />} />

         
        </Routes>
        <Footer/>
      </>
    </Router>
    </UserProvider>
  );
}

export default App;
