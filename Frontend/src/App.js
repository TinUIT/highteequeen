import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

import Homepage from "./containers/Homepage/Homepage";
import DistributionChannelPage from "./containers/Distribution-Channel-Page/Distribution-Channel-Page";
import AboutUs from "./containers/About-Us/AboutUs";
import ProductDetail from "./containers/Product-Detail/ProductDetail";
import axios from "axios";
import ProductPage from "./containers/ProductPage/ProductPage";
import CartPage from "./containers/CartPage/CartPage";
import Payment from "./containers/Payment/Payment";
import ProfilePage from "./containers/ProfilePage/ProfilePage";
import Favorite from "./containers/favorite/favorite";
import OderManage from "./containers/OderManage/OderManage";
import Slidebar from "./Admin/component/Slidebar/Slidebar";
import PaymentPayPal from "./containers/PaymentPaypal/PaymentPaypal";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route
        path="/distribution-channel-page"
        element={<DistributionChannelPage />}
      />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/product-detail" element={<ProductDetail />} />
      <Route path="/product" element={<ProductPage/>}/>
      <Route path="/cart-page" element={<CartPage />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/favoritepd" element={<Favorite />} />
      <Route path="/oder-management" element={<OderManage/>} />
      <Route path="/admin" element={<Slidebar/>} />
      <Route path="/payment-method" element={<PaymentPayPal/>} />
      
    </Routes>
  );
}

export default App;