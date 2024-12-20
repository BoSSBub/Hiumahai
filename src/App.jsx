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
import Manageproduct from './components/Manageproduct';
import Pushcart from './components/Pushcart';
import Basket from './components/ฺฺBasket';
import Carryproduct from './components/Carryproduct';
import Editaddress from './components/Editaddress';
import Makepayment from './components/Makepayment';
import Editproduct from './components/editproduct';
import Waitingpayment from './components/Waitingpayment';
import Waitingpaymentdetail from './components/Waitingpaymentdetail';
import Editaddresspayment from './components/Editaddresspayment';
import Cancelpayment from './components/Cancelpayment';
import Abrogate from './components/Abrogate';
import Delivery from './components/Delivery';
import Deliverydetail from './components/Deliverydetail';
import Editaddresspaymentdelivery from './components/Editaddresspaymentdelivery';
import Abrogatedetail from './components/Abrogatedetail';
import Received from './components/Received';
import Receiveddetail from './components/Receiveddetail';
import Complete from './components/Complete';
import Completedetail from './components/Completedetail';
import Reviews from './components/Reviews';

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
          <Route path="/reviews" element={<Reviews/>} />
          <Route path="/product/:productId" element={<ProductDetail />} /> {/* Corrected here */}
          <Route path="/nomember" element={<Nomember />} />
          <Route path="/register-seller" element={<RegisterSeller />} />
          <Route path="/manageproduct" element={<Manageproduct/>} />
          <Route path="/Pushcart" element={<Pushcart />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/carryproduct" element={<Carryproduct />} />
          <Route path="/editaddress" element={<Editaddress />} />
          <Route path="/makepayment" element={<Makepayment />} />
          <Route path="/editproduct" element={<Editproduct />} />
          <Route path="/waitingpayment" element={<Waitingpayment />} />
          <Route path="/waitingpaymentdetail" element={<Waitingpaymentdetail />} />
          <Route path="/editaddresspayment" element={<Editaddresspayment />} />
          <Route path="/cancelpayment" element={<Cancelpayment />} />
          <Route path="/abrogate" element={<Abrogate />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/deliverydetail" element={<Deliverydetail />} />
          <Route path="/editaddresspaymentdelivery" element={<Editaddresspaymentdelivery />} />
          <Route path="/abrogatedetail" element={<Abrogatedetail />} />
          <Route path="/received" element={<Received />} />
          <Route path="/receiveddetail" element={<Receiveddetail />} />
          <Route path="/complete" element={<Complete />} />
          <Route path="/completedetail" element={<Completedetail />} />
        </Routes>
        <Footer/>
      </>
    </Router>
    </UserProvider>
  );
}

export default App;