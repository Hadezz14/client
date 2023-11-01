import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import OurStore from "./pages/OurStore";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
import Signup from "./pages/Signup";
import Resetpassword from "./pages/Resetpassword";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermAndContions from "./pages/TermAndContions";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConformation from "./pages/OrderConformation";
import { PrivateRoute } from "./routing/PrivateRoute";
import { OpenRoute } from "./routing/OpenRoutes";
import SizeChart from "./pages/SizeChart";
import ExchangePolicy from "./pages/ExchangePolicy";
import ErrorBoundary from "./ErrorBoundary";
import { Helmet } from "react-helmet";
function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
      <Helmet>
        <title>Vyam</title>
        <meta name="description" content="Discover premium gymwear and sportswear at Vyam. Shop our high-quality activewear designed for performance and style."/>
        <meta name="keywords" content="Gymwear, Sportswear,Workout gear, Fitness Clothing "/>
      </Helmet>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="product" element={<OurStore />} />
            <Route path="product/:id" element={<SingleProduct />} />
            <Route path="cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
            <Route path="checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
            <Route path="wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<Forgotpassword />} />
            <Route path="signup" element={<OpenRoute><Signup /></OpenRoute>} />
            <Route path="reset-password" element={<PrivateRoute><Resetpassword /></PrivateRoute>} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="shipping-policy" element={<ShippingPolicy />} />
            <Route path="term-conditions" element={<TermAndContions />} />
            <Route path="order-confirm" element={<OrderConformation/>} />
            <Route path="size-chart" element={<SizeChart/>}/>
            <Route path="return-policy" element={<ExchangePolicy/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
